import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import AssetCard from "../Components/AssetCard";
import "../styles/busquedaAvanzada.css";

function BusquedaAvanzada() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const valorInicialBusqueda = queryParams.get("q") || "";

  const [busqueda, setBusqueda] = useState(valorInicialBusqueda);
  const [categoria, setCategoria] = useState("");
  const [formato, setFormato] = useState("");
  const [orden, setOrden] = useState("recientes");
  const [etiquetasDisponibles, setEtiquetasDisponibles] = useState([]);
  const [etiquetasSeleccionadas, setEtiquetasSeleccionadas] = useState([]);
  const [assetsDB, setAssetsDB] = useState([]);
  const [formatosDisponibles, setFormatosDisponibles] = useState([]);

  const dropboxToRaw = (url) => url?.replace("dl=0", "raw=1");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/asset/etiquetas`)
      .then(res => setEtiquetasDisponibles(res.data))
      .catch(err => console.error("Error al obtener etiquetas:", err));
  }, []);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const params = new URLSearchParams();
        if (busqueda) params.append("titulo", busqueda);
        if (categoria) params.append("categoria", categoria);
        if (formato) params.append("formatos", formato);
        if (orden === "populares") params.append("orden", "populares");
        etiquetasSeleccionadas.forEach(etiqueta => params.append("etiquetas", etiqueta));

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/asset/buscar?${params.toString()}`, {
          headers: { Authorization: 'Bearer TU_TOKEN_AQUI' }
        });

        setAssetsDB(res.data);
      } catch (err) {
        console.error("Error al buscar assets:", err);
      }
    };
    fetchAssets();
  }, [busqueda, categoria, formato, orden, etiquetasSeleccionadas]);

  useEffect(() => {
    if (!categoria) return setFormatosDisponibles([]);
    axios.get(`${process.env.REACT_APP_API_URL}/api/categoria/${categoria}/formatos`)
      .then(res => setFormatosDisponibles(res.data.formatos_permitidos || []))
      .catch(() => setFormatosDisponibles([]));
  }, [categoria]);

  useEffect(() => {
    const nuevaBusqueda = new URLSearchParams(location.search).get("q") || "";
    setBusqueda(nuevaBusqueda);
  }, [location.search]);

  const handleVerAsset = (id) => navigate(`/asset/${id}`);

  const limpiarFiltros = () => {
    setBusqueda("");
    setCategoria("");
    setFormato("");
    setOrden("recientes");
    setEtiquetasSeleccionadas([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
            {["Modelos 3D", "Gráficos 2D", "Audio", "IA", "Efectos 3D", "Materiales", "Scripts", "Paquetes"]
              .map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
          </select>
        </div>

        <div className="filtro">
          <label>Formato</label>
          <select value={formato} onChange={(e) => setFormato(e.target.value)}>
            <option value="">Seleccione</option>
            {formatosDisponibles.map((f, i) => (
              <option key={i} value={f}>{f}</option>
            ))}
          </select>
        </div>

        <div className="filtro">
          <label>Etiquetas</label>
          <Select
            options={etiquetasDisponibles.map(et => ({ value: et, label: et }))}
            isMulti
            value={etiquetasSeleccionadas.map(et => ({ value: et, label: et }))}
            onChange={(selectedOptions) =>
              setEtiquetasSeleccionadas(selectedOptions.map(opt => opt.value))
            }
            placeholder="Selecciona etiquetas..."
            className="react-select-container"
            classNamePrefix="react-select"
          />
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

      <button className="limpiar-filtros" onClick={limpiarFiltros}>
        Limpiar filtros
      </button>

      <h3 className="resultados-titulo">Resultados ({assetsDB.length})</h3>
      <div className="assets-grid">
        {assetsDB.map((asset) => (
          <AssetCard key={asset._id} asset={asset} onClick={() => handleVerAsset(asset._id)} />
        ))}
      </div>
    </div>
  );
}

export default BusquedaAvanzada;