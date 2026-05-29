// Defines the root shell and provider wiring for the Nexcord Connect demo.
import type { Metadata } from "next";
import "./globals.css";
import { NexcordProvider } from "@nexcord-oss/connect";

export const metadata: Metadata = {
  title: "Nexcord Connect — Demo",
  description: "The simplest way to add wallet connection to any Next.js app.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="en">
      <body>
        <NexcordProvider
          projectId={process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? ""}
          appName="Nexcord Connect Demo"
        >
          {children}
        </NexcordProvider>
      </body>
    </html>
  );
}
