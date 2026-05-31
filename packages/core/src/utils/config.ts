// Builds wagmi configuration for the Nexcord Connect provider.
import { createConfig, createStorage, http, fallback, noopStorage } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";
import type { NexcordConfig } from "../types/index.js";
import type { Chain } from "viem";

const DEFAULT_CHAINS = [mainnet, polygon, optimism, arbitrum, base] as const;

// eth.merkle.io (viem's mainnet default) blocks CORS from browsers.
// Use a fallback chain of CORS-friendly public RPCs for mainnet.
const MAINNET_TRANSPORTS = fallback([
  http("https://ethereum.publicnode.com"),
  http("https://rpc.ankr.com/eth"),
  http("https://1rpc.io/eth"),
]);

function transport(chain: Chain) {
  if (chain.id === mainnet.id) return MAINNET_TRANSPORTS;
  return http(chain.rpcUrls.default.http[0] ?? "");
}

export function createNexcordWagmiConfig(config: NexcordConfig) {
  const chains = (config.chains ?? DEFAULT_CHAINS) as readonly [Chain, ...Chain[]];
  return createConfig({
    chains,
    connectors: [
      injected(),
      walletConnect({ projectId: config.projectId, showQrModal: false }),
    ],
    transports: Object.fromEntries(chains.map((c) => [c.id, transport(c)])),
    // Persist the connection to localStorage so reloads restore the session.
    storage: createStorage({
      key: "nexcord-connect",
      storage: typeof window !== "undefined" ? window.localStorage : noopStorage,
    }),
    ssr: true,
  });
}
