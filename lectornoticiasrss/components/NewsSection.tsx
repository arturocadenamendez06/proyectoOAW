'use client';
import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import NewsCard from "./NewsCard";
import { FeedData } from "@/src/types/FeedItem";

interface NewsSectionProps {
  reloadNews: boolean;
}

const NewsSection: React.FC<NewsSectionProps> = ({ reloadNews }) => {
  const searchParams = useSearchParams();
  const [feedData, setFeedData] = useState<FeedData[]>([]);

  const fetchNews = useCallback(async () => {
    try {
      const category = searchParams.get("category") || "";
      const orderBy = searchParams.get("orderBy") || "desc";
      const search = searchParams.get("search") || "";

      const res = await fetch(
        `/api/news?category=${category}&orderBy=${orderBy}&search=${search}`
      );
      const data = await res.json();
      setFeedData(data);
    } catch (error) {
      console.error("Error al obtener las noticias:", error);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchNews();
  }, [reloadNews, searchParams, fetchNews]);

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold text-primary mb-4">Últimas Noticias</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedData?.map((source, index) => (
          source.items.map((item, indexitem) => (
            <NewsCard
              owner={source.owner.title || ""}
              author={item.creator || ""}
              key={index + indexitem}
              title={item.title || ""}
              description={item.description || ""}
              date={item.pubDate || ""}
              category=""
              contentSnippet={item.contentSnippet || ""}
              url={item.link || ""}
            />
          ))
        ))}
      </div>
    </section>
  );
};

export default NewsSection;