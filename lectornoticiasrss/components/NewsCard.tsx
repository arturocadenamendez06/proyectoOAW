import React from 'react'

const NewsCard = ({ title, description, date, category, url }: {
    title: string;
    description: string;
    date: string;
    category: string;
    url: string;
  }) => {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-2">{description}</p>
      <p className="text-sm text-secondary">{date} - {category}</p>
      <a target="_blank" rel="noopener noreferrer" href={url} className="text-primary underline mt-4 inline-block">
        Leer más
      </a>
    </div>
  )
}

export default NewsCard