
import React from 'react';

const StatisticsPage = ({ shortened }) => {
  return (
    <div>
      <h2>Shortened URL Statistics</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Original URL</th>
            <th>Shortened URL</th>
            <th>Shortcode</th>
            <th>Expiry Time</th>
          </tr>
        </thead>
        <tbody>
          {shortened.map((r, idx) => (
            <tr key={idx}>
              <td>{r.original}</td>
              <td>https://afford.ly/{r.shortcode}</td>
              <td>{r.shortcode}</td>
              <td>{r.expires}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatisticsPage;