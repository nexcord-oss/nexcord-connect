# nexcord-connect

Monorepo for [@nexcord-oss/connect](https://www.npmjs.com/package/@nexcord-oss/connect) — the simplest way to add wallet connection to any Next.js app.

## Packages

| Package | Version | Description |
|---|---|---|
| [`@nexcord-oss/connect`](./packages/core) | 0.5.0 | Core SDK |

## Apps

| App | Description |
|---|---|
| [`demo`](./apps/demo) | Live demo at [connect.nexcord.app](https://connect.nexcord.app) |

## What's in the SDK

- **Default mode** — drop in `<NexcordProvider>` + `<NexcordConnectButton>` and get a fully styled ConnectKit wallet modal in seconds.
- **Headless mode** — set `mode="headless"` on the provider and use `useNexcordConnect`, `useNexcordChain`, `useNexcordWallet`, `useNexcordBalance`, and `useNexcordSign` to build your own UI on top of wagmi context.

## Development

```bash
# Install dependencies
yarn install

# Start demo app
yarn workspace demo dev

# Build SDK
yarn workspace @nexcord-oss/connect build

# Build everything via turbo
yarn build
```

## Repo structure

```
nexcord-connect/
├── apps/
│   └── demo/          # Next.js demo (deployed to Vercel)
├── packages/
│   └── core/          # @nexcord-oss/connect SDK source
├── turbo.json
└── package.json
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT — built by [Nexcord](https://nexcord.app)
