// Defines the root shell and provider wiring for the Nexcord Connect demo.
import type { Metadata } from "next";
import type { ReactElement, ReactNode } from "react";
import { NexcordProvider } from "@nexcord-oss/connect";
import "./styles.css";
import "./wallet-card.css";

export const metadata: Metadata = {
  title: "Nexcord Connect Demo",
  description: "The simplest way to add wallet connection to any Next.js app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactElement {
  return (
    <html lang="en">
      <body>
        <NexcordProvider projectId="YOUR_WALLETCONNECT_PROJECT_ID" appName="Nexcord Demo">
          {children}
        </NexcordProvider>
      </body>
    </html>
  );
}
