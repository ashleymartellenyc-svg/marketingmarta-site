"use client";

import { ReactNode } from "react";

export default function Highlight({ children }: { children: ReactNode }) {
  return (
    <mark
      style={{
        background: "rgba(179,58,44,0.28)",
        borderRadius: "3px 2px 4px 2px / 4px 3px 2px 4px",
        padding: "1px 3px",
        margin: "0 -1px",
        color: "inherit",
        fontStyle: "inherit",
        WebkitBoxDecorationBreak: "clone",
        boxDecorationBreak: "clone",
      }}
    >
      {children}
    </mark>
  );
}
