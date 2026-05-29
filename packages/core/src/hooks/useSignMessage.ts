// Exposes a small promise-based message signing API on top of wagmi.
"use client";

import { useSignMessage as useWagmiSignMessage } from "wagmi";

export interface UseSignMessageResult {
  sign: (message: string) => Promise<string>;
  isPending: boolean;
  error: Error | null;
}

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
