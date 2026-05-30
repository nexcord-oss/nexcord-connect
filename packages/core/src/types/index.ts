// Defines the public TypeScript contracts for Nexcord Connect.
import type { ReactNode } from "react";
import type { Chain } from "viem";

/**
 * Configuration used to initialize Nexcord Connect wallet infrastructure.
 */
export interface NexcordConfig {
  /**
   * WalletConnect project identifier used by RainbowKit and wagmi.
   */
  projectId: string;
  /**
   * Human-readable application name shown in wallet connection prompts.
   */
  appName: string;
  /**
   * Optional cloud API key for the managed Nexcord Connect tier.
   */
  cloudApiKey?: string;
  /**
   * Optional list of chains supported by the consuming application.
   */
  chains?: readonly [Chain, ...Chain[]];
  /**
   * "default" renders ConnectKit UI. "headless" omits ConnectKit entirely,
   * providing only wagmi context for use with the headless hooks.
   */
  mode?: "default" | "headless";
}

/**
 * Normalized wallet identity returned by Nexcord Connect hooks.
 */
export interface WalletUser {
  /**
   * Connected wallet address in checksum or lowercase format from wagmi.
   */
  address: string;
  /**
   * Numeric EVM chain identifier for the connected wallet network.
   */
  chainId: number;
  /**
   * Whether the wallet is currently connected.
   */
  isConnected: boolean;
}

/**
 * Props accepted by the Nexcord Connect React provider.
 */
export interface NexcordProviderProps extends NexcordConfig {
  /**
   * React tree that should receive wallet and query context.
   */
  children: ReactNode;
}
