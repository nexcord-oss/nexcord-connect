// Builds wagmi configuration for the Nexcord Connect provider.
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { arbitrum, base, mainnet, optimism, polygon } from "wagmi/chains";
import type { NexcordConfig } from "../types/index.js";

const DEFAULT_CHAINS = [mainnet, polygon, optimism, arbitrum, base] as const;

export function createNexcordWagmiConfig(
  config: NexcordConfig,
): ReturnType<typeof getDefaultConfig> {
  return getDefaultConfig({
    appName: config.appName,
    projectId: config.projectId,
    chains: config.chains ?? DEFAULT_CHAINS,
    ssr: true,
  });
}
