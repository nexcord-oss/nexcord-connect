"use client";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export interface UseNexcordConnectResult {
  address: string | undefined;
  chainId: number | undefined;
  isConnected: boolean;
  isConnecting: boolean;
  error: Error | null;
  connect: () => void;
  disconnect: () => void;
}

export function useNexcordConnect(): UseNexcordConnectResult {
  const { address, chainId, isConnected, isConnecting } = useAccount();
  const { connect, connectors, error: connectError } = useConnect();
  const { disconnect, error: disconnectError } = useDisconnect();

  return {
    address,
    chainId,
    isConnected,
    isConnecting,
    error: connectError ?? disconnectError ?? null,
    connect: () => {
      const connector = connectors[0];
      if (connector) connect({ connector });
    },
    disconnect: () => disconnect(),
  };
}
