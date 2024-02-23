import React from 'react';
import './css/Header.css';
import './css/Button.css';

function Header() {
  return (
    <header className="header">
      <button className="active">Mainnet</button>
      <button>Testnet</button>
    </header>
  );
}

export default Header;
