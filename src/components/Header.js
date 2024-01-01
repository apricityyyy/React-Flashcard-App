import React from 'react';
import { Link } from 'react-router-dom'; 
import './Header.css'; 

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-content">
        <h1>Flash Card App</h1>
        <nav className="main-nav">
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/cards">Flash Cards</Link></li>
            <li><Link to="/contact">Contact Me</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}