// Renders the branded Nexcord Connect demo landing page.
import type { ReactElement } from "react";
import { DemoConnectPanel } from "./DemoConnectPanel";

export default function Page(): ReactElement {
  return (
    <main className="demo-shell">
      <section className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">connect.nexcord.app</p>
          <h1>Nexcord Connect</h1>
          <p className="positioning">
            The simplest way to add wallet connection to any Next.js app.
          </p>
          <div className="hero-actions">
            <a className="primary-link" href="https://connect.nexcord.app/docs">
              Read the docs
            </a>
            <a className="secondary-link" href="https://connect.nexcord.app">
              Open dashboard
            </a>
          </div>
        </div>
        <DemoConnectPanel />
      </section>
    </main>
  );
}
