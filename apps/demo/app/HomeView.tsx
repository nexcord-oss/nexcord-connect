// Renders the branded Nexcord Connect demo experience.
"use client";
import { NexcordConnectButton } from "@nexcord-oss/connect";
import type { ReactElement } from "react";
import { useAccount } from "wagmi";
import Link from "next/link";

const ROW_STYLE = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
} as const;

const LABEL_STYLE = {
  color: "var(--text-muted)",
  fontSize: "0.8rem",
} as const;

const VALUE_STYLE = {
  color: "var(--text-primary)",
  fontSize: "0.8rem",
  fontFamily: "var(--font-mono)",
} as const;

const SECTION_HEADER_STYLE = {
  fontSize: "0.75rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  color: "var(--text-muted)",
  fontWeight: 500,
} as const;

function NavBar(): ReactElement {
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 2rem", borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-base)", backdropFilter: "blur(12px)" }}>
      <span style={{ fontFamily: "var(--font-display)", fontSize: "1rem", color: "var(--text-primary)" }}>
        Nexcord Connect
      </span>
      <div style={{ display: "flex", gap: "0.25rem", background: "var(--bg-elevated)", borderRadius: "8px", padding: "0.25rem" }}>
        <span style={{ padding: "0.375rem 0.875rem", borderRadius: "6px", fontSize: "0.85rem", background: "var(--bg-card)", color: "var(--text-primary)", fontWeight: 500, border: "1px solid var(--border-default)" }}>
          Default
        </span>
        <Link href="/headless" style={{ padding: "0.375rem 0.875rem", borderRadius: "6px", fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 500 }}>
          Headless
        </Link>
      </div>
    </nav>
  );
}

function BrandLinks(): ReactElement {
  return (
    <div style={{ display: "flex", gap: "var(--space-sm)", flexWrap: "wrap" }}>
      <a
        href="https://connect.nexcord.app/docs"
        style={{ display: "inline-flex", alignItems: "center", padding: "0.625rem 1.25rem", borderRadius: "8px", background: "linear-gradient(135deg, #2482EB, #725EE0)", color: "#fff", fontSize: "0.9rem", fontWeight: 500, transition: "opacity var(--motion-base) var(--ease-out-quint)" }}
      >
        Read the docs
      </a>
      <a
        href="https://connect.nexcord.app"
        style={{ display: "inline-flex", alignItems: "center", padding: "0.625rem 1.25rem", borderRadius: "8px", background: "var(--bg-card)", border: "1px solid var(--border-default)", color: "var(--text-secondary)", fontSize: "0.9rem", fontWeight: 500 }}
      >
        Open dashboard
      </a>
    </div>
  );
}

function WalletCard(): ReactElement {
  const { address, chainId, isConnected, connector } = useAccount();

  return (
    <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-default)", borderRadius: "16px", padding: "var(--space-xl)", display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>

      {/* Status row */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: isConnected ? "#24C27D" : "var(--border-strong)", display: "inline-block", flexShrink: 0 }} />
        <span style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
          {isConnected ? "Wallet connected" : "No wallet connected"}
        </span>
      </div>

      {/* Connect action — shown when disconnected */}
      {!isConnected && (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
          <span style={SECTION_HEADER_STYLE}>Connect wallet</span>
          <NexcordConnectButton />
        </div>
      )}

      {/* Wallet state — shown when connected */}
      {isConnected && (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
          <span style={SECTION_HEADER_STYLE}>Connected wallet</span>
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)", borderRadius: "12px", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {([
              ["Address", address ? `${address.slice(0, 10)}...${address.slice(-6)}` : "—"],
              ["Chain ID", isConnected ? String(chainId) : "—"],
              ["Connector", connector?.name ?? "—"],
            ] as [string, string][]).map(([label, value]) => (
              <div key={label} style={ROW_STYLE}>
                <span style={LABEL_STYLE}>{label}</span>
                <span style={VALUE_STYLE}>{value}</span>
              </div>
            ))}
          </div>
          <NexcordConnectButton />
        </div>
      )}
    </div>
  );
}

export function HomeView(): ReactElement {
  return (
    <>
      <NavBar />
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--space-xl)", paddingTop: "6rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-2xl)", maxWidth: "960px", width: "100%", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
            <span style={{ fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--brand-primary)", fontFamily: "var(--font-body)", fontWeight: 500 }}>
              connect.nexcord.app
            </span>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontFamily: "var(--font-display)", background: "linear-gradient(135deg, #3C8FF4, #806DF1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", margin: 0 }}>
              Nexcord
              <br />
              Connect
            </h1>
            <p style={{ color: "var(--text-body)", fontSize: "1rem", lineHeight: 1.7, maxWidth: "380px", margin: 0 }}>
              The simplest way to add wallet connection to any Next.js app.
            </p>
            <BrandLinks />
          </div>
          <WalletCard />
        </div>
      </main>
    </>
  );
}
