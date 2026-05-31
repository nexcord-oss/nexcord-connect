"use client";
import { ConnectKitProvider } from "connectkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactElement,
} from "react";
import { WagmiProvider } from "wagmi";
import { reconnect } from "@wagmi/core";
import type { NexcordProviderProps } from "../types/index.js";
import { createNexcordWagmiConfig } from "../utils/config.js";

interface NexcordCloudContextValue {
  cloudApiKey?: string;
}

const NexcordCloudContext = createContext<NexcordCloudContextValue>({});

export function useNexcordCloud(): NexcordCloudContextValue {
  return useContext(NexcordCloudContext);
}

export function NexcordProvider(
  props: NexcordProviderProps
): ReactElement | null {
  const { children, cloudApiKey } = props;
  const [mounted, setMounted] = useState(false);
  const [queryClient] = useState(() => new QueryClient());
  const [wagmiConfig, setWagmiConfig] = useState<ReturnType<typeof createNexcordWagmiConfig> | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === "development" && !props.projectId) {
      console.warn(
        "[NexcordProvider] Missing projectId — WalletConnect will not work.\n" +
        "Get a free project ID at https://cloud.reown.com and pass it as the projectId prop."
      );
    }
    const config = createNexcordWagmiConfig(props);
    setWagmiConfig(config);
    setMounted(true);
    // Manually reconnect instead of relying on WagmiProvider's reconnectOnMount,
    // so we can swallow rejections from injected wallets (e.g. MetaMask refusing
    // eth_requestAccounts on a page load the user hasn't interacted with).
    reconnect(config).catch(() => {});
  }, []);

  if (!mounted || wagmiConfig === null) return null;

  const cloudContextValue =
    cloudApiKey === undefined ? {} : { cloudApiKey };

  const inner = props.mode === "headless"
    ? children
    : <ConnectKitProvider>{children}</ConnectKitProvider>;

  return (
    <NexcordCloudContext.Provider value={cloudContextValue}>
      <WagmiProvider config={wagmiConfig} reconnectOnMount={false}>
        <QueryClientProvider client={queryClient}>
          {inner}
        </QueryClientProvider>
      </WagmiProvider>
    </NexcordCloudContext.Provider>
  );
}
