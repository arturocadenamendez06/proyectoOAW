"use server";

import Parser from "rss-parser";
import { FeedFormSchema } from "@/src/schemas";

type ActionStateType = {
  errors: string[];
  success: string;
  feedData?: string;
};

export const addFedd = async (
  state: ActionStateType,
  formData: FormData
) => {
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

    // TODO: Guardar el feed en la base de datos

    return {
      errors: [],
      success: "Feed añadido con éxito.",
      feedData: serializedJsonFeed,
    };
  } catch (error) {
    return {
      errors: ["Ocurrió un error al procesar el feed."],
      success: "",
      feedData: "",
    };
  }
};