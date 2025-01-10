import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { fetchTrumpAndBidenTweets } from '../services/api';

interface Tweet {
  text: string;
  link: string;
  date: string;
}

const TweetsPage: React.FC = () => {
  const [trumpTweets, setTrumpTweets] = useState<Tweet[]>([]);
  const [bidenTweets, setBidenTweets] = useState<Tweet[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [view, setView] = useState<'both' | 'trump' | 'biden'>('both');
  const isFetchCalled = useRef(false); // Prevent duplicate API calls. useRef persists a value across renders without causing re-renders.

  useEffect(() => {
    if (isFetchCalled.current) return; // Avoid duplicate API calls.
    isFetchCalled.current = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const { trump, biden } = await fetchTrumpAndBidenTweets();
        setTrumpTweets(trump);
        setBidenTweets(biden);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  const renderTweets = (tweets: Tweet[]) => (
    <ul>
      {tweets.map((tweet, index) => (
        <li key={index} className="bg-white p-4 shadow-md rounded mb-2">
          <p>{tweet.text}</p>
          <a
            href={tweet.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline text-sm"
          >
            View 
          </a>
          <p className="text-gray-400 text-xs mt-1">
            Date: {new Date(tweet.date).toLocaleString()}
          </p>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Scraped Tweets</h1>
        <Link to="/" className="px-4 py-2 bg-black text-white rounded hover:bg-red-600">
          Go to News Page
        </Link>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {loading && <p className="text-blue-500">Loading tweets...</p>}

      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${view === 'both' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
          onClick={() => setView('both')}
        >
          View Both
        </button>
        <button
          className={`px-4 py-2 rounded ${view === 'trump' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
          onClick={() => setView('trump')}
        >
          View Trump Tweets
        </button>
        <button
          className={`px-4 py-2 rounded ${view === 'biden' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
          onClick={() => setView('biden')}
        >
          View Biden Tweets
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(view === 'both' || view === 'trump') && (
          <div>
            <h2 className="text-xl font-bold mb-4">Trump Tweets</h2>
            {renderTweets(trumpTweets)}
          </div>
        )}
        {(view === 'both' || view === 'biden') && (
          <div>
            <h2 className="text-xl font-bold mb-4">Biden Tweets</h2>
            {renderTweets(bidenTweets)}
          </div>
        )}
      </div>
    </div>
  );
};

export default TweetsPage;