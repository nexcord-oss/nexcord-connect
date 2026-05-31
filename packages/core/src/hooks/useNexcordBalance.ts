"use client";
// Returns the native or ERC-20 balance for the connected wallet.
import { useAccount, useBalance } from "wagmi";

export interface UseNexcordBalanceParams {
  /** ERC-20 token address. Omit for native chain balance (ETH, MATIC, etc). */
  tokenAddress?: `0x${string}`;
  /** Override the chain to read balance from. Defaults to connected chain. */
  chainId?: number;
}

export interface NexcordBalance {
  /** Human-readable formatted balance (e.g. "1.234"). */
  formatted: string;
  /** Token symbol (e.g. "ETH", "USDC"). */
  symbol: string;
  /** Raw BigInt value. */
  value: bigint;
  /** Token decimals. */
  decimals: number;
}

export interface UseNexcordBalanceResult {
  balance: NexcordBalance | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  /** Manually re-fetch the balance. */
  refetch: () => void;
}

export function useNexcordBalance(
  params: UseNexcordBalanceParams = {}
): UseNexcordBalanceResult {
  const { address, isConnected } = useAccount();

  const { data, isLoading, isError, error, refetch } = useBalance({
    address,
    ...(params.chainId !== undefined ? { chainId: params.chainId } : {}),
    ...(params.tokenAddress !== undefined ? { token: params.tokenAddress } : {}),
    query: {
      enabled: isConnected && address !== undefined,
    },
  });

  return {
    balance: data
      ? {
          formatted: data.formatted,
          symbol: data.symbol,
          value: data.value,
          decimals: data.decimals,
        }
      : null,
    isLoading,
    isError,
    error: error as Error | null,
    refetch,
  };
}
