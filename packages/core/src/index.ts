// Re-exports the public Nexcord Connect SDK API.
export { NexcordConnectButton } from "./components/NexcordConnectButton.js";
/** @deprecated Use `useNexcordSign` instead. Will be removed in v1.0.0. */
export { useSignMessage } from "./hooks/useSignMessage.js";
/** @deprecated Use `UseNexcordSignResult` instead. Will be removed in v1.0.0. */
export type { UseSignMessageResult } from "./hooks/useSignMessage.js";
export { useTokenBalance } from "./hooks/useTokenBalance.js";
export type { TokenBalance, UseTokenBalanceParams } from "./hooks/useTokenBalance.js";
export { useWalletUser } from "./hooks/useWalletUser.js";
export { useNexcordConnect } from "./hooks/useNexcordConnect.js";
export type { UseNexcordConnectResult } from "./hooks/useNexcordConnect.js";
export { useNexcordChain } from "./hooks/useNexcordChain.js";
export type { UseNexcordChainResult } from "./hooks/useNexcordChain.js";
export { useNexcordWallet } from "./hooks/useNexcordWallet.js";
export type { UseNexcordWalletResult, NexcordConnectorInfo } from "./hooks/useNexcordWallet.js";
export { useNexcordSign } from "./hooks/useNexcordSign.js";
export type { UseNexcordSignResult, NexcordSignInput } from "./hooks/useNexcordSign.js";
export { normalizeWalletError } from "./utils/normalizeWalletError.js";
export { useNexcordBalance } from "./hooks/useNexcordBalance.js";
export type { UseNexcordBalanceResult, UseNexcordBalanceParams, NexcordBalance } from "./hooks/useNexcordBalance.js";
export { NexcordProvider, useNexcordCloud } from "./providers/NexcordProvider.js";
export type { NexcordConfig, NexcordProviderProps, WalletUser } from "./types/index.js";
export { createNexcordWagmiConfig } from "./utils/config.js";
