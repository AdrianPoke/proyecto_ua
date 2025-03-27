import React from 'react';
import '../styles/home.css';

const assets = [
  { id: 1, title: "Assassin's Creed Pack", image: "/assets/warrior.webp" },
  { id: 2, title: "Pacman Sprite 1", image: "/assets/pac1.jpg" },
  { id: 3, title: "Pacman Sprite 2", image: "/assets/pac2.webp" },
  { id: 4, title: "Pacman Sprite 3", image: "/assets/pac3.webp" },
  { id: 5, title: "Pacman Sprite 4", image: "/assets/pac4.webp" },
  { id: 6, title: "Pacman Sprite 5", image: "/assets/pac5.png" },
  { id: 7, title: "Pacman Sprite 6", image: "/assets/pac6.png" },
  { id: 8, title: "Pacman Sprite 7", image: "/assets/pac7.webp" },
  { id: 9, title: "Screen Shot 1", image: "/assets/scr.jpg" },
  { id: 10, title: "Screen Shot 2", image: "/assets/scr1.jpg" },
  { id: 11, title: "Screen Shot 3", image: "/assets/scr2.png" },
  { id: 12, title: "Screen Shot 4", image: "/assets/SCR3.jpg" },
  { id: 13, title: "Screen Shot 5", image: "/assets/scr4.png" },
  { id: 14, title: "Titulación Pacman", image: "/assets/titpac.jpg" },
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
