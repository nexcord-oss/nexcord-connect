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
import { useWalletUser, useTokenBalance, useSignMessage } from "@nexcord-oss/connect";

// Get connected wallet info
const user = useWalletUser();
// { address, chainId, isConnected } | null

// Get token balance
const { balance, symbol } = useTokenBalance({ tokenAddress: "0x..." });

// Sign a message
const { signMessage, signature } = useSignMessage();
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
