import { useState } from 'react';
import './App.css';

const generateCode = () => Math.random().toString(36).slice(2, 8);

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [customId, setCustomId] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [urlMap, setUrlMap] = useState({});
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);

  const handleShorten = () => {
    setError('');
    if (!longUrl) return setError('Please enter a URL.');

    let code = customId.trim() || generateCode();
    while (!customId && urlMap[code]) code = generateCode();

    if (customId && urlMap[code])
      return setError('Custom ID already exists. Try another.');

    const short = `${window.location.origin}/s/${code}`;
    setUrlMap(prev => ({ ...prev, [code]: longUrl }));
    setShortUrl(short);
    setHistory(prev => [{ code, longUrl }, ...prev.slice(0, 4)]);
  };

  const renderHistory = () => (
    <ul className="history-list">
      {history.map(({ code, longUrl }) => (
        <li key={code}>
          <strong>Short:</strong> <a href={`/s/${code}`} target="_blank">{window.location.origin}/s/{code}</a><br />
          <strong>Original:</strong> <a href={longUrl} target="_blank">{longUrl}</a>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="App">
      <div className="url-shortener-container">
        <h1>URL Shortener</h1>

        <input
          className="url-input"
          type="text"
          placeholder="Paste your long URL"
          value={longUrl}
          onChange={e => setLongUrl(e.target.value)}
        />

        <input
          className="url-input"
          type="text"
          placeholder="Custom ID (optional)"
          value={customId}
          onChange={e => setCustomId(e.target.value)}
        />

        <button onClick={handleShorten} className="shorten-btn">Shorten URL</button>

        {error && <div className="error-message">{error}</div>}

        {!shortUrl && !error && (
          <p className="before-shortening">
            Enter a long URL and (optionally) a custom ID, then click <strong>Shorten URL</strong>.
          </p>
        )}

        {shortUrl && !error && (
          <div className="after-shortening">
            <strong>Shortened URL:</strong>
            <div><a href={longUrl} target="_blank">{shortUrl}</a></div>
            <div><strong>Original URL:</strong> <a href={longUrl} target="_blank">{longUrl}</a></div>
          </div>
        )}

         {history.length > 0 && (
          <div className="history-section">
            <h3>Recent URLs</h3>
            {renderHistory()}
          </div>
        )}


        

        <p className="info-text">
          Simple tool to shorten long URLs. You can even set a custom ID!
        </p>
      </div>
    </div>
  );
}

export default App;
