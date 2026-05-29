// Provides wallet, query, and Nexcord cloud context to React applications.
"use client";

import "@rainbow-me/rainbowkit/styles.css";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState, type ReactElement } from "react";
import { WagmiProvider } from "wagmi";
import type { NexcordProviderProps } from "../types/index.js";
import { createNexcordWagmiConfig } from "../utils/config.js";

interface NexcordCloudContextValue {
  cloudApiKey?: string;
}

const NexcordCloudContext = createContext<NexcordCloudContextValue>({});

export function useNexcordCloud(): NexcordCloudContextValue {
  return useContext(NexcordCloudContext);
}

export function NexcordProvider(props: NexcordProviderProps): ReactElement | null {
  const { children, cloudApiKey } = props;
  const [mounted, setMounted] = useState<boolean>(false);
  const [queryClient] = useState<QueryClient>(() => new QueryClient());
  const [wagmiConfig] = useState(() => createNexcordWagmiConfig(props));

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const cloudContextValue: NexcordCloudContextValue =
    cloudApiKey === undefined ? {} : { cloudApiKey };

  return (
    <NexcordCloudContext.Provider value={cloudContextValue}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>{children}</RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </NexcordCloudContext.Provider>
  );
}
