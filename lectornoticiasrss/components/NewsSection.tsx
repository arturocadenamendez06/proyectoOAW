"use client"
import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import { RSSFeedBase } from "@/src/types/FeedItem";

interface NewsSectionProps {
  reloadNews: boolean;
}

const NewsSection: React.FC<NewsSectionProps> = ({ reloadNews }) => {
  const [feedData, setFeedData] = useState<RSSFeedBase | null>(null);

  useEffect(() => {
    const storedFeedData = localStorage.getItem('feedData');
    if (storedFeedData) {
      setFeedData(JSON.parse(storedFeedData));
    }
  }, [reloadNews]);

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold text-primary mb-4">Últimas Noticias</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedData?.items?.map((item, index) => (
          <NewsCard
            key={index}
            title={item.title}
            description={item.description || ""}
            date={item.pubDate || ""}
            category=""
            url={item.link}
          />
        ))}
      </div>
    </section>
  );
};

export default NewsSection