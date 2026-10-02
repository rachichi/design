# @rachichi/design

Shared header and design tokens for Rachel Liu's projects.

## Install

```sh
npm install @rachichi/design
```

## SiteHeader

```tsx
import { SiteHeader } from "@rachichi/design";
import "@rachichi/design/header.css";

<SiteHeader title="FOOD DIARY" />;
```

The header CSS is plain, precompiled CSS, so it works with Tailwind v3, Tailwind v4, Next.js, or no Tailwind at all.

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

## Design tokens

- `@rachichi/design/tokens.css`: CSS variables (`--rl-warm-black`, `--rl-beige`, `--rl-beige-dark`, `--rl-cream`, `--rl-font-sans`).
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
npm run dev        # demo page with every theme
npm run typecheck
npm run build
```

## Releasing

1. Bump `version` in `package.json` (patch for tweaks, minor for new props, major for breaking changes).
2. `npm publish`.
3. Dependabot opens update PRs in each project repo; merging them redeploys the sites.
