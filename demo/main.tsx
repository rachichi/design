import { StrictMode, useState, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import {
  Button,
  CloseButton,
  Heading,
  Label,
  SiteFooter,
  SiteHeader,
  Tabs,
  Tags,
  TextLink,
} from "../src";
import "../src/tokens.css";
import "../src/header.css";
import "../src/components.css";

function Example({ label, bg, children }: { label: string; bg: string; children: ReactNode }) {
  return (
    <section style={{ margin: "0 0 32px" }}>
      <p style={{ margin: "0 24px 8px", fontSize: 13, color: "#555" }}>{label}</p>
      <div style={{ background: bg, minHeight: 120 }}>{children}</div>
    </section>
  );
}

function Demo() {
  const [view, setView] = useState<"browse" | "plot" | "rate">("browse");
  const [mode, setMode] = useState<"2d" | "3d">("2d");
  return (
    <main style={{ padding: "24px 0" }}>
      <Example label='SiteHeader title="FOOD DIARY"' bg="#fff">
        <SiteHeader title="FOOD DIARY" />
      </Example>
      <Example label='SiteHeader title="HOME" theme="image" mobileLabel="name"' bg="#f0e8df">
        <SiteHeader title="HOME" theme="image" mobileLabel="name" />
      </Example>
      <Example label='SiteHeader title="XFILER" theme="dark" + SiteFooter theme="dark"' bg="#111">
        <SiteHeader title="XFILER" theme="dark" />
        <div style={{ height: 60 }} />
        <SiteFooter theme="dark" stack="react, typescript, python" />
      </Example>
      <Example label="Tabs (underline + segmented)" bg="#f5ede0">
        <SiteHeader title="RATE MY SPOON" style={{ ["--rl-header-bg" as string]: "#f5ede0" }} />
        <Tabs
          aria-label="View"
          value={view}
          onChange={setView}
          items={[
            { value: "browse", label: "Rachel's Reviews" },
            { value: "plot", label: "Plot" },
            { value: "rate", label: "Rate Your Spoon" },
          ]}
        />
        <div style={{ padding: 24 }}>
          <Tabs
            variant="segmented"
            aria-label="Map mode"
            value={mode}
            onChange={setMode}
            items={[
              { value: "2d", label: "2D" },
              { value: "3d", label: "3D" },
            ]}
          />
        </div>
      </Example>
      <Example label="Content: Heading, Label, Tags, Button, CloseButton, TextLink, SiteFooter" bg="#f0e8df">
        <div style={{ padding: "32px 40px", maxWidth: 720 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Heading>Rate my spoon</Heading>
            <CloseButton />
          </div>
          <p style={{ fontSize: 14 }}>
            I made Letterboxd for spoons. <TextLink href="https://ratemyspoon.netlify.app/">ratemyspoon.netlify.app</TextLink>
          </p>
          <Label style={{ margin: "24px 0 8px" }}>Process</Label>
          <Label variant="note">My review</Label>
          <Label variant="meta" as="p">
            Taipei, Taiwan
          </Label>
          <div style={{ margin: "16px 0" }}>
            <Tags items={["React", "TypeScript", "Vite", "Tailwind CSS"]} />
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <Button>Start camera</Button>
            <Button variant="solid">Save</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>
        <SiteFooter stack="react, typescript, tailwind" year={2026} />
      </Example>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Demo />
  </StrictMode>,
);
