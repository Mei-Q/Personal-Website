import Link from "next/link";
import { siteConfig } from "@/site.config";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-[rgb(var(--border))]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold">{siteConfig.name}</p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[rgb(var(--muted-foreground))]">
            {siteConfig.description}
          </p>
          <p className="mt-4 text-xs text-[rgb(var(--muted-foreground))]">
            © {new Date().getFullYear()} {siteConfig.author.name}. Built with Next.js, MDX and
            Tailwind CSS.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {siteConfig.nav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
