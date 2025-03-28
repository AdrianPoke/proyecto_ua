import React from 'react';
import '../styles/home.css';

const assets = [
  { id: 1, title: "Cyborg Model 3D", image: "/assets/warrior.webp" },
  { id: 2, title: "Tileset Taberna 3D", image: "/assets/pac1.jpg" },
  { id: 3, title: "Tavern Assets", image: "/assets/pac2.webp" },
  { id: 4, title: "Fantasy Pack", image: "/assets/pac3.webp" },
  { id: 5, title: "Retro Arcade Pack", image: "/assets/pac4.webp" },
  { id: 6, title: "Pack of Monsters", image: "/assets/pac5.png" },
  { id: 7, title: "Space Invaders Pack", image: "/assets/pac6.png" },
  { id: 8, title: "Zombie Cenital Tileset", image: "/assets/pac7.webp" },
  { id: 9, title: "JavaScripts", image: "/assets/scr.jpg" },
  { id: 10, title: "Movimiento de Salto 2D", image: "/assets/scr1.jpg" },
  { id: 11, title: "Text Script Example", image: "/assets/scr2.png" },
  { id: 12, title: "Message Script", image: "/assets/SCR3.jpg" },
  { id: 13, title: "Movement TOP-DOWN", image: "/assets/scr4.png" },
  { id: 14, title: "Factory Package", image: "/assets/titpac.jpg" },
];

function Home() {
  return (
    <div className="home-container">
      <h2 className="home-title">Página Principal</h2>

      {/* Primera sección: Recientes */}
      <div className="section-title">
        <span className="clock-icon">🕒</span> Assets Recientes
      </div>
      <div className="assets-grid">
        {assets.map((asset) => (
          <div key={asset.id} className="asset-card">
            <img src={asset.image} alt={asset.title} className="asset-image" />
            <div className="asset-title">{asset.title}</div>
          </div>
        ))}
      </div>

      {/* Segunda sección: Más descargados */}
      <div className="section-title" style={{ marginTop: '40px' }}>
        Assets más descargados <span style={{ fontSize: '18px' }}>⬇️</span>
      </div>
      <div className="assets-grid">
        {assets.map((asset, index) => (
          <div key={`top-${asset.id}`} className="asset-card">
            <img src={asset.image} alt={asset.title} className="asset-image" />
            <div className="asset-title">{asset.title}</div>
            <div className="asset-subtext">{`${(8 - index % 7).toFixed(1)}k descargas`}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
