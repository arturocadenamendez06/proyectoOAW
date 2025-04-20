'use client';
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface FilterBarProps {
  reloadNews: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ reloadNews }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [orderBy, setOrderBy] = useState(searchParams.get("orderBy") || "desc");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [sources, setSources] = useState<{ title: string; link: string }[]>([]);
  

  // Actualiza los parámetros en la URL
  const updateFilters = () => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (orderBy) params.set("orderBy", orderBy);
    if (search) params.set("search", search);
    
    router.push(`/?${params.toString()}`);
    reloadNews();
  };

  useEffect(() => {
    const fetchSources = async () => {
      try {
        const res = await fetch('/api/sources');
        const data = await res.json();
        setSources(data);
      } catch (error) {
        console.error("Error al obtener las fuentes:", error);
      }
    };

    fetchSources();
  }, []);

  return (
    <section className="p-4 bg-white rounded-2xl shadow-md mt-8 flex flex-wrap gap-4 items-center">
      {/* Source */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 border border-secondary rounded-lg"
      >
        <option value="">Todas las Fuentes</option>
        {sources.map((source) => (
          <option key={source.link} value={source.title}>
            {source.title}
          </option>
        ))}
      </select>

      {/* Orden */}
      <button
        onClick={() => {
          setOrderBy(orderBy === "desc" ? "asc" : "desc");
          updateFilters();
        }}
        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary"
      >
        Ordenar por {orderBy === "desc" ? "Ascendente" : "Descendente"}
      </button>

      {/* Recargar Noticias */}
      <button
        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary"
        onClick={reloadNews}
      >
        Recargar Noticias
      </button>

      {/* Búsqueda */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar noticias..."
        className="p-2 border border-secondary rounded-lg"
      />
      <button
        onClick={updateFilters}
        className="px-4 py-2 bg-primary text-white rounded-lg"
      >
        Buscar
      </button>
    </section>
  );
};

export default FilterBar;
