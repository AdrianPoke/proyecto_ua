import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/busquedaAvanzada.css";

function BusquedaAvanzada() {
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("");
  const [formato, setFormato] = useState("");
  const [orden, setOrden] = useState("recientes");
  const [assetsDB, setAssetsDB] = useState([]);
  const [formatosDisponibles, setFormatosDisponibles] = useState([]);

  const navigate = useNavigate();

  const dropboxToRaw = (url) => {
    return url?.replace("dl=0", "raw=1");
  };

  // Obtener assets según filtros
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const params = new URLSearchParams();

        if (busqueda) params.append("titulo", busqueda);
        if (categoria) params.append("categoria", categoria);
        if (formato) params.append("formatos", formato);
        if (orden === "populares") params.append("orden", "populares");

        const res = await axios.get(`http://localhost:5000/api/asset/buscar?${params.toString()}`, {
          headers: {
            Authorization: 'Bearer TU_TOKEN_AQUI' // Reemplaza con tu token real
          }
        });

        setAssetsDB(res.data);
      } catch (err) {
        console.error("Error al buscar assets:", err);
      }
    };

    fetchAssets();
  }, [busqueda, categoria, formato, orden]);

  // Obtener formatos cuando cambia la categoría
  useEffect(() => {
    const fetchFormatos = async () => {
      if (!categoria) {
        setFormatosDisponibles([]);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/api/categoria/${categoria}/formatos`);
        setFormatosDisponibles(res.data.formatos_permitidos || []);
      } catch (err) {
        console.error("Error al obtener formatos:", err);
        setFormatosDisponibles([]);
      }
    };

    fetchFormatos();
  }, [categoria]);

  const handleVerAsset = (id) => {
    navigate(`/asset/${id}`);
  };

  return (
    <div className="busqueda-container">
      <h2 className="busqueda-titulo">Búsqueda Avanzada</h2>

      <div className="busqueda-barra">
        <input
          type="text"
          placeholder="Escribe para buscar..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="filtros">
        <div className="filtro">
          <label>Categoría</label>
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="">Seleccione</option>
            <option value="Modelos 3D">Modelos 3D</option>
            <option value="Gráficos 2D">Gráficos 2D</option>
            <option value="Audio">Audio</option>
            <option value="IA">IA</option>
            <option value="Efectos 3D">Efectos 3D</option>
            <option value="Materiales">Materiales</option>
            <option value="Scripts">Scripts</option>
            <option value="Paquetes">Paquetes</option>
          </select>
        </div>

        <div className="filtro">
          <label>Formato</label>
          <select value={formato} onChange={(e) => setFormato(e.target.value)}>
            <option value="">Seleccione</option>
            {formatosDisponibles.length > 0 ? (
              formatosDisponibles.map((f, index) => (
                <option key={index} value={f}>{f}</option>
              ))
            ) : (
              <option disabled>No hay formatos disponibles</option>
            )}
          </select>
        </div>

        <div className="filtro ordenar">
          <label>Ordenar por:</label>
          <div>
            <label>
              <input
                type="radio"
                checked={orden === "recientes"}
                onChange={() => setOrden("recientes")}
              />
              Recientes
            </label>
            <label>
              <input
                type="radio"
                checked={orden === "populares"}
                onChange={() => setOrden("populares")}
              />
              Lo más descargado
            </label>
          </div>
        </div>
      </div>

      <h3 className="resultados-titulo">Resultados ({assetsDB.length})</h3>
      <div className="resultados-grid">
        {assetsDB.map((asset) => (
          <div
            className="resultado-card"
            key={asset._id}
            onClick={() => handleVerAsset(asset._id)}
          >
            <div className="resultado-imagen">
              <img
                src={dropboxToRaw(asset.imagenPrincipal) || "/assets/default.jpg"}
                alt={asset.titulo}
              />
            </div>
            <p className="resultado-titulo">{asset.titulo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BusquedaAvanzada;
