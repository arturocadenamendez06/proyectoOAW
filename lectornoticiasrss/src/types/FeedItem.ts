export interface RSSItem {
    creator: string;
    title: string;
    link: string;
    description?: string;
    pubDate?: string;
    contentSnippet: string;
    summary: string;
    // Pueden agregar más campos aquí según lo que tengan los diferentes feeds
  }

export interface RSSFeedBase {
    title: string;
    link: string;
    description: string;
    language?: string; // Este es opcional, no todos los feeds lo tienen
    items: RSSItem[];  // Una lista de los elementos (entradas) del feed
    pubDate?: string; // Fecha de publicación general del feed
    feedUrl?: string; // URL del feed
    generator?: string; // Generador del feed (si está disponible)
    paginationLinks?: Record<string, string>; // Enlaces de paginación, si existen
    ttl?: string; // Tiempo de vida del feed (si está disponible)
    image?: { link: string; title?: string }; // Imagen asociada al feed, si existe
  }