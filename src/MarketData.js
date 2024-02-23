import React, { useEffect, useState } from 'react';
import './css/MarketData.css';

function MarketData() {
  const [marketData, setMarketData] = useState({
    marketCap: 'Loading...',
    supply: 'Loading...',
    maxSupply: 'Loading...',
    change1h: 'Loading...',
    change1d: 'Loading...',
    change1w: 'Loading...',
  });

  useEffect(() => {
    fetch('http://localhost:3000/api/market-data') // Adjusted endpoint
      .then(response => response.json())
      .then(data => {
        setMarketData({
          marketCap: parseFloat(data.marketCap).toFixed(2) + ' USD',
          supply: parseFloat(data.supply).toFixed(2),
          maxSupply: parseFloat(data.maxSupply).toFixed(2),
          change1h: parseFloat(data.change1h).toFixed(2) + '%',
          change1d: parseFloat(data.change1d).toFixed(2) + '%',
          change1w: parseFloat(data.change1w).toFixed(2) + '%',
        });
      })
      .catch(error => console.error('Error fetching market data:', error));
  }, []);

  return (
    <div className="market-data-container">
      <div className="market-data-header">
        <h2 className="market-data-title">MARKET DATA</h2>
        {/* Consider implementing functionality for this button */}
        <button className="more-market-data-button">More Market Data</button>
      </div>
      <div className="market-data">
        <div className="market-data-section">
          <label>Market Cap</label>
          <p>{marketData.marketCap}</p>
        </div>
        <div className="market-data-section">
          <label>Supply</label>
          <p>{marketData.supply}</p>
        </div>
        <div className="market-data-section">
          <label>Max Supply</label>
          <p>{marketData.maxSupply}</p>
        </div>
        <div className="market-data-section">
          <label>Change (1h)</label>
          <p>{marketData.change1h}</p>
        </div>
        <div className="market-data-section">
          <label>Change (1 day)</label>
          <p>{marketData.change1d}</p>
        </div>
        <div className="market-data-section">
          <label>Change (1 week)</label>
          <p>{marketData.change1w}</p>
        </div>
      </div>
    </div>
  );
}

export default MarketData;
