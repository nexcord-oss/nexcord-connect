"use client";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { normalizeWalletError } from "../utils/normalizeWalletError.js";

const RECONNECT_TIMEOUT_MS = 1500;

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

  // The silent reconnect-on-mount phase can hang indefinitely if the
  // WalletConnect relay fails, leaving status stuck at "reconnecting".
  // Cap that phase at RECONNECT_TIMEOUT_MS so consumers' loading states
  // always settle. User-initiated "connecting" is never timed out — the
  // wallet prompt may legitimately stay open for much longer.
  const [reconnectTimedOut, setReconnectTimedOut] = useState(false);
  useEffect(() => {
    if (status === "reconnecting") {
      const t = setTimeout(() => setReconnectTimedOut(true), RECONNECT_TIMEOUT_MS);
      return () => clearTimeout(t);
    }
    setReconnectTimedOut(false);
    return undefined;
  }, [status]);

  const isConnecting =
    status === "connecting" ||
    (status === "reconnecting" && !reconnectTimedOut);

  return {
    address,
    chainId,
    isConnected: status === "connected",
    isConnecting,
    error: normalizeWalletError(connectError ?? disconnectError ?? null),
    connect: () => {
      const connector = connectors[0];
      if (connector) connect({ connector });
    },
    disconnect: () => disconnect(),
  };
}
