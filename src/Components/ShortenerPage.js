import React, { useState } from 'react';
import { isValidURL, isPositiveInteger } from '../utils/Validator';

const ShortenerPage = ({ onShorten }) => {
  const [inputs, setInputs] = useState(
    Array.from({ length: 5 }, () => ({ url: '', validity: '', shortcode: '' }))
  );
  const [results, setResults] = useState([]);
  const [errors, setErrors] = useState([]);

  const handleChange = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  const handleSubmit = () => {
    const newResults = [];
    const newErrors = [];

    inputs.forEach(({ url, validity, shortcode }, idx) => {
      if (!url.trim()) return;

      const error = [];
      if (!isValidURL(url)) error.push('Invalid URL');
      if (validity && !isPositiveInteger(validity)) error.push('Invalid validity');
      if (shortcode && !/^[a-zA-Z0-9]+$/.test(shortcode)) error.push('Invalid shortcode');

      if (error.length > 0) {
        newErrors[idx] = error.join(', ');
      } else {
        const now = new Date();
        const expires = validity
          ? new Date(now.getTime() + validity * 60000)
          : new Date(now.getTime() + 24 * 60 * 60000); 

        const shortened = {
          original: url,
          shortcode: shortcode || Math.random().toString(36).substring(2, 8),
          expires: expires.toISOString(),
        };

        newResults.push(shortened);
        onShorten(shortened);
      }
    });

    setErrors(newErrors);
    setResults(newResults);
  };

  return (
    <div>
      <h2>URL Shortener Page</h2>
      {inputs.map((input, idx) => (
        <div key={idx} style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Original URL"
            value={input.url}
            onChange={(e) => handleChange(idx, 'url', e.target.value)}
          />
          <input
            type="number"
            placeholder="Validity (min)"
            value={input.validity}
            onChange={(e) => handleChange(idx, 'validity', e.target.value)}
          />
          <input
            type="text"
            placeholder="Preferred shortcode"
            value={input.shortcode}
            onChange={(e) => handleChange(idx, 'shortcode', e.target.value)}
          />
          {errors[idx] && <div style={{ color: 'red' }}>{errors[idx]}</div>}
        </div>
      ))}
      <button onClick={handleSubmit}>Shorten URLs</button>

      <h3>Results:</h3>
      <ul>
        {results.map((r, idx) => (
          <li key={idx}>
            Original: {r.original} <br />
            Shortened: https://afford.ly/{r.shortcode} <br />
            Expires At: {r.expires}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShortenerPage;