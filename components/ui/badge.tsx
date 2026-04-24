import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  href?: string;
  className?: string;
};

export function Badge({ children, href, className }: BadgeProps) {
  const classes = cn(
    "inline-flex items-center rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--muted))] px-2 py-1 text-xs font-medium text-[rgb(var(--muted-foreground))] transition hover:text-[rgb(var(--foreground))]",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <span className={classes}>{children}</span>;
}
