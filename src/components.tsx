import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
} from "react";

const cx = (...classes: (string | false | undefined)[]) => classes.filter(Boolean).join(" ");

export type PageShellProps = {
  header?: ReactNode;
  footer?: ReactNode;
  /** Let the content area clip instead of scroll (maps, canvases). */
  clip?: boolean;
  className?: string;
  children: ReactNode;
};

export function PageShell({ header, footer, clip = false, className, children }: PageShellProps) {
  return (
    <div className={cx("rl-page", className)}>
      {header}
      <main className={cx("rl-page__main", clip && "rl-page__main--clip")}>{children}</main>
      {footer}
    </div>
  );
}

export type SiteFooterProps = {
  /** Tech stack, e.g. "react, typescript, tailwind". */
  stack?: string;
  year?: number | string;
  credit?: string;
  theme?: "light" | "dark";
  className?: string;
  /** Replaces the default "coded by rachel · stack · year" line. */
  children?: ReactNode;
};

export function SiteFooter({
  stack,
  year = new Date().getFullYear(),
  credit = "coded by rachel",
  theme = "light",
  className,
  children,
}: SiteFooterProps) {
  const line = [credit, stack, String(year)].filter(Boolean).join(" · ");
  return <footer className={cx("rl-footer", theme === "dark" && "rl-footer--dark", className)}>{children ?? line}</footer>;
}

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3";
};

export function Heading({ as: Tag = "h2", className, ...props }: HeadingProps) {
  return <Tag className={cx("rl-heading", className)} {...props} />;
}

export type LabelProps = HTMLAttributes<HTMLElement> & {
  as?: "h3" | "h4" | "p" | "span";
  /** section: bold caps; note: small italic caps; meta: small muted. */
  variant?: "section" | "note" | "meta";
};

export function Label({ as: Tag = "h3", variant = "section", className, ...props }: LabelProps) {
  return (
    <Tag
      className={cx("rl-label", variant === "note" && "rl-label--note", variant === "meta" && "rl-label--meta", className)}
      {...props}
    />
  );
}

export type TagsProps = {
  items: string[];
  className?: string;
};

export function Tags({ items, className }: TagsProps) {
  return (
    <ul className={cx("rl-tags", className)}>
      {items.map((item) => (
        <li key={item} className="rl-tag">
          {item}
        </li>
      ))}
    </ul>
  );
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "outline" | "solid";
};

export function Button({ variant = "outline", className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={cx("rl-button", variant === "solid" && "rl-button--solid", className)} {...props} />;
}

export type CloseButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function CloseButton({ className, type = "button", "aria-label": ariaLabel = "Close", ...props }: CloseButtonProps) {
  return (
    <button type={type} aria-label={ariaLabel} className={cx("rl-close", className)} {...props}>
      ✕
    </button>
  );
}

export type TabItem<T extends string> = { value: T; label: ReactNode };

export type TabsProps<T extends string> = {
  items: TabItem<T>[];
  value: T;
  onChange: (value: T) => void;
  /** underline: full-width bar under the header; segmented: compact toggle. */
  variant?: "underline" | "segmented";
  className?: string;
  "aria-label"?: string;
};

export function Tabs<T extends string>({
  items,
  value,
  onChange,
  variant = "underline",
  className,
  "aria-label": ariaLabel,
}: TabsProps<T>) {
  return (
    <div role="tablist" aria-label={ariaLabel} className={cx("rl-tabs", variant === "segmented" && "rl-tabs--segmented", className)}>
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          role="tab"
          aria-selected={item.value === value}
          className="rl-tab"
          onClick={() => onChange(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export function TextLink({ className, ...props }: TextLinkProps) {
  return <a className={cx("rl-link", className)} {...props} />;
}
