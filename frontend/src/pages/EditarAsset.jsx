import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/editarAsset.css';
import { FaEdit } from 'react-icons/fa';
import { unzipSync } from "fflate";

const EditarAsset = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    categoria: '',
    etiquetas: '',
    es_sensible: false,
  });

  const [imagenPrincipal, setImagenPrincipal] = useState(null);
  const [imagenesPrevias, setImagenesPrevias] = useState([]);
  const [archivosAsset, setArchivosAsset] = useState([]);
  const [archivosActuales, setArchivosActuales] = useState([]);

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const res = await axios.get(`http://localhost:5000/api/asset/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const asset = res.data;

        setFormData({
          titulo: asset.titulo || '',
          descripcion: asset.descripcion || '',
          categoria: asset.categoria || '',
          etiquetas: asset.etiquetas?.join(', ') || '',
          es_sensible: asset.es_sensible || false,
        });

        setArchivosActuales(asset.archivos || []);
      } catch (error) {
        console.error("Error al obtener asset:", error);
        alert("No se pudo cargar el asset.");
      }
    };
    fetchAsset();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleAssetFiles = async (e) => {
    const files = [...e.target.files];
    const extracted = [];

    for (const file of files) {
      if (file.name.endsWith(".zip")) {
        const arrayBuffer = await file.arrayBuffer();
        const zipContents = unzipSync(new Uint8Array(arrayBuffer));

        for (const [filename, data] of Object.entries(zipContents)) {
          if (!filename.endsWith("/")) {
            const blob = new Blob([data], { type: "application/octet-stream" });
            const fileFromZip = new File([blob], filename);
            extracted.push(fileFromZip);
          }
        }
      } else {
        extracted.push(file);
      }
    }

    setArchivosAsset(extracted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("titulo", formData.titulo);
    data.append("descripcion", formData.descripcion);
    data.append("categoria", formData.categoria);
    data.append("es_sensible", formData.es_sensible);
    formData.etiquetas.split(",").map((t) => t.trim()).forEach((t) => data.append("etiquetas", t));
    if (imagenPrincipal) data.append("imagen_principal", imagenPrincipal);
    imagenesPrevias.forEach((f) => data.append("imagenes_previas", f));
    archivosAsset.forEach((f) => data.append("archivo_asset", f));

    try {
      const token = localStorage.getItem("authToken");
      await axios.put(`http://localhost:5000/api/asset/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("✅ Asset actualizado correctamente");
      navigate('/perfil/assets-subidos');
    } catch (error) {
      console.error("❌ Error al actualizar asset:", error);
      alert("No se pudo actualizar el asset");
    }
  };

  const handleEliminarArchivo = async (nombre) => {
  const confirmado = window.confirm(`¿Eliminar el archivo "${nombre}"?`);
  if (!confirmado) return;

  try {
    const token = localStorage.getItem("authToken");
    await axios.delete(`http://localhost:5000/api/asset/${id}/archivo`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { nombre }
    });

    setArchivosActuales(prev => prev.filter(a => a.nombre !== nombre));
  } catch (err) {
    console.error("Error al eliminar archivo:", err);
    alert("No se pudo eliminar el archivo.");
  }
};


  return (
    <div className="subir-asset-container">
      <div className="subir-asset-header">
        <h2 className="subir-asset-title"><FaEdit /> Editar Asset</h2>
      </div>

      <form className="subir-asset-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="subir-columna">
          <label>Imagen Principal *</label>
          <input type="file" accept="image/*" onChange={(e) => setImagenPrincipal(e.target.files[0])} />

          <label>Imágenes Previas</label>
          <input type="file" accept="image/*" multiple onChange={(e) => setImagenesPrevias([...e.target.files])} />

          <label>Archivos del Asset (ZIP o múltiples archivos)</label>
          <input type="file" accept=".zip,application/zip,*" multiple onChange={handleAssetFiles} />

          {archivosActuales.length > 0 && (
            <div className="archivos-actuales">
              <p>Archivos actuales:</p>
              <ul>
                {archivosActuales.map((a, i) => (
                  <li key={i}>
                    <a href={a.url} target="_blank" rel="noreferrer">{a.nombre}</a>
                    <button
                      type="button"
                      className="eliminar-archivo"
                      onClick={() => handleEliminarArchivo(a.nombre)}
                    >
                      ❌
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <label>Etiquetas</label>
          <input type="text" name="etiquetas" value={formData.etiquetas} onChange={handleChange} placeholder="Naturaleza, Audio, Ambiente..." />

          <label className="checkbox-label">
            <input type="checkbox" name="es_sensible" checked={formData.es_sensible} onChange={handleChange} />
            Contenido sensible
          </label>
        </div>

        <div className="subir-columna">
          <label>Título *</label>
          <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} required />

          <label>Descripción *</label>
          <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} required />

          <label>Categoría *</label>
          <select name="categoria" value={formData.categoria} onChange={handleChange} required>
            <option value="">Seleccione una categoría</option>
            <option value="Modelos 3D">Modelos 3D</option>
            <option value="Gráficos 2D">Gráficos 2D</option>
            <option value="Audio">Audio</option>
            <option value="Scripts">Scripts</option>
            <option value="Efectos 3D">Efectos 3D</option>
            <option value="Materiales">Materiales</option>
            <option value="IA">IA</option>
            <option value="Paquetes">Paquetes</option>
          </select>

          <button className="subir-asset-boton" type="submit">Guardar Cambios</button>
          <p className="campo-obligatorio">* Campos obligatorios</p>
        </div>
      </form>
    </div>
  );
};

export default EditarAsset;
