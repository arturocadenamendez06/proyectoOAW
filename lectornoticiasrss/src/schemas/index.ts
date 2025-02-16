import { z } from 'zod'

export const FeedFormSchema = z.object({
    url: z.string().url({ message: "Debe ser una URL válida" }),
});

export const ItemSchema = z.object({
  title: z.string(),
  link: z.string().url(),
  guid: z.string().url(),
  pubDate: z.string(),
  description: z.string().optional(),
  "dc:creator": z.string().optional(),
});

export const ChannelSchema = z.object({
  title: z.string(),
  link: z.string().url(),
  description: z.string(),
  pubDate: z.string(),
  generator: z.string(),
  "atom:link": z.object({
    href: z.string().url(),
    rel: z.string(),
    type: z.string(),
  }),
  item: z.array(ItemSchema),
  "dc:creator": z.string().optional(),
});

export const RSSFeedSchema = z.object({
  rss: z.object({
    channel: ChannelSchema,
  }),
});

export type RSSFeed = z.infer<typeof RSSFeedSchema>;