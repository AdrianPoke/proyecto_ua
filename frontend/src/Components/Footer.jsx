import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css"; // Importamos los estilos
import logo from "../logo.png";
import x from "../icons/x.png";
import yt from "../icons/youtube.png";
import ig from "../icons/instagram.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="logo-container">
        <img src={logo} alt="Logo" />
        <span className="brand-name">MoLaMaZo Assets</span>
      </div>

      <div className="social-links">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img src={x} alt="Logo X" className="social-icon" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src={ig} alt="Logo IG" className="social-icon" />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <img src={yt} alt="Logo YT" className="social-icon" />
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
