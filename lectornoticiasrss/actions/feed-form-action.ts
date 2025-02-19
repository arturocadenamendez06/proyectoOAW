"use server";

import Parser from "rss-parser";
import { FeedFormSchema } from "@/src/schemas";
import db from "@/src/lib/db";

type ActionStateType = {
  errors: string[];
  success: string;
  feedData?: string;
};

export const addFedd = async (state: ActionStateType, formData: FormData) => {
  const feedData = {
    url: formData.get("url"),
  };

  // Validar URL
  const feed = FeedFormSchema.safeParse(feedData);
  if (!feed.success) {
    const errors = feed.error.errors.map((error) => error.message);
    return {
      feedData: "",
      errors,
      success: "",
    };
  }

  const parser = new Parser();

  try {
    const response = await fetch(feed.data.url);
    if (!response.ok) {
      return {
        errors: ["No se pudo acceder al feed. Verifica la URL."],
        success: "",
        feedData: "",
      };
    }

    const xmlText = await response.text();

    // rss-parser para parsear el XML
    const jsonFeed = await parser.parseString(xmlText);

    // Validación de la estructura
    if (!jsonFeed.items || !Array.isArray(jsonFeed.items)) {
      return {
        errors: ["El feed no tiene una estructura válida de RSS."],
        success: "",
        feedData: "",
      };
    }

    // Serializar el objeto jsonFeed a una cadena JSON
    const serializedJsonFeed = JSON.stringify(jsonFeed);

    //*Guardar el feed en la base de datos
    const sourceResult = await db.query(
      `INSERT INTO sources (title, link, description, language, pubdate, generator)
          VALUES ($1, $2, $3, $4, $5, $6)
          ON CONFLICT (link) DO NOTHING RETURNING id`,
      [
        jsonFeed.title,
        feed.data.url,
        jsonFeed.description,
        jsonFeed.language || null,
        jsonFeed.pubDate ? new Date(jsonFeed.pubDate) : null,
        jsonFeed.generator || null,
      ]
    );

    const sourceId = sourceResult.rows[0]?.id;

    // Insertar las noticias asociadas a la fuente
    for (const item of jsonFeed.items) {
      await db.query(
        `INSERT INTO news (source_id, creator, title, link, description, pubdate, contentsnippet)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (link) DO NOTHING`,
        [
          sourceId,
          item.creator || null,
          item.title,
          item.link,
          item.description || null,
          item.pubDate ? new Date(item.pubDate) : null,
          item.contentSnippet || null,
        ]
      );
    }

    return {
      errors: [],
      success: "Feed añadido con éxito.",
      feedData: serializedJsonFeed,
    };
  } catch (error) {
    console.log(error)
    return {
      errors: ["Ocurrió un error al procesar el feed."],
      success: "",
      feedData: "",
    };
  }
};
