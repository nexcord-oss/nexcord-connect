// Headless mode demo page.
import type { ReactElement } from "react";
import { HeadlessView } from "./HeadlessView";

export const metadata = {
  title: "Headless Demo",
  description: "Build your own wallet UI with the Nexcord Connect headless hooks — no ConnectKit, no modals, full control.",
};

export default function HeadlessPage(): ReactElement {
  return <HeadlessView />;
}
