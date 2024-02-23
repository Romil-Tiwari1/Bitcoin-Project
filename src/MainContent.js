// MainContent.js

import React from 'react';
import Header from './Header';
import BitcoinInfo from './BitcoinInfo';
import Fees from './Fees';
import BarGraph from './BarGraph';
import MarketData from './MarketData';
import './css/MainContent.css';
function MainContent() {
  return (
    <div className="main-content">
      <Header />
      <div className="info-content">
        <BitcoinInfo />
        <BarGraph />
        <div className="vertical-separator"></div>
        <Fees />
      </div>
      <hr className="section-separator" />
      <MarketData />
    </div>
  );
}

export default MainContent;
