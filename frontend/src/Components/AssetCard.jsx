// src/components/AssetCard.jsx
import React from "react";
import { FaDownload } from "react-icons/fa";
import "../styles/assetCard.css";

function AssetCard({ asset, onClick, mostrarDescargas = false }) {
  const dropboxToRaw = (url) => url?.replace("dl=0", "raw=1");

  return (
    <div className="asset-card" onClick={onClick}>
      <div className="asset-image-wrapper">
        <img
          src={dropboxToRaw(asset.imagenPrincipal)}
          alt={asset.titulo}
          className="asset-image"
        />
        {mostrarDescargas && (
          <div className="asset-descargas">
            <FaDownload style={{ marginRight: "4px" }} />
            {asset.numero_descargas}
          </div>
        )}
      </div>
      <div className="asset-title">{asset.titulo}</div>
      <div className="asset-formats">
        {asset.formatos_disponibles?.join(", ")}
      </div>
    </div>
  );
}

export default AssetCard;
