"use client";
import { ConnectKitProvider } from "connectkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
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

  // Create the wagmi config exactly once, client-side only.
  // - The ref guard prevents React StrictMode (dev) from creating two
  //   different config objects, which would discard the restored session.
  // - The `window` check keeps connector setup (which touches localStorage /
  //   indexedDB) off the server, avoiding SSR/SSG crashes.
  const configRef = useRef<ReturnType<typeof createNexcordWagmiConfig> | null>(
    null
  );
  if (typeof window !== "undefined" && configRef.current === null) {
    configRef.current = createNexcordWagmiConfig(props);
  }

  useEffect(() => {
    if (process.env.NODE_ENV === "development" && !props.projectId) {
      console.warn(
        "[NexcordProvider] Missing projectId — WalletConnect will not work.\n" +
        "Get a free project ID at https://cloud.reown.com and pass it as the projectId prop."
      );
    }
    setMounted(true);
  }, []);

  if (!mounted || configRef.current === null) return null;

  const cloudContextValue =
    cloudApiKey === undefined ? {} : { cloudApiKey };

  const inner = props.mode === "headless"
    ? children
    : <ConnectKitProvider>{children}</ConnectKitProvider>;

  return (
    <NexcordCloudContext.Provider value={cloudContextValue}>
      {/* reconnectOnMount defaults to true — wagmi restores the previous
          session silently (eth_accounts), so reloads keep the wallet
          connected without re-prompting injected wallets. */}
      <WagmiProvider config={configRef.current}>
        <QueryClientProvider client={queryClient}>
          {inner}
        </QueryClientProvider>
      </WagmiProvider>
    </NexcordCloudContext.Provider>
  );
}
