import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="logo-container">
        <img src="path/to/logo.png" alt="MoLaMaZo Assets" className="logo" />
      </div>
      <div className="social-links">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
          <img src="path/to/twitter-icon.png" alt="Twitter" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
          <img src="path/to/instagram-icon.png" alt="Instagram" />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon">
          <img src="path/to/youtube-icon.png" alt="YouTube" />
        </a>
      </div>
      <div className="footer-text">
        <p>© 2025 MoLaMaZoGAMES - Todos los derechos reservados</p>
        <div>
          <Link to="/politicas" className="policy-link">Ver Política de privacidad</Link> - 
          <Link to="/politicas" className="policy-link"> Ver Política de accesibilidad</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
