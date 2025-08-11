import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Home.css';

const Home = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [allPodcasts, setAllPodcasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const listRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/podcast/all')
      .then(res => setAllPodcasts(res.data.podcasts))
      .catch(() => setError('Failed to load podcasts'));
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('http://localhost:5000/api/podcast/searchbar', { q: query });
      setResults(res.data.results);
      setTimeout(() => {
        if (listRef.current) {
          listRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err) {
      setError('Failed to fetch podcasts');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const podcastsToShow = query && results.length > 0 ? results : (!query ? allPodcasts : []);

  return (
    <div className="home-root">
      <header className="home-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1200, margin: '0 auto' }}>
          <h1 className="home-title">Podcast Search</h1>
          <button onClick={handleLogout} style={{ padding: '0.7rem 1.5rem', borderRadius: 8, background: '#e53e3e', color: '#fff', border: 'none', fontWeight: 600, fontSize: 16, cursor: 'pointer', marginLeft: 16 }}>Logout</button>
        </div>
        <form className="home-searchbar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for podcasts..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </header>
      {error && <p style={{ color: '#e53e3e', textAlign: 'center', marginTop: 20 }}>{error}</p>}
      <main ref={listRef} className="home-list">
        {podcastsToShow.length > 0 ? (
          <div className="podcast-grid">
            {podcastsToShow.map(podcast => (
              <div key={podcast._id} className="podcast-card">
                <img src={podcast.image} alt={podcast.title} className="podcast-img" />
                <div style={{ flex: 1 }}>
                  <h3 className="podcast-title">{podcast.title}</h3>
                  <p className="podcast-publisher">{podcast.publisher}</p>
                  {podcast.description && <p className="podcast-desc">{podcast.description}</p>}
                </div>
                {podcast.url && <a href={podcast.url} target="_blank" rel="noopener noreferrer" className="podcast-link">View</a>}
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: '#888' }}>No podcasts found.</p>
        )}
      </main>
    </div>
  );
};

export default Home;
