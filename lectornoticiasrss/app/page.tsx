"use client"
import FeedForm from "@/components/FeedForm";
import FilterBar from "@/components/FilterBar";
import Header from "@/components/header";
import NewsSection from "@/components/NewsSection";
import { useState } from "react";


const Home = () => {
  const [reloadNews, setReloadNews] = useState(false);
  const handleReloadNews = () => {
    setReloadNews(prev => !prev);
  };

  return (
    <>
      <Header />
      <main>
        <FeedForm />
        <FilterBar reloadNews={handleReloadNews}/>
        <NewsSection reloadNews={reloadNews}/>
      </main>
    </>
  );
}


export default Home;