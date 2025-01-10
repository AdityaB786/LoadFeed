import React , { useEffect, useState, useRef } from 'react';
import ArticleList from '../components/ArticleList';
import { fetchTrumpAndBidenArticles } from '../services/api';
import { Link } from 'react-router-dom';

interface Article {
  title: string;
  link: string;
}

const NewsPage: React.FC = () => {
  const [trumpArticles, setTrumpArticles] = useState<Article[]>([]);
  const [bidenArticles, setBidenArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [view, setView] = useState<'both' | 'trump' | 'biden'>('both');
  const isFetchCalled = useRef(false); // Prevent duplicate API calls. useRef persists a value across renders without causing re-renders.

  useEffect(() => {
    if (isFetchCalled.current) return; // Avoid duplicate API calls
    isFetchCalled.current = true;

    const fetchData = async () => {
      try {
        setLoading(true); // Set loading state
        const { trump, biden } = await fetchTrumpAndBidenArticles();
        setTrumpArticles(trump);
        setBidenArticles(biden);
        setLoading(false); // Reset loading state
      } catch (err: any) {
        setError(err.message); // Set error message
        setLoading(false); // Ensure loading state is reset
      }
    };

    fetchData();
  }, []); 

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      {/* Header with Title and Navigation Link */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Scraped CNN News</h1>
        <Link
          to="/tweets"
          className="px-4 py-2 bg-black text-white rounded hover:bg-red-600"
        >
          Go to Tweets Page
        </Link>
      </div>

      {/* Error and Loading States */}
      {error && <p className="text-red-500">{error}</p>}
      {loading && <p className="text-blue-500">Loading articles...</p>}

      {/* Toggle Buttons */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${view === 'both' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => setView('both')}
        >
          View Both
        </button>
        <button
          className={`px-4 py-2 rounded ${view === 'trump' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => setView('trump')}
        >
          View Trump News
        </button>
        <button
          className={`px-4 py-2 rounded ${view === 'biden' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => setView('biden')}
        >
          View Biden News
        </button>
      </div>

      {/* Display Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(view === 'both' || view === 'trump') && (
          <div>
            <h2 className="text-xl font-bold mb-4">Trump News</h2>
            <ArticleList articles={trumpArticles} />
          </div>
        )}
        {(view === 'both' || view === 'biden') && (
          <div>
            <h2 className="text-xl font-bold mb-4">Biden News</h2>
            <ArticleList articles={bidenArticles} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;