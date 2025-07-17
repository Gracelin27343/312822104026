
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ShortenerPage from './Components/ShortenerPage';
import StatisticsPage from './Components/StatisticsPage';

function App() {
  const [shortenedUrls, setShortenedUrls] = useState([]);

  const handleShorten = (urlData) => {
    setShortenedUrls((prev) => [...prev, urlData]);
  };

  return (
    <Router>
      <nav>
        <Link to="/">Shortener</Link> | <Link to="/stats">Statistics</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ShortenerPage onShorten={handleShorten} />} />
        <Route path="/stats" element={<StatisticsPage shortened={shortenedUrls} />} />
      </Routes>
    </Router>
  );
}

export default App;


