"use client";
// Demonstrates the three headless hooks without any ConnectKit UI.
import {
  useNexcordConnect,
  useNexcordChain,
  useNexcordWallet,
  useNexcordSign,
  useNexcordBalance,
} from "@nexcord-oss/connect";
import type { ReactElement } from "react";
import Link from "next/link";

function NavBar(): ReactElement {
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 2rem", borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-base)", backdropFilter: "blur(12px)" }}>
      <span style={{ fontFamily: "var(--font-display)", fontSize: "1rem", color: "var(--text-primary)" }}>
        Nexcord Connect
      </span>
      <div style={{ display: "flex", gap: "0.25rem", background: "var(--bg-elevated)", borderRadius: "8px", padding: "0.25rem" }}>
        <Link href="/" style={{ padding: "0.375rem 0.875rem", borderRadius: "6px", fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 500 }}>
          Default
        </Link>
        <span style={{ padding: "0.375rem 0.875rem", borderRadius: "6px", fontSize: "0.85rem", background: "var(--bg-card)", color: "var(--text-primary)", fontWeight: 500, border: "1px solid var(--border-default)" }}>
          Headless
        </span>
      </div>
    </nav>
  );
}

function ConnectorList(): ReactElement {
  const { isConnected, isConnecting, error } = useNexcordConnect();
  const { connectors, connectWith, connector } = useNexcordWallet();

  if (isConnected) return <></>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
      <span style={{ fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 500 }}>
        Available connectors
      </span>
      {connectors.map((c) => (
        <button
          key={c.id}
          onClick={() => connectWith(c)}
          disabled={isConnecting}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.75rem 1rem",
            background: connector?.id === c.id ? "var(--bg-card-hover)" : "var(--bg-card)",
            border: "1px solid var(--border-default)",
            borderRadius: "10px",
            color: "var(--text-primary)",
            fontSize: "0.9rem",
            fontFamily: "var(--font-body)",
            cursor: isConnecting ? "wait" : "pointer",
            opacity: isConnecting ? 0.6 : 1,
            transition: "background var(--motion-base) var(--ease-out-quint)",
          }}
        >
          <span>{c.name}</span>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{c.id}</span>
        </button>
      ))}
      {error && (
        <p style={{ fontSize: "0.8rem", color: "#f87171", marginTop: "0.25rem" }}>{error.message}</p>
      )}
    </div>
  );
}

function ChainSwitcher(): ReactElement {
  const { chain, chains, switchChain, isSwitching } = useNexcordChain();
  const { isConnected } = useNexcordConnect();

  if (!isConnected) return <></>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
      <span style={{ fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 500 }}>
        Switch chain
      </span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {chains.map((c) => (
          <button
            key={c.id}
            onClick={() => switchChain(c.id)}
            disabled={isSwitching || c.id === chain?.id}
            style={{
              padding: "0.375rem 0.875rem",
              borderRadius: "8px",
              fontSize: "0.8rem",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              cursor: c.id === chain?.id ? "default" : isSwitching ? "wait" : "pointer",
              background: c.id === chain?.id ? "linear-gradient(135deg, #2482EB22, #725EE022)" : "var(--bg-card)",
              border: c.id === chain?.id ? "1px solid var(--border-brand)" : "1px solid var(--border-default)",
              color: c.id === chain?.id ? "var(--brand-primary)" : "var(--text-secondary)",
              opacity: isSwitching && c.id !== chain?.id ? 0.5 : 1,
              transition: "all var(--motion-base) var(--ease-out-quint)",
            }}
          >
            {c.name}
          </button>
        ))}
      </div>
    </div>
  );
}

function WalletState(): ReactElement {
  const { address, chainId, isConnected, disconnect } = useNexcordConnect();
  const { connector } = useNexcordWallet();
  const { chain } = useNexcordChain();
  const { balance, isLoading: balanceLoading } = useNexcordBalance();

  if (!isConnected) return <></>;

  const balanceDisplay = balanceLoading
    ? "Loading…"
    : balance
    ? `${Number(balance.formatted).toFixed(4)} ${balance.symbol}`
    : "—";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
      <span style={{ fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 500 }}>
        Connected wallet
      </span>
      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)", borderRadius: "12px", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
        {[
          ["Address", address ? `${address.slice(0, 10)}...${address.slice(-6)}` : "—"],
          ["Balance", balanceDisplay],
          ["Chain", chain ? `${chain.name} (${chainId})` : String(chainId)],
          ["Connector", connector?.name ?? "—"],
        ].map(([label, value]) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{label}</span>
            <span style={{ color: "var(--text-primary)", fontSize: "0.8rem", fontFamily: "var(--font-mono)" }}>{value}</span>
          </div>
        ))}
      </div>
      <button
        onClick={disconnect}
        style={{
          padding: "0.625rem 1rem",
          background: "transparent",
          border: "1px solid var(--border-strong)",
          borderRadius: "8px",
          color: "var(--text-secondary)",
          fontSize: "0.875rem",
          fontFamily: "var(--font-body)",
          cursor: "pointer",
          alignSelf: "flex-start",
          transition: "border-color var(--motion-base) var(--ease-out-quint)",
        }}
      >
        Disconnect
      </button>
    </div>
  );
}

const DEMO_NONCE = "demo-nonce-123";

function SignSection(): ReactElement {
  const { isConnected } = useNexcordConnect();
  const { signMessage, signature, message, isPending, error } = useNexcordSign(DEMO_NONCE);

  if (!isConnected) return <></>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)", paddingTop: "var(--space-md)", borderTop: "1px solid var(--border-subtle)" }}>
      <span style={{ fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: 500 }}>
        Sign message
      </span>

      {/* Message preview */}
      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)", borderRadius: "10px", padding: "0.75rem 1rem" }}>
        <pre style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-secondary)", margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
          {message}
        </pre>
      </div>

      {/* Sign button */}
      <button
        onClick={signMessage}
        disabled={isPending}
        style={{
          padding: "0.625rem 1rem",
          background: isPending ? "transparent" : "linear-gradient(135deg, #2482EB, #725EE0)",
          border: isPending ? "1px solid var(--border-strong)" : "none",
          borderRadius: "8px",
          color: isPending ? "var(--text-muted)" : "#fff",
          fontSize: "0.875rem",
          fontFamily: "var(--font-body)",
          fontWeight: 500,
          cursor: isPending ? "wait" : "pointer",
          alignSelf: "flex-start",
          transition: "opacity var(--motion-base) var(--ease-out-quint)",
          opacity: isPending ? 0.6 : 1,
        }}
      >
        {isPending ? "Waiting for wallet…" : "Sign Message"}
      </button>

      {/* Error */}
      {error && (
        <p style={{ fontSize: "0.8rem", color: "#f87171", margin: 0 }}>{error.message}</p>
      )}

      {/* Signature result */}
      {signature && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Signature</span>
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-brand)", borderRadius: "10px", padding: "0.75rem 1rem" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--brand-primary)", margin: 0, wordBreak: "break-all" }}>
              {signature}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export function HeadlessView(): ReactElement {
  const { isConnected } = useNexcordConnect();

  return (
    <>
      <NavBar />
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--space-xl)", paddingTop: "6rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-2xl)", maxWidth: "960px", width: "100%", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
            <span style={{ fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--brand-primary)", fontFamily: "var(--font-body)", fontWeight: 500 }}>
              Headless mode
            </span>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontFamily: "var(--font-display)", background: "linear-gradient(135deg, #3C8FF4, #806DF1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", margin: 0 }}>
              Your UI,
              <br />
              our hooks.
            </h1>
            <p style={{ color: "var(--text-body)", fontSize: "1rem", lineHeight: 1.7, maxWidth: "380px", margin: 0 }}>
              Set <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.875em", color: "var(--brand-primary)", background: "var(--bg-elevated)", padding: "0.1em 0.4em", borderRadius: "4px" }}>mode="headless"</code> on your provider.
              Use <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.875em", color: "var(--brand-primary)", background: "var(--bg-elevated)", padding: "0.1em 0.4em", borderRadius: "4px" }}>useNexcordConnect</code>, <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.875em", color: "var(--brand-primary)", background: "var(--bg-elevated)", padding: "0.1em 0.4em", borderRadius: "4px" }}>useNexcordChain</code>, and <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.875em", color: "var(--brand-primary)", background: "var(--bg-elevated)", padding: "0.1em 0.4em", borderRadius: "4px" }}>useNexcordWallet</code> to build any wallet experience. No ConnectKit, no modals, no opinions.
            </p>
          </div>

          <div style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-default)", borderRadius: "16px", padding: "var(--space-xl)", display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: isConnected ? "#24C27D" : "var(--border-strong)", display: "inline-block", flexShrink: 0 }} />
              <span style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                {isConnected ? "Wallet connected" : "No wallet connected"}
              </span>
            </div>
            <ConnectorList />
            <WalletState />
            <ChainSwitcher />
            <SignSection />
          </div>
        </div>
      </main>
    </>
  );
}
