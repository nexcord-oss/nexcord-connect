// Shows the wallet connection controls and current wallet state.
"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useWalletUser } from "@nexcord-oss/connect";
import type { ReactElement } from "react";

function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function DemoConnectPanel(): ReactElement {
  const walletUser = useWalletUser();

  return (
    <aside className="connect-card" aria-label="Wallet connection demo">
      <div className="card-header">
        <span className="status-dot" />
        <span>{walletUser === null ? "Ready to connect" : "Wallet connected"}</span>
      </div>
      <div className="connect-button-frame">
        <ConnectButton />
      </div>
      <dl className="wallet-details">
        <div>
          <dt>Address</dt>
          <dd>{walletUser === null ? "Not connected" : formatAddress(walletUser.address)}</dd>
        </div>
        <div>
          <dt>Chain ID</dt>
          <dd>{walletUser === null ? "Waiting for wallet" : walletUser.chainId}</dd>
        </div>
      </dl>
    </aside>
  );
}
