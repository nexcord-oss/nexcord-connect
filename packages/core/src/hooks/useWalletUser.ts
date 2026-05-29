// Returns the connected wallet as a normalized Nexcord user object.
"use client";

import { useAccount } from "wagmi";
import type { WalletUser } from "../types/index.js";

export function useWalletUser(): WalletUser | null {
  const { address, chainId, isConnected } = useAccount();

  if (!isConnected || address === undefined || chainId === undefined) {
    return null;
  }

  return {
    address,
    chainId,
    isConnected,
  };
}
