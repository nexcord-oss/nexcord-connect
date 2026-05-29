// Renders the branded Nexcord Connect demo experience.
"use client";
import { NexcordConnectButton } from "@nexcord-oss/connect";
import type { ReactElement } from "react";
import { useAccount } from "wagmi";

function buildAddress(address: string | undefined, isConnected: boolean): string {
  if (!isConnected || address === undefined) return "Not connected";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function BrandLinks(): ReactElement {
  return (
    <div style={{ display: "flex", gap: "var(--space-sm)", flexWrap: "wrap" }}>
      <a
        href="https://connect.nexcord.app/docs"
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "0.625rem 1.25rem",
          borderRadius: "8px",
          background: "linear-gradient(135deg, #2482EB, #725EE0)",
          color: "#fff",
          fontSize: "0.9rem",
          fontWeight: 500,
          transition: "opacity var(--motion-base) var(--ease-out-quint)",
        }}
      >
        Read the docs
      </a>
      <a
        href="https://connect.nexcord.app"
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "0.625rem 1.25rem",
          borderRadius: "8px",
          background: "var(--bg-card)",
          border: "1px solid var(--border-default)",
          color: "var(--text-secondary)",
          fontSize: "0.9rem",
          fontWeight: 500,
        }}
      >
        Open dashboard
      </a>
    </div>
  );
}

function WalletCard(): ReactElement {
  const { address, chainId, isConnected } = useAccount();

  return (
    <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)", borderRadius: "16px", padding: "var(--space-xl)", display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-xs)" }}>
        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: isConnected ? "#24C27D" : "var(--border-strong)", display: "inline-block" }} />
        <span style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
          {isConnected ? "Wallet connected" : "Ready to connect"}
        </span>
      </div>
      <NexcordConnectButton />
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)", marginTop: "var(--space-xs)", paddingTop: "var(--space-md)", borderTop: "1px solid var(--border-subtle)" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>Address</span>
          <span style={{ color: isConnected ? "var(--text-primary)" : "var(--text-muted)", fontSize: "0.875rem", fontFamily: "var(--font-mono)" }}>
            {buildAddress(address, isConnected)}
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>Chain ID</span>
          <span style={{ color: isConnected ? "var(--text-primary)" : "var(--text-muted)", fontSize: "0.875rem" }}>
            {isConnected ? chainId : "Waiting for wallet"}
          </span>
        </div>
      </div>
    </div>
  );
}

export function HomeView(): ReactElement {
  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--space-xl)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-2xl)", maxWidth: "960px", width: "100%", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
          <span style={{ fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--brand-primary)", fontFamily: "var(--font-body)", fontWeight: 500 }}>
            connect.nexcord.app
          </span>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontFamily: "var(--font-display)", background: "linear-gradient(135deg, #3C8FF4, #806DF1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", margin: 0 }}>
            Nexcord
            <br />
            Connect
          </h1>
          <p style={{ color: "var(--text-body)", fontSize: "1.125rem", lineHeight: 1.6, maxWidth: "400px", margin: 0 }}>
            The simplest way to add wallet connection to any Next.js app.
          </p>
          <BrandLinks />
        </div>
        <WalletCard />
      </div>
    </main>
  );
}
