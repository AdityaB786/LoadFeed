import React from 'react';

interface ArticleCardProps {
  title: string;
  link: string;
  sentiment: string; // Add sentiment as a prop
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, link, sentiment }) => {
  const sentimentColor =
    sentiment === 'Positive'
      ? 'text-green-500'
      : sentiment === 'Negative'
      ? 'text-red-500'
      : 'text-yellow-500';

  return (
    <div className="border border-green-400 p-4 rounded shadow-md hover:shadow-lg transition">
      <p className={`text-sm font-bold ${sentimentColor} mb-2`}>
        Sentiment: {sentiment}
      </p>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        Read more
      </a>
    </div>
  );
};

export default ArticleCard;