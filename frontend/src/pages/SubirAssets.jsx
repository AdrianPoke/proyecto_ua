import React, { useState } from "react";
import axios from "axios";
import "../styles/subirAsset.css";
import logo from "../logo.png";
import { unzipSync } from "fflate";

function SubirAssets() {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    categoria: "",
    etiquetas: "",
    es_sensible: false,
  });

  const [imagenPrincipal, setImagenPrincipal] = useState(null);
  const [imagenesPrevias, setImagenesPrevias] = useState([]);
  const [archivosAsset, setArchivosAsset] = useState([]);

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
      const res = await axios.post("http://localhost:5000/api/asset", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("✅ Asset subido con éxito");
      console.log(res.data);
    } catch (error) {
      console.error(error);
      alert("❌ Error al subir el asset");
    }
  };

  return (
    <div className="subir-asset-container">
      <div className="subir-asset-header">
  <img src={logo} alt="Logo" className="subir-logo" />
  <h2 className="subir-asset-title">Subir nuevo Asset</h2>
</div>


      <form className="subir-asset-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="subir-columna">
          <label>Imagen Principal *</label>
          <input type="file" accept="image/*" required onChange={(e) => setImagenPrincipal(e.target.files[0])} />

          <label>Imágenes Previas</label>
          <input type="file" accept="image/*" multiple onChange={(e) => setImagenesPrevias([...e.target.files])} />

          <label>Archivos del Asset (ZIP o múltiples archivos)</label>
          <input
            type="file"
            accept=".zip,application/zip,*"
            multiple
            onChange={handleAssetFiles}
          />


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

          <button className="subir-asset-boton" type="submit">Subir Asset</button>
          <p className="campo-obligatorio">* Campos obligatorios</p>
        </div>
      </form>
    </div>
  );
}

export default SubirAssets;