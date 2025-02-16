
interface FilterBarProps {
  reloadNews: () => void;
}

const FilterBar: React.FC<FilterBarProps>= ({reloadNews}) => {
  return (
    <section className="p-4 bg-white rounded-2xl shadow-md mt-8 flex flex-wrap gap-4 items-center">
      <select className="p-2 border border-secondary rounded-lg">
        <option value="">Todas las categorías</option>
        <option value="tecnologia">Tecnología</option>
        <option value="noticias">Noticias</option>
        <option value="deportes">Deportes</option>
      </select>
      <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary">
        Ordenar por Fecha
      </button>
      <button
        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary"
        onClick={reloadNews}
      >
        Recargar Noticias
      </button>
      <input
        type="text"
        placeholder="Buscar noticias..."
        className="p-2 border border-secondary rounded-lg"
      />
    </section>
  )
}

export default FilterBar