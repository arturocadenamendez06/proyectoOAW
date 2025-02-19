import db from './db';
import { RSSFeedBase, RSSItem } from '@/src/types/FeedItem';

class NewsService {
  static async getAllNews({
    category,
    orderBy,
    search,
  }: {
    category?: string;
    orderBy?: 'asc' | 'desc';
    search?: string;
  }): Promise<{ owner: Omit<RSSFeedBase, 'items'>; items: RSSItem[] }[]> {
    try {
      // Obtener todas las fuentes
      let sourceQuery = `SELECT * FROM sources`;
      const sourceParams: any[] = [];

      // Filtrar por category en el título de la fuente
      if (category) {
        sourceQuery += ` WHERE title ILIKE $1`;
        sourceParams.push(`%${category}%`);
      }

      const sourceResult = await db.query(sourceQuery, sourceParams);
      const sources = sourceResult.rows;

      if (sources.length === 0) {
        return []; // Si no hay fuentes, retornamos un array vacío
      }

      const results: { owner: Omit<RSSFeedBase, 'items'>; items: RSSItem[] }[] = [];

      // Iterar sobre cada fuente para obtener sus noticias
      for (const source of sources) {
        let newsQuery = `
          SELECT news.*
          FROM news
          WHERE news.source_id = $1
        `;
        const newsParams: any[] = [source.id];

        // Aplicar filtros dinámicos
        if (search) {
          newsQuery += ` AND news.title ILIKE $${newsParams.length + 1}`;
          newsParams.push(`%${search}%`);
        }

        if (orderBy) {
          newsQuery += ` ORDER BY news.pubDate ${orderBy === 'desc' ? 'DESC' : 'ASC'}`;
        }

        const newsResult = await db.query(newsQuery, newsParams);

        // Formatear las noticias
        const formattedItems: RSSItem[] = newsResult.rows.map((row) => ({
          creator: row.creator || '',
          title: row.title || '',
          link: row.link || '',
          description: row.description || '',
          pubDate: row.pubdate ? new Date(row.pubdate).toISOString() : undefined,
          contentSnippet: row.contentsnippet || '',
          summary: row.description || '',
        }));

        // Formatear la información de la fuente
        const formattedOwner: Omit<RSSFeedBase, 'items'> = {
          title: source.title || '',
          link: source.link || '',
          description: source.description || '',
          language: source.language || '',
          pubDate: source.pubdate ? new Date(source.pubdate).toISOString() : undefined,
          feedUrl: source.link || '',
          generator: source.generator || '',
          image: { link: source.imageLink || '' },
        };

        results.push({ owner: formattedOwner, items: formattedItems });
      }

      return results;
    } catch (error) {
      console.error('Error en getAllNews:', error);
      throw new Error('Error al obtener las noticias');
    }
  }


  static async getAllSources(): Promise<Omit<RSSFeedBase, 'items'>[]> {
    try {
      const query = 'SELECT * FROM sources';
      const { rows } = await db.query(query);

      return rows.map((source) => ({
        title: source.title || '',
        link: source.link || '',
        description: source.description || '',
        language: source.language || '',
        pubDate: source.pubdate ? new Date(source.pubdate).toISOString() : undefined,
        feedUrl: source.link || '',
        generator: source.generator || '',
        image: { link: source.imageLink || '' },
      }));
    } catch (error) {
      console.error('Error en getAllSources:', error);
      throw new Error('Error al obtener las fuentes');
    }
  }
}

export default NewsService;
