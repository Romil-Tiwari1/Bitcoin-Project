import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/BitcoinInfo.css';
import bitcoinLogo from './images/bitcoin.png';

function BitcoinInfo() {
  const [bitcoinData, setBitcoinData] = useState({
    price: 'Loading...',
    difficulty: 'Loading...',
    height: 'Loading...'
  });
  const [difficultyChange, setDifficultyChange] = useState('Loading...');
  const [nextRetargetHeight, setNextRetargetHeight] = useState('Loading...');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/bitcoin')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Directly access the price from the response
        const roundedPrice = parseFloat(data.price).toFixed(2);
        setBitcoinData({ price: roundedPrice });
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/api/bitcoin/difficulty')
      .then(response => {
        const { difficultyChange, nextRetargetHeight } = response.data;
        setDifficultyChange(difficultyChange + 'k'); // Assuming you want to round it off
        setNextRetargetHeight(nextRetargetHeight);
      })
      .catch(error => {
        console.error('Error fetching Bitcoin difficulty:', error);
        setError(error);
      });
  }, []); // Empty dependency array to run once on mount


  return (
    <div className="bitcoin-info-container">
      <img src={bitcoinLogo} alt="Bitcoin Logo" className="bitcoin-logo" />
      <section className="bitcoin-info">
        <h1>Bitcoin BTC</h1>
        {loading ? (
          <p className="price">Loading...</p>
        ) : error ? (
          <p className="price">Error fetching data: {error.message}</p>
        ) : (
          <p className="price">${bitcoinData.price} USD</p>
        )}
        <div className="details">
          <div className="difficulty">Difficulty Change: {difficultyChange}</div>
          <div className="block-height">Block Height: {nextRetargetHeight}</div>
        </div>
      </section>
    </div>
  );
}

export default BitcoinInfo;
