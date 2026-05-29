// Reads a connected wallet token or native balance through wagmi.
"use client";

import { useAccount, useBalance } from "wagmi";

export interface UseTokenBalanceParams {
  tokenAddress?: string;
  chainId?: number;
}

export interface TokenBalance {
  balance: string;
  symbol: string;
  decimals: number;
}

function isHexAddress(value: string): value is `0x${string}` {
  return value.startsWith("0x");
}

export function useTokenBalance(params: UseTokenBalanceParams = {}): TokenBalance | null {
  const { address } = useAccount();
  const tokenAddress =
    params.tokenAddress === undefined || !isHexAddress(params.tokenAddress)
      ? undefined
      : params.tokenAddress;
  const { data } = useBalance({
    address,
    ...(params.chainId === undefined ? {} : { chainId: params.chainId }),
    ...(tokenAddress === undefined ? {} : { token: tokenAddress }),
    query: {
      enabled:
        address !== undefined && (params.tokenAddress === undefined || tokenAddress !== undefined),
    },
  });

  if (data === undefined) {
    return null;
  }

  return {
    balance: data.formatted,
    symbol: data.symbol,
    decimals: data.decimals,
  };
}
