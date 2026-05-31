# @nexcord-oss/connect

The simplest way to add wallet connection to any Next.js app.

Built on [ConnectKit](https://docs.family.co/connectkit), [wagmi](https://wagmi.sh), and [viem](https://viem.sh).

## Install

```bash
npm install @nexcord-oss/connect wagmi viem @tanstack/react-query
```

## Quick start

```tsx
// app/layout.tsx
import { NexcordProvider } from "@nexcord-oss/connect";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <NexcordProvider
          projectId={process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID}
          appName="My App"
        >
          {children}
        </NexcordProvider>
      </body>
    </html>
  );
}
```

```tsx
// app/page.tsx
import { NexcordConnectButton } from "@nexcord-oss/connect";

export default function Page() {
  return <NexcordConnectButton />;
}
```

That's it. No extra installs, no configuration.

## Hooks

```tsx
import { useWalletUser, useTokenBalance, useNexcordSign } from "@nexcord-oss/connect";

// Get connected wallet info
const user = useWalletUser();
// { address, chainId, isConnected } | null

// Get token balance
const { balance, symbol } = useTokenBalance({ tokenAddress: "0x..." });

// Sign a message
const { signMessage, signature } = useNexcordSign({ message: "Welcome." });
```

> **`useSignMessage` is deprecated** and will be removed in v1.0.0. Use `useNexcordSign({ message: "..." })` instead.

## Headless mode

Skip ConnectKit's UI entirely and build your own wallet connection experience using the three headless hooks.

```tsx
// app/layout.tsx
<NexcordProvider
  projectId={process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID}
  appName="My App"
  mode="headless"
>
  {children}
</NexcordProvider>
```

### `useNexcordConnect`

Core connect / disconnect with full status.

```tsx
import { useNexcordConnect } from "@nexcord-oss/connect";

const { connect, disconnect, address, chainId, isConnected, isConnecting, error } =
  useNexcordConnect();
```

| Field | Type | Description |
|---|---|---|
| `address` | `string \| undefined` | Connected wallet address |
| `chainId` | `number \| undefined` | Active chain ID |
| `isConnected` | `boolean` | Whether a wallet is connected |
| `isConnecting` | `boolean` | Connection in progress |
| `error` | `Error \| null` | Last connect/disconnect error |
| `connect()` | `() => void` | Connect using the first available connector |
| `disconnect()` | `() => void` | Disconnect the active wallet |

### `useNexcordChain`

Read and switch the active chain.

```tsx
import { useNexcordChain } from "@nexcord-oss/connect";

const { chain, chains, switchChain, isSwitching } = useNexcordChain();
```

| Field | Type | Description |
|---|---|---|
| `chain` | `Chain \| undefined` | Currently active chain object |
| `chains` | `readonly Chain[]` | All configured chains |
| `switchChain(chainId)` | `(id: number) => void` | Switch to a chain by ID |
| `isSwitching` | `boolean` | Chain switch in progress |

### `useNexcordWallet`

Enumerate connectors and connect to a specific one.

```tsx
import { useNexcordWallet } from "@nexcord-oss/connect";

const { connector, connectors, connectWith } = useNexcordWallet();
```

| Field | Type | Description |
|---|---|---|
| `connector` | `{ id, name } \| undefined` | Currently active connector |
| `connectors` | `{ id, name }[]` | All available connectors |
| `connectWith(connector)` | `({ id, name }) => void` | Connect via a specific connector |

### `useNexcordBalance`

Returns the native or ERC-20 balance for the connected wallet. Automatically disabled when no wallet is connected.

```tsx
import { useNexcordBalance } from "@nexcord-oss/connect";

// Native balance (ETH, MATIC, etc.)
const { balance, isLoading, isError, refetch } = useNexcordBalance();

// ERC-20 token balance
const { balance } = useNexcordBalance({ tokenAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" });

// On a specific chain
const { balance } = useNexcordBalance({ chainId: 137 });
```

| Field | Type | Description |
|---|---|---|
| `balance` | `NexcordBalance \| null` | Balance data, or null while loading / disconnected |
| `balance.formatted` | `string` | Human-readable value (e.g. `"1.2345"`) |
| `balance.symbol` | `string` | Token symbol (e.g. `"ETH"`, `"USDC"`) |
| `balance.value` | `bigint` | Raw on-chain value |
| `balance.decimals` | `number` | Token decimals |
| `isLoading` | `boolean` | True on first fetch |
| `isError` | `boolean` | True if the fetch failed |
| `error` | `Error \| null` | Fetch error, or null |
| `refetch()` | `() => void` | Manually re-fetch |

### `useNexcordSign`

Signs a message with the connected wallet. Accepts a nonce, a raw message, or a plain string (treated as nonce for backwards compatibility).

```tsx
import { useNexcordSign } from "@nexcord-oss/connect";

// Nonce → constructs "Verify wallet for Nexcord\nNonce: {nonce}"
const { signMessage, signature, message, isPending, error } = useNexcordSign({ nonce: "abc-123" });

// Raw message → signs it directly
const { signMessage, message } = useNexcordSign({ message: "Welcome to my app." });

// Plain string → treated as nonce (backwards-compat)
const { signMessage } = useNexcordSign("abc-123");
```

| Field | Type | Description |
|---|---|---|
| `signMessage()` | `() => void` | Trigger the wallet signature request |
| `signature` | `string \| undefined` | Hex signature returned by the wallet |
| `message` | `string` | The exact message string that will be signed |
| `isPending` | `boolean` | True while waiting for wallet confirmation |
| `error` | `Error \| null` | Normalized error, or null |

### `normalizeWalletError`

Maps raw wagmi/wallet errors to readable user-facing messages. All hooks apply this automatically — export is provided for consumers who want to use it directly.

```tsx
import { normalizeWalletError } from "@nexcord-oss/connect";

const readable = normalizeWalletError(error);
// "You rejected the request in your wallet."
// "No wallet found. Please install MetaMask or another wallet."
// "Failed to switch network. Please try manually in your wallet."
// ... or the original error if no mapping matches
```

### Full headless example

```tsx
"use client";
import { useNexcordConnect, useNexcordWallet, useNexcordChain } from "@nexcord-oss/connect";

export function MyWallet() {
  const { address, isConnected, disconnect } = useNexcordConnect();
  const { connectors, connectWith } = useNexcordWallet();
  const { chain, chains, switchChain } = useNexcordChain();

  if (!isConnected) {
    return (
      <div>
        {connectors.map((c) => (
          <button key={c.id} onClick={() => connectWith(c)}>
            Connect {c.name}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div>
      <p>{address}</p>
      <p>Chain: {chain?.name}</p>
      {chains.map((c) => (
        <button key={c.id} onClick={() => switchChain(c.id)}>
          Switch to {c.name}
        </button>
      ))}
      <button onClick={disconnect}>Disconnect</button>
    </div>
  );
}
```

## WalletConnect Project ID

Get a free project ID at [cloud.reown.com](https://cloud.reown.com) and add it to your `.env.local`:

```text
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

## Requirements

- Next.js 15+
- React 19+
- wagmi 2+
- viem 2+
- @tanstack/react-query 5+

## License

MIT

---

Built by [Nexcord](https://nexcord.app)
