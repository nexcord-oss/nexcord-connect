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
  const [wagmiConfig] = useState(() => createNexcordWagmiConfig(props));

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const cloudContextValue =
    cloudApiKey === undefined ? {} : { cloudApiKey };

  return (
    <NexcordCloudContext.Provider value={cloudContextValue}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <ConnectKitProvider>{children}</ConnectKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </NexcordCloudContext.Provider>
  );
}
