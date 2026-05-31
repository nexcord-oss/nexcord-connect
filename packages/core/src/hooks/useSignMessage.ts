"use client";

import { useSignMessage as useWagmiSignMessage } from "wagmi";

export interface UseSignMessageResult {
  sign: (message: string) => Promise<string>;
  isPending: boolean;
  error: Error | null;
}

/**
 * @deprecated Use `useNexcordSign` instead.
 * `useNexcordSign({ message: "..." })` covers all signing use cases
 * and includes automatic error normalization.
 * `useSignMessage` will be removed in v1.0.0.
 */
export function useSignMessage(): UseSignMessageResult {
  const { signMessageAsync, isPending, error } = useWagmiSignMessage();

  async function sign(message: string): Promise<string> {
    return signMessageAsync({ message });
  }

  return {
    sign,
    isPending,
    error,
  };
}
