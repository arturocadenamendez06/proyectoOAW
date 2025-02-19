export interface RSSItem {
    creator: string;
    title: string;
    link: string;
    description?: string;
    pubDate?: string;
    contentSnippet: string;
    summary: string;
  }

export interface RSSFeedBase {
  title: string;
  link: string;
  description: string;
  language?: string;
  items: RSSItem[]; 
  pubDate?: string;
  feedUrl?: string;
  generator?: string;
  paginationLinks?: Record<string, string>;
  image?: { link: string; title?: string };
}

export interface FeedData {
  owner: RSSFeedBase;
  items: RSSItem[];
}
  