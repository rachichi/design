import {
  forwardRef,
  useEffect,
  useId,
  useState,
  type CSSProperties,
  type MouseEventHandler,
  type ReactNode,
} from "react";

export const PORTFOLIO_URL = "https://rachelliu.netlify.app/";

export type SiteHeaderLink = {
  label: string;
  href: string;
  active?: boolean;
};

export const DEFAULT_LINKS: SiteHeaderLink[] = [
  { label: "PROJECTS", href: `${PORTFOLIO_URL}#/projects` },
  { label: "RESUMÉ", href: `${PORTFOLIO_URL}#/resume` },
];

export type RenderLinkProps = {
  href: string;
  className: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  target?: string;
  rel?: string;
  "aria-current"?: "page";
};

export type SiteHeaderProps = {
  /** Project title shown as "< TITLE >" in the center. */
  title: string;
  /** Makes the centered title a link. */
  titleHref?: string;
  theme?: "light" | "image" | "dark";
  /** Background image URL, used with theme="image". */
  backgroundImage?: string;
  position?: "static" | "sticky" | "fixed";
  name?: string;
  homeHref?: string;
  links?: SiteHeaderLink[];
  /** What sits next to the menu button on small screens. */
  mobileLabel?: "title" | "name";
  /** Open name and nav links in a new tab. */
  newTab?: boolean;
  /** Custom link renderer, e.g. for react-router or next/link. */
  renderLink?: (props: RenderLinkProps) => ReactNode;
  className?: string;
  style?: CSSProperties;
};

const defaultRenderLink = ({ children, ...props }: RenderLinkProps) => <a {...props}>{children}</a>;

export const SiteHeader = forwardRef<HTMLElement, SiteHeaderProps>(function SiteHeader(
  {
    title,
    titleHref,
    theme = "light",
    backgroundImage,
    position = "static",
    name = "RACHEL 静如 LIU",
    homeHref = PORTFOLIO_URL,
    links = DEFAULT_LINKS,
    mobileLabel = "title",
    newTab = false,
    renderLink = defaultRenderLink,
    className,
    style,
  },
  ref,
) {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = () => setOpen(false);
  const targetProps = newTab ? { target: "_blank", rel: "noopener noreferrer" } : {};
  const titleText = `< ${title} >`;

  const link = (href: string, label: ReactNode, extraClass: string, active?: boolean, onClick?: () => void) =>
    renderLink({
      href,
      className: `rl-header__link${active ? " rl-header__link--active" : ""}${extraClass ? ` ${extraClass}` : ""}`,
      children: label,
      onClick,
      ...(active ? { "aria-current": "page" as const } : {}),
      ...targetProps,
    });

  const titleNode = (extraClass: string, onClick?: () => void) =>
    titleHref ? (
      renderLink({ href: titleHref, className: `rl-header__link ${extraClass}`, children: titleText, onClick })
    ) : (
      <span className={extraClass}>{titleText}</span>
    );

  const classes = [
    "rl-header",
    `rl-header--${theme}`,
    position !== "static" && `rl-header--${position}`,
    open && "rl-header--open",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header
      ref={ref}
      className={classes}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, ...style } : style}
    >
      <div className="rl-header__bar">
        {link(homeHref, name, "rl-header__md-only")}
        {titleNode("rl-header__title rl-header__md-only")}
        <nav className="rl-header__nav rl-header__md-only">
          {links.map((l) => (
            <span key={l.href}>{link(l.href, l.label, "", l.active)}</span>
          ))}
        </nav>

        {mobileLabel === "name" ? link(homeHref, name, "rl-header__sm-only") : titleNode("rl-header__sm-only")}
        <button
          type="button"
          className="rl-header__burger rl-header__sm-only"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      {open && (
        <div id={menuId} className="rl-header__menu rl-header__sm-only">
          {mobileLabel === "name" ? titleNode("", close) : link(homeHref, name, "", false, close)}
          {links.map((l) => (
            <span key={l.href}>{link(l.href, l.label, "", l.active, close)}</span>
          ))}
        </div>
      )}
    </header>
  );
});
