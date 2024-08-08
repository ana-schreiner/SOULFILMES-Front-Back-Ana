import React from 'react';
import { Link } from 'react-router-dom';
import imagem from '../assets/logo.png';

function Footer() {
  return (
    <footer className="footer w-100 px-3 py-2">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/">
          <img
            src={imagem}
            width="70"
            height="70"
            className="d-flex align-top logo footer-logo"
            alt="Logo"
          />
        </Link>
        <nav className="footer-brand mx-auto text-center text-white">&copy; 2024 - 2025 Todos os direitos reservados</nav>
      </div>
    </footer>
  );
}

export default Footer;



