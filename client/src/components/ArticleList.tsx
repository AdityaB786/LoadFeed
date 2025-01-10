import React from 'react';
import Sentiment from 'sentiment'; // Import sentiment library
import ArticleCard from './ArticleCard';

interface Article {
  title: string;
  link: string;
}

interface ArticleListProps {
  articles: Article[];
}

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  //sentiment library does analysis and predicts whether the text/news is positive,neutral or negative.
  const sentiment = new Sentiment();

  const getSentiment = (title: string) => {
    const result = sentiment.analyze(title);
    if (result.score > 0) return 'Positive';
    if (result.score < 0) return 'Negative';
    return 'Neutral';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, index) => (
        <ArticleCard
          key={index}
          title={article.title}
          link={article.link}
          sentiment={getSentiment(article.title)} // Pass sentiment to ArticleCard
        />
      ))}
    </div>
  );
};

export default ArticleList;