// Maps raw wagmi/wallet error messages to readable user-facing strings.

const ERROR_MAP: Array<[RegExp, string]> = [
  [
    /user rejected/i,
    "You rejected the request in your wallet.",
  ],
  [
    /connector not found/i,
    "No wallet found. Please install MetaMask or another wallet.",
  ],
  [
    /no connector/i,
    "No wallet found. Please install MetaMask or another wallet.",
  ],
  [
    /wallet not connected/i,
    "No wallet connected. Please connect your wallet first.",
  ],
  [
    /chain mismatch|switch.*network|does not support.*chain/i,
    "Failed to switch network. Please try manually in your wallet.",
  ],
  [
    /already pending/i,
    "A wallet request is already pending. Check your wallet.",
  ],
  [
    /insufficient funds/i,
    "Insufficient funds for this transaction.",
  ],
];

export function normalizeWalletError(error: unknown): Error | null {
  if (error === null || error === undefined) return null;

  const raw = error instanceof Error ? error : new Error(String(error));

  for (const [pattern, message] of ERROR_MAP) {
    if (pattern.test(raw.message)) {
      const normalized = new Error(message);
      normalized.name = raw.name;
      return normalized;
    }
  }

  return raw;
}
