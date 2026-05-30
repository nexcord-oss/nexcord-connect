"use client";
import { useAccount, useConnect } from "wagmi";
import type { Connector } from "wagmi";

export interface NexcordConnectorInfo {
  id: string;
  name: string;
}

export interface UseNexcordWalletResult {
  connector: NexcordConnectorInfo | undefined;
  connectors: NexcordConnectorInfo[];
  connectWith: (connector: NexcordConnectorInfo) => void;
}

export function useNexcordWallet(): UseNexcordWalletResult {
  const { connector: activeConnector } = useAccount();
  const { connect, connectors } = useConnect();

  const toInfo = (c: Connector): NexcordConnectorInfo => ({
    id: c.id,
    name: c.name,
  });

  return {
    connector: activeConnector ? toInfo(activeConnector) : undefined,
    connectors: connectors.map(toInfo),
    connectWith: ({ id }) => {
      const target = connectors.find((c) => c.id === id);
      if (target) connect({ connector: target });
    },
  };
}
