"use client";

import { YoursProvider } from "yours-wallet-provider";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <YoursProvider>{children}</YoursProvider>;
}
