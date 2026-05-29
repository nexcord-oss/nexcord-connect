"use client";
import { ConnectKitButton } from "connectkit";
import type { ReactElement } from "react";

interface NexcordConnectButtonProps {
  /** Optional label override for the connect button */
  label?: string;
}

/**
 * Drop-in connect wallet button powered by ConnectKit.
 * Place anywhere inside NexcordProvider.
 */
export function NexcordConnectButton(
  props: NexcordConnectButtonProps
): ReactElement {
  return <ConnectKitButton label={props.label} />;
}
