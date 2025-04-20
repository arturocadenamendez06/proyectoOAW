'use client';

import FeedForm from "@/components/FeedForm";
import FilterBar from "@/components/FilterBar";
import Header from "@/components/header";
import NewsSection from "@/components/NewsSection";
import { useState, Suspense } from "react";

export default function Home() {
  const [reloadNews, setReloadNews] = useState(false);
  const handleReloadNews = () => {
    setReloadNews((prev) => !prev);
  };

  return (
    <>
      <Header />
      <main className="p-4">
        <FeedForm />
        <Suspense fallback={<div>Cargando filtros...</div>}>
          <FilterBar reloadNews={handleReloadNews} />
        </Suspense>
        <Suspense fallback={<div>Cargando noticias...</div>}>
          <NewsSection reloadNews={reloadNews} />
        </Suspense>
      </main>
    </>
  );
}
