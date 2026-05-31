"use client";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { normalizeWalletError } from "../utils/normalizeWalletError.js";

export interface UseNexcordConnectResult {
  address: string | undefined;
  chainId: number | undefined;
  isConnected: boolean;
  /** True during both initial connection and the reconnect-on-mount phase. */
  isConnecting: boolean;
  error: Error | null;
  connect: () => void;
  disconnect: () => void;
}

export function useNexcordConnect(): UseNexcordConnectResult {
  const { address, chainId, status } = useAccount();
  const { connect, connectors, error: connectError } = useConnect();
  const { disconnect, error: disconnectError } = useDisconnect();

  return {
    address,
    chainId,
    isConnected: status === "connected",
    isConnecting: status === "connecting" || status === "reconnecting",
    error: normalizeWalletError(connectError ?? disconnectError ?? null),
    connect: () => {
      const connector = connectors[0];
      if (connector) connect({ connector });
    },
    disconnect: () => disconnect(),
  };
}
