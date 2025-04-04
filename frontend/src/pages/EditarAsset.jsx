import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import '../styles/editarAsset.css';

const EditarAsset = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    categoria: '',
    licencia: '',
    precio: '0',
    archivos: null,
    imagenes: null
  });

  useEffect(() => {
    // Simulación de carga de datos del asset
    const assetEjemplo = {
      id: 1,
      nombre: "Modelo 3D - Guerrero Medieval",
      descripcion: "Modelo 3D detallado de un guerrero medieval con armadura completa, ideal para juegos de rol y fantasía.",
      categoria: "Modelos 3D",
      licencia: "Estándar",
      precio: "15",
      imagen: "/assets/warrior.webp"
    };

    setFormData({
      ...assetEjemplo,
      archivos: null,
      imagenes: null
    });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para actualizar el asset
    console.log('Asset actualizado:', formData);
    navigate('/perfil/assets-subidos');
  };

  return (
    <div className="editar-asset-container">
      <div className="editar-asset-header">
        <h1><FaEdit /> Editar Asset</h1>
      </div>

      <form className="editar-asset-form" onSubmit={handleSubmit}>
        <div className="form-preview">
          <img src={formData.imagen} alt="Preview" className="asset-preview" />
        </div>

        <div className="form-section">
          <h2>Información Básica</h2>
          
          <div className="form-group">
            <label htmlFor="nombre">Nombre del Asset:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="descripcion">Descripción:</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="categoria">Categoría:</label>
            <select
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecciona una categoría</option>
              <option value="Modelos 3D">Modelos 3D</option>
              <option value="Texturas">Texturas</option>
              <option value="Audio">Audio</option>
              <option value="Scripts">Scripts</option>
            </select>
          </div>
        </div>

        <div className="form-section">
          <h2>Archivos y Recursos</h2>
          
          <div className="form-group">
            <label htmlFor="archivos">Actualizar Archivos:</label>
            <input
              type="file"
              id="archivos"
              name="archivos"
              onChange={handleFileChange}
              multiple
            />
            <small>Archivos actuales: asset_v1.blend, texturas.zip</small>
          </div>

          <div className="form-group">
            <label htmlFor="imagenes">Actualizar Imágenes:</label>
            <input
              type="file"
              id="imagenes"
              name="imagenes"
              onChange={handleFileChange}
              accept="image/*"
              multiple
            />
            <small>Imágenes actuales: preview.jpg, detail1.jpg, detail2.jpg</small>
          </div>
        </div>

        <div className="form-section">
          <h2>Licencia y Precio</h2>
          
          <div className="form-group">
            <label htmlFor="licencia">Tipo de Licencia:</label>
            <select
              id="licencia"
              name="licencia"
              value={formData.licencia}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecciona una licencia</option>
              <option value="Estándar">Estándar</option>
              <option value="Premium">Premium</option>
              <option value="Extendida">Extendida</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="precio">Precio (€):</label>
            <input
              type="number"
              id="precio"
              name="precio"
              value={formData.precio}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancelar" onClick={() => navigate('/perfil/assets-subidos')}>
            Cancelar
          </button>
          <button type="submit" className="btn-guardar">
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarAsset; 