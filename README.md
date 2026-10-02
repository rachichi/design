# @rachichi/design

The shared design package of my personal projects: header, footer, type, tags, buttons, tabs, and the color and font tokens behind them. Each project stays in its own repo and installs this package; only the project-specific bits (title, theme, links, stack) live in the project.

## What's in it

| Piece | What it replaces |
| ----- | ---------------- |
| `SiteHeader` | The hand-copied `RACHEL 静如 LIU · < TITLE > · PROJECTS RESUMÉ` navbar in every repo |
| `SiteFooter` | The portfolio's `coded by rachel · react, typescript, tailwind · 2026` line |
| `PageShell` | The full-height "header + content + footer" layout used by fooddiary, ratemyspoon, portfolio |
| `Heading`, `Label` | Big bold caps titles (`RATE MY SPOON`), small caps section labels (`PROCESS`, `MY REVIEW`) |
| `Tags` | Square outlined tech-stack chips on the projects page |
| `Button`, `CloseButton` | Outlined caps button that inverts on hover; the `✕` close |
| `Tabs` | ratemyspoon's underlined view tabs and fooddiary's 2D/3D toggle |
| `TextLink` | Underlined link that fades on hover |
| `tokens.css`, Tailwind preset, Tailwind v4 theme | Colors, font, and ink opacities repeated in every Tailwind config |
| `base.css` (opt-in) | Font, text color, warm-black selection highlight, full-viewport app helper |

## Install

```sh
npm install @rachichi/design
```

```tsx
import "@rachichi/design/styles.css"; // tokens + header + components, in one file
```

All CSS is plain and precompiled, so it works with Tailwind v3, Tailwind v4, Next.js, or no Tailwind at all. Every class is prefixed `rl-`, so nothing collides with app styles. Individual files are also exported: `tokens.css`, `header.css`, `components.css`, `base.css`, `theme.css`.

## Design practices

These are the rules the components encode. Follow them for anything new so it still looks like the rest.

- **One font:** Helvetica Neue → Helvetica → Arial. No second typeface.
- **Small palette:** warm black `#1a1a1a` on white, beige `#f0e8df`, dark beige `#e8ddd2`, or cream `#f5ede0`. Project accent colors are fine inside content, never in the header or footer.
- **Ink, not grays:** secondary text and lines are warm black at 70 / 50 / 40 / 30 / 20 / 10% (`--rl-ink-70` … `--rl-ink-10`, or `text-warm-black/40` in Tailwind).
- **Caps for structure:** navigation, headings, labels, tabs, and buttons are uppercase with wide tracking; body copy is sentence case.
- **Square and thin:** no rounded corners, 1px hairlines at 10–30% ink, no shadows.
- **Quiet hover:** links and icons fade to 50–60% opacity; outlined buttons invert to solid.
- **One breakpoint:** layouts switch at 768px (`md`). Below it the header collapses to a menu button.
- **Full-height apps:** tools (maps, graphs, galleries) fill the viewport with a fixed header and scroll inside the content area (`PageShell`).
- **Footer credit:** `coded by rachel · <stack> · <year>`, tiny and 40% ink, on pages that scroll to an end.

## SiteHeader

```tsx
import { SiteHeader } from "@rachichi/design";

<SiteHeader title="FOOD DIARY" />;
```

### Props

| Prop              | Default                          | Notes                                                        |
| ----------------- | -------------------------------- | ------------------------------------------------------------ |
| `title`           | required                         | Shown as `< TITLE >` in the center                           |
| `titleHref`       | none                             | Makes the title a link                                       |
| `theme`           | `"light"`                        | `"light"`, `"image"` (use with `backgroundImage`), `"dark"`  |
| `backgroundImage` | none                             | Image URL for `theme="image"`                                |
| `position`        | `"static"`                       | `"static"`, `"sticky"`, `"fixed"`                            |
| `name`            | `RACHEL 静如 LIU`                |                                                              |
| `homeHref`        | `https://rachelliu.netlify.app/` | Where the name links                                         |
| `links`           | PROJECTS, RESUMÉ                 | `{ label, href, active? }[]`                                 |
| `mobileLabel`     | `"title"`                        | Label beside the menu button on phones: `"title"` or `"name"` |
| `newTab`          | `false`                          | Open name and nav links in a new tab                         |
| `renderLink`      | `<a>`                            | Custom link renderer (react-router, next/link)               |
| `className`, `style` |                               | Pass-through; `ref` is forwarded to `<header>`               |

### Router links

```tsx
// react-router
<SiteHeader
  title="HOME"
  renderLink={({ href, ...props }) => <NavLink to={href} {...props} />}
/>

// next/link
<SiteHeader title="AGORA" renderLink={(props) => <Link {...props} />} />
```

### CSS variable overrides

Set any of these on `.rl-header` (or via `style`) to customize a single project:

```css
.rl-header {
  --rl-header-fg: #1a1a1a;
  --rl-header-bg: #ffffff;
  --rl-header-border: rgba(26, 26, 26, 0.2);
  --rl-header-divider: rgba(26, 26, 26, 0.1);
  --rl-header-hover-opacity: 0.5;
  --rl-header-z: 50;
  --rl-header-z-open: 70;
}
```

## SiteFooter

```tsx
import { SiteFooter } from "@rachichi/design";

<SiteFooter stack="react, typescript, tailwind" />;
// coded by rachel · react, typescript, tailwind · 2026
```

| Prop       | Default             | Notes                                      |
| ---------- | ------------------- | ------------------------------------------ |
| `stack`    | none                | Tech stack shown in the middle             |
| `year`     | current year        |                                            |
| `credit`   | `"coded by rachel"` |                                            |
| `theme`    | `"light"`           | `"light"` or `"dark"`                      |
| `children` | none                | Replaces the whole line (links allowed)    |

## PageShell

Full-height layout: header, scrolling content, footer.

```tsx
import { PageShell, SiteFooter, SiteHeader } from "@rachichi/design";
import "@rachichi/design/base.css";
// add class="rl-fullscreen" to <html> so the shell fills the viewport

<PageShell header={<SiteHeader title="FOOD DIARY" />} footer={<SiteFooter stack="react, three.js" />} clip>
  <FoodMap />
</PageShell>;
```

`clip` stops the content area from scrolling (maps, canvases); leave it off for pages that scroll.

The shell never scrolls itself, so a `position="fixed"` header inside it stays in the layout flow instead of covering the content.

## Content components

```tsx
import { Button, CloseButton, Heading, Label, Tabs, Tags, TextLink } from "@rachichi/design";

<Heading>Rate my spoon</Heading>                {/* h2; as="h1" | "h3" */}
<Label>Process</Label>                          {/* section caps */}
<Label variant="note">My review</Label>        {/* small italic caps */}
<Label variant="meta" as="p">Taipei, Taiwan</Label>
<Tags items={["React", "TypeScript", "Vite"]} />
<Button onClick={start}>Start camera</Button>   {/* variant="solid" for the filled version */}
<CloseButton onClick={close} />
<TextLink href="https://ratemyspoon.netlify.app/">ratemyspoon.netlify.app</TextLink>

<Tabs
  value={view}
  onChange={setView}
  items={[
    { value: "browse", label: "Rachel's Reviews" },
    { value: "plot", label: "Plot" },
  ]}
/>
<Tabs variant="segmented" value={mode} onChange={setMode} items={[{ value: "2d", label: "2D" }, { value: "3d", label: "3D" }]} />
```

All components accept `className`; `Heading`, `Label`, `Button`, `CloseButton`, and `TextLink` also pass through native element props. Without React, use the same classes directly: `rl-heading`, `rl-label`, `rl-label--note`, `rl-label--meta`, `rl-tags`/`rl-tag`, `rl-button`, `rl-button--solid`, `rl-close`, `rl-tabs`/`rl-tab` (`aria-selected="true"` marks the active tab), `rl-tabs--segmented`, `rl-link`, `rl-footer`.

## Design tokens

- `@rachichi/design/tokens.css`: CSS variables: colors (`--rl-warm-black`, `--rl-beige`, `--rl-beige-dark`, `--rl-cream`, `--rl-white`), ink opacities (`--rl-ink`, `--rl-ink-70` … `--rl-ink-10`), `--rl-font-sans`, tracking (`--rl-tracking-wide`, `-wider`, `-widest`), `--rl-hover-opacity`. Override `--rl-ink` on a container to recolor text, buttons, and active tabs inside it.
- Tailwind v3 preset:
  ```js
  import rachel from "@rachichi/design/tailwind-preset";
  export default { presets: [rachel], content: [...] };
  ```
- Tailwind v4 theme:
  ```css
  @import "tailwindcss";
  @import "@rachichi/design/theme.css";
  ```

## Development

```sh
npm install
npm run dev        # demo page with every component
npm run typecheck
npm run build
```

## Releasing

1. Bump `version` in `package.json` (patch for tweaks, minor for new props, major for breaking changes).
2. `npm publish`.
3. Dependabot opens update PRs in each project repo; merging them redeploys the sites.

Projects don't change until they install the new version, so one bad release can't break every site at once.
