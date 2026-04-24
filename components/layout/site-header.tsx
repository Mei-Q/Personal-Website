import Link from "next/link";
import { FlaskConical } from "lucide-react";
import { siteConfig } from "@/site.config";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[rgb(var(--border))] bg-[rgb(var(--background))]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-2 font-semibold">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-lab-teal text-white">
            <FlaskConical className="h-4 w-4" />
          </span>
          <span className="truncate">{siteConfig.shortName}</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="主导航">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-[rgb(var(--muted-foreground))] transition hover:bg-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
      <nav
        className="flex snap-x gap-1 overflow-x-auto border-t border-[rgb(var(--border))] px-4 py-2 md:hidden"
        aria-label="移动端导航"
      >
        {siteConfig.nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="snap-start whitespace-nowrap rounded-md px-3 py-1.5 text-sm text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
