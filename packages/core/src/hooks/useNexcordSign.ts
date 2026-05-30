"use client";
// Constructs a Nexcord-formatted sign-in message and wraps wagmi's useSignMessage.
import { useSignMessage } from "wagmi";

export interface UseNexcordSignResult {
  /** Trigger the wallet signature request. */
  signMessage: () => void;
  /** The hex signature returned by the wallet, or undefined if not yet signed. */
  signature: string | undefined;
  /** The exact message string that will be (or was) signed. */
  message: string;
  /** True while the wallet is waiting for user confirmation. */
  isPending: boolean;
  /** Last signing error, or null. */
  error: Error | null;
}

export function useNexcordSign(nonce: string): UseNexcordSignResult {
  const message = `Verify wallet for Nexcord\nNonce: ${nonce}`;

  const { signMessage, data: signature, isPending, error } = useSignMessage();

  return {
    signMessage: () => signMessage({ message }),
    signature,
    message,
    isPending,
    error,
  };
}
