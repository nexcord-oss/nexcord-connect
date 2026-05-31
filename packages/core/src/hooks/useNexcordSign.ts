"use client";
// Constructs a Nexcord-formatted or custom message and wraps wagmi's useSignMessage.
import { useSignMessage } from "wagmi";
import { normalizeWalletError } from "../utils/normalizeWalletError.js";

/**
 * Pass `{ nonce }` to construct the standard Nexcord sign-in message,
 * or `{ message }` to sign a fully custom string.
 * A plain string is also accepted and treated as a nonce (backwards-compat).
 */
export type NexcordSignInput =
  | string
  | { nonce: string }
  | { message: string };

export interface UseNexcordSignResult {
  signMessage: () => void;
  signature: string | undefined;
  /** The exact message string that will be / was signed. */
  message: string;
  isPending: boolean;
  error: Error | null;
}

function resolveMessage(input: NexcordSignInput): string {
  if (typeof input === "string") {
    return `Verify wallet for Nexcord\nNonce: ${input}`;
  }
  if ("nonce" in input) {
    return `Verify wallet for Nexcord\nNonce: ${input.nonce}`;
  }
  return input.message;
}

export function useNexcordSign(input: NexcordSignInput): UseNexcordSignResult {
  const message = resolveMessage(input);
  const { signMessage, data: signature, isPending, error } = useSignMessage();

  return {
    signMessage: () => signMessage({ message }),
    signature,
    message,
    isPending,
    error: normalizeWalletError(error),
  };
}
