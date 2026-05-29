// Builds wagmi configuration for the Nexcord Connect provider.
import { createConfig, http } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";
import type { NexcordConfig } from "../types/index.js";
import type { Chain } from "viem";

const DEFAULT_CHAINS = [mainnet, polygon, optimism, arbitrum, base] as const;

const CORS_SAFE_RPC: Record<number, string> = {
  [mainnet.id]: "https://cloudflare-eth.com",
};

function rpcUrl(chain: Chain): string {
  return CORS_SAFE_RPC[chain.id] ?? chain.rpcUrls.default.http[0];
}

export function createNexcordWagmiConfig(config: NexcordConfig) {
  const chains = (config.chains ?? DEFAULT_CHAINS) as readonly [Chain, ...Chain[]];
  return createConfig({
    chains,
    connectors: [
      injected(),
      walletConnect({ projectId: config.projectId, showQrModal: false }),
    ],
    transports: Object.fromEntries(chains.map((c) => [c.id, http(rpcUrl(c))])),
    ssr: true,
  });
}
