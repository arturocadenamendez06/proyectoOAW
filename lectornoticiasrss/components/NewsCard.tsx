interface NewsCardProps {
  owner: string;
  title: string;
  description: string;
  date: string;
  category: string;
  url: string;
  author: string;
  contentSnippet: string;
}

const NewsCard = ({
  title,
  description,
  date,
  category,
  url,
  owner,
  author,
  contentSnippet,
}: NewsCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 hover:text-primary transition-colors duration-200 mb-2">
          {title}
        </h3>
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-sm text-gray-500">Fuente: {owner}</span>
          <span className="text-gray-300">•</span>
          <span className="text-sm text-gray-500">{date}</span>
        </div>
        <p className="text-gray-700 leading-relaxed mb-4">{description}</p>
        <div>
          <h4 className="text-md font-semibold text-gray-700">Resumen:</h4>
          <p className="text-gray-600">
            {contentSnippet.length > 200
              ? contentSnippet.slice(0, 200) + "..."
              : contentSnippet}
          </p>
        </div>
      </div>
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between items-center">
        <span className="text-sm text-gray-500">Autor: {author ? author : "Anónimo"}</span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary-dark transition-colors duration-200 font-semibold"
        >
          Leer más
        </a>
      </div>
    </div>
  );
};

export default NewsCard;