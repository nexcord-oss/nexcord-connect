// Headless mode demo page.
import type { ReactElement } from "react";
import { HeadlessView } from "./HeadlessView";

export const metadata = {
  title: "Nexcord Connect — Headless Demo",
  description: "Build your own wallet UI with the Nexcord Connect headless hooks.",
};

export default function HeadlessPage(): ReactElement {
  return <HeadlessView />;
}
