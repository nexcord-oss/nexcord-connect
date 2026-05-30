"use client";
import { useChainId, useChains, useSwitchChain } from "wagmi";
import type { Chain } from "viem";

export interface UseNexcordChainResult {
  chain: Chain | undefined;
  chains: readonly Chain[];
  switchChain: (chainId: number) => void;
  isSwitching: boolean;
}

export function useNexcordChain(): UseNexcordChainResult {
  const chainId = useChainId();
  const chains = useChains();
  const { switchChain, isPending } = useSwitchChain();

  const chain = chains.find((c) => c.id === chainId);

  return {
    chain,
    chains,
    switchChain: (id: number) => switchChain({ chainId: id }),
    isSwitching: isPending,
  };
}
