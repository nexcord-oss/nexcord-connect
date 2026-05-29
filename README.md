# @nexcord-oss/connect

The simplest way to add wallet connection to any Next.js app.

```bash
npm install @nexcord-oss/connect
```

```tsx
"use client";
import { NexcordProvider, useWalletUser } from "@nexcord-oss/connect";
function WalletStatus(): JSX.Element {
  const user = useWalletUser();
  return <p>{user?.address ?? "Not connected"}</p>;
}
export function App(): JSX.Element {
  return (
    <NexcordProvider projectId="project-id" appName="Example App">
      <WalletStatus />
    </NexcordProvider>
  );
}
```

## Cloud

Get a managed WalletConnect proxy, connection analytics, and a dashboard at [connect.nexcord.app](https://connect.nexcord.app).

## Docs

Read the documentation at [connect.nexcord.app/docs](https://connect.nexcord.app/docs).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
