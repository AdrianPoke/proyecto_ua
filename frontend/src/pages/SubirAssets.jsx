import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/subirAsset.css";
import logo from "../logo.png";

function SubirAssets() {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    categoria: "",
    etiquetas: "",
    es_sensible: false,
  });

  const [categorias, setCategorias] = useState([]);
  const [formatosPermitidos, setFormatosPermitidos] = useState([]);
  const [imagenPrincipal, setImagenPrincipal] = useState(null);
  const [imagenesPrevias, setImagenesPrevias] = useState([]);
  const [archivosAsset, setArchivosAsset] = useState([]);
  const [errores, setErrores] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();



  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/categoria`)
      .then((res) => setCategorias(res.data))
      .catch((err) => console.error("❌ Error cargando categorías", err));
  }, []);

  useEffect(() => {
    if (!formData.categoria) return;
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/categoria/${formData.categoria}/formatos`)
      .then((res) => setFormatosPermitidos(res.data.formatos_permitidos || []))
      .catch(() => setFormatosPermitidos([]));
  }, [formData.categoria]);

  const validarCampo = (name, value) => {
    let error = "";
    if (name === "titulo" && !value.trim()) error = "El título es obligatorio.";
    if (name === "descripcion" && !value.trim()) error = "La descripción es obligatoria.";
    if (name === "categoria" && !value) error = "Debes seleccionar una categoría.";
    setErrores((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
    validarCampo(name, val);
  };

  const handleAssetFiles = (e) => {
  const files = [...e.target.files];
  const maxArchivos = 15;

  if (files.length > maxArchivos) {
    setErrores((prev) => ({
      ...prev,
      archivosAsset: `Solo se permiten hasta ${maxArchivos} archivos.`,
    }));
    setArchivosAsset([]);
    return;
  }

  const extensionesInvalidas = files.filter((file) => {
    const ext = file.name.split(".").pop().toLowerCase();
    return !formatosPermitidos.includes(ext);
  });

  if (extensionesInvalidas.length > 0) {
    setErrores((prev) => ({
      ...prev,
      archivosAsset: `Los siguientes archivos tienen formato inválido: ${extensionesInvalidas.map(f => f.name).join(", ")}`,
    }));
    setArchivosAsset([]);
  } else {
    setErrores((prev) => ({ ...prev, archivosAsset: "" }));
    setArchivosAsset(files);
  }
};


 const handleSubmit = async (e) => {
  e.preventDefault();
  const nuevosErrores = {};
  if (!formData.titulo.trim()) nuevosErrores.titulo = "El título es obligatorio.";
  if (!formData.descripcion.trim()) nuevosErrores.descripcion = "La descripción es obligatoria.";
  if (!formData.categoria) nuevosErrores.categoria = "Debes seleccionar una categoría.";
  if (!imagenPrincipal) nuevosErrores.imagenPrincipal = "La imagen principal es obligatoria.";
  if (archivosAsset.length === 0) nuevosErrores.archivosAsset = "Debes subir al menos un archivo válido.";
  setErrores(nuevosErrores);
  if (Object.keys(nuevosErrores).length > 0) return;

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
    setIsLoading(true);
    const token = localStorage.getItem("authToken");
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/asset`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    setIsLoading(false);

    // Redirección con toast clicable
    const nuevoAssetId = res.data._id;
    toast.success("Asset subido con éxito");


    // Limpiar formulario si quieres
    setFormData({
      titulo: "",
      descripcion: "",
      categoria: "",
      etiquetas: "",
      es_sensible: false,
    });
    setImagenPrincipal(null);
    setImagenesPrevias([]);
    setArchivosAsset([]);
    setErrores({});

  } catch (error) {
    console.error(error);
    setIsLoading(false);
    toast.error("❌ Error al subir el asset");
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
          <label>
            Imagen Principal *
            {errores.imagenPrincipal && <span className="error"> — {errores.imagenPrincipal}</span>}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setImagenPrincipal(file);
              if (file) {
                setErrores((prev) => ({ ...prev, imagenPrincipal: "" }));
              }
            }}
          />


          <label>
            Imágenes Previas [máximo: 5]
            {errores.imagenesPrevias && <span className="error"> — {errores.imagenesPrevias}</span>}
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              const files = [...e.target.files];
              const maxPrevias = 5;

              if (files.length > maxPrevias) {
                setErrores((prev) => ({
                  ...prev,
                  imagenesPrevias: `Solo se permiten hasta ${maxPrevias} imágenes previas.`,
                }));
                setImagenesPrevias([]);
              } else {
                setErrores((prev) => ({ ...prev, imagenesPrevias: "" }));
                setImagenesPrevias(files);
              }
            }}
          />



          <label>
            Archivos del Asset * [máximo: 15]
            {errores.archivosAsset && <span className="error"> — {errores.archivosAsset}</span>}
          </label>
          <input
            type="file"
            multiple
            disabled={!formData.categoria}
            accept={formatosPermitidos.map(ext => `.${ext}`).join(',')}
            onClick={(e) => {
              if (!formData.categoria) {
                e.preventDefault();
                alert("Selecciona una categoría primero.");
              }
            }}
            onChange={handleAssetFiles}
          />

          {errores.archivosAsset &&
            (errores.archivosAsset.includes(".zip") ||
             errores.archivosAsset.includes(".rar") ||
             errores.archivosAsset.includes(".7z")) && (
              <p className="error">
                No se pueden subir archivos comprimidos como <strong>.zip</strong>, <strong>.rar</strong> o <strong>.7z</strong>. Los assets deben subirse como archivos sueltos.
              </p>
          )}

          <label>Etiquetas</label>
          <input
            type="text"
            name="etiquetas"
            value={formData.etiquetas}
            onChange={handleChange}
            placeholder="Naturaleza, Audio, Ambiente..."
          />

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="es_sensible"
              checked={formData.es_sensible}
              onChange={handleChange}
            />
            Contenido sensible
          </label>
        </div>

        <div className="subir-columna">
          <label>
            Título *
            {errores.titulo && <span className="error"> — {errores.titulo}</span>}
          </label>
          <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} />

          <label>
            Descripción *
            {errores.descripcion && <span className="error"> — {errores.descripcion}</span>}
          </label>
          <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} />

          <label>
            Categoría *
            {errores.categoria && <span className="error"> — {errores.categoria}</span>}
          </label>
          <select name="categoria" value={formData.categoria} onChange={handleChange}>
            <option value="">Seleccione una categoría</option>
            {categorias.map((cat) => (
              <option key={cat._id} value={cat.nombre}>{cat.nombre}</option>
            ))}
          </select>

          {formatosPermitidos.length > 0 && (
            <p className="formatos-info">
              Formatos permitidos: {formatosPermitidos.join(", ")}
            </p>
          )}

          <div className="botones-formulario">
            <button
              type="button"
              className="btn-cancelar"
              onClick={() => window.location.href = "/"}
            >
              Cancelar
            </button>
            <button type="submit" className="subir-asset-boton">Subir Asset</button>
          </div>
          <p className="campo-obligatorio">* Campos obligatorios</p>
        </div>
      </form>
      {isLoading && (
        <div className="overlay-carga">
          <div className="spinner"></div>
          <p className="mensaje-carga">Subiendo asset, por favor espera...</p>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

    </div>
  );
}

export default SubirAssets;
