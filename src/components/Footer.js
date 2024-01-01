import React from 'react';
import './Footer.css'; // Path to your Footer CSS file

export default function Footer() {
  return (
    <footer className="site-footer">
      <p>&copy; {(new Date().getFullYear())} My Flash Card App. All rights reserved.</p>
    </footer>
  );
}