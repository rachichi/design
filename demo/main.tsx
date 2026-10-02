import { StrictMode, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { SiteHeader } from "../src";
import "../src/tokens.css";
import "../src/header.css";

function Example({ label, bg, children }: { label: string; bg: string; children: ReactNode }) {
  return (
    <section style={{ margin: "0 0 32px" }}>
      <p style={{ margin: "0 24px 8px", fontSize: 13, color: "#555" }}>{label}</p>
      <div style={{ background: bg, minHeight: 120 }}>{children}</div>
    </section>
  );
}

function Demo() {
  return (
    <main style={{ padding: "24px 0" }}>
      <Example label='title="FOOD DIARY"' bg="#fff">
        <SiteHeader title="FOOD DIARY" />
      </Example>
      <Example label='title="HOME" theme="image" mobileLabel="name"' bg="#f0e8df">
        <SiteHeader title="HOME" theme="image" mobileLabel="name" />
      </Example>
      <Example label='title="XFILER" theme="dark"' bg="#111">
        <SiteHeader title="XFILER" theme="dark" />
      </Example>
      <Example label='title="RATE MY SPOON" + CSS variable overrides' bg="#f5ede0">
        <SiteHeader
          title="RATE MY SPOON"
          style={{ ["--rl-header-bg" as string]: "#f5ede0", ["--rl-header-hover-opacity" as string]: 0.7 }}
        />
      </Example>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Demo />
  </StrictMode>,
);
