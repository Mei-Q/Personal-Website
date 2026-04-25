import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { languageLabel } from "@/lib/utils";

type ContentFiltersProps = {
  basePath: string;
  tags: string[];
  categories: string[];
  languages?: string[];
  activeTag?: string;
  activeCategory?: string;
  activeLanguage?: string;
};

export function ContentFilters({
  basePath,
  tags,
  categories,
  languages = [],
  activeTag,
  activeCategory,
  activeLanguage
}: ContentFiltersProps) {
  const hasActiveFilter = activeTag || activeCategory || activeLanguage;

  return (
    <aside className="order-first space-y-6 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--panel))] p-4 lg:order-none lg:sticky lg:top-28 lg:self-start lg:p-5">
      <div>
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold">筛选</h2>
          {hasActiveFilter ? (
            <Link href={basePath} className="text-xs text-lab-teal hover:underline">
              清除
            </Link>
          ) : null}
        </div>
        <p className="text-xs leading-5 text-[rgb(var(--muted-foreground))]">
          支持按分类、标签和语言筛选，适合长期维护中英文研究内容。
        </p>
      </div>
      {languages.length ? (
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[rgb(var(--muted-foreground))]">
            Language
          </h3>
          <div className="flex flex-wrap gap-2">
            {languages.map((language) => (
              <Badge
                key={language}
                href={`${basePath}?language=${encodeURIComponent(language)}`}
                className={activeLanguage === language ? "border-lab-teal text-lab-teal" : ""}
              >
                {languageLabel(language)}
              </Badge>
            ))}
          </div>
        </div>
      ) : null}
      {categories.length ? (
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[rgb(var(--muted-foreground))]">
            Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                href={`${basePath}?category=${encodeURIComponent(category)}`}
                className={activeCategory === category ? "border-lab-teal text-lab-teal" : ""}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      ) : null}
      {tags.length ? (
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[rgb(var(--muted-foreground))]">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                href={`${basePath}?tag=${encodeURIComponent(tag)}`}
                className={activeTag === tag ? "border-lab-teal text-lab-teal" : ""}
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      ) : null}
    </aside>
  );
}