export type Collection = "posts" | "papers" | "projects" | "tutorials";

export type Heading = {
  id: string;
  text: string;
  level: number;
};

export type Attachment = {
  label: string;
  href: string;
  type?: string;
  size?: string;
  description?: string;
};

export type ContentItem = {
  slug: string;
  collection: Collection;
  type: "post" | "paper" | "project" | "tutorial";
  title: string;
  description: string;
  date?: string;
  updated?: string;
  tags: string[];
  categories: string[];
  draft: boolean;
  cover?: string;
  body: string;
  plainText: string;
  readingTime: string;
  readingMinutes: number;
  headings: Heading[];
  featured?: boolean;
  language?: string;
  authors?: string[];
  venue?: string;
  year?: number;
  doi?: string;
  arxiv?: string;
  status?: string;
  techStack?: string[];
  github?: string;
  demo?: string;
  attachments: Attachment[];
};

export type SearchItem = Pick<
  ContentItem,
  | "slug"
  | "collection"
  | "type"
  | "title"
  | "description"
  | "date"
  | "updated"
  | "tags"
  | "categories"
  | "plainText"
  | "readingTime"
> & {
  href: string;
  hasAttachments: boolean;
  downloadTypes: string[];
};

export type ArchiveGroup = {
  year: string;
  months: {
    month: string;
    items: ContentItem[];
  }[];
};

