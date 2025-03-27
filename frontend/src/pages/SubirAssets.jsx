import React from "react";
import "../styles/subirAsset.css";
import logo from "../logo.png";

function SubirAssets() {
  return (
    <div className="subir-asset-container">
      <h2 className="subir-asset-title">
        <img src={logo} alt="Logo" height={40} /> Formulario de Subida de Assets
      </h2>

      <form className="subir-asset-form">
        {/* Columna Izquierda */}
        <div className="subir-columna">
          <label>* Subir archivos ⬆️</label>
          <div className="dropzone">
            <p>
              Arrastra y suelta tus archivos en esta zona o haz clic para seleccionarlos
              manualmente
            </p>
          </div>

          <div className="formato-info">
            <p>Formatos Soportados:</p>
            <ul>
              <li>Modelos 3D: OBJ, FBX, BLEND</li>
              <li>Gráficos 2D e imágenes previas: PNG, JPG, WEBP</li>
              <li>Audio: MP3, WAV, OGG, FLAC</li>
              <li>Scripts: c#, JavaScript, Python</li>
            </ul>
          </div>
        </div>

        {/* Columna Derecha */}
        <div className="subir-columna">
          <label>* Título</label>
          <input type="text" placeholder="Ej: Textura Nieve HD" />

          <label>* Descripción</label>
          <textarea placeholder="Describe brevemente tu asset..." />

          <label>Imágenes previas</label>
          <div className="dropzone">
            <p>Sube imágenes opcionales</p>
          </div>

          <label>* Categoría</label>
          <select>
            <option value="">Seleccione</option>
            <option value="modelos">Modelos 3D</option>
            <option value="graficos">Gráficos 2D</option>
            <option value="audio">Audio</option>
            <option value="scripts">Scripts</option>
            <option value="efectos">Efectos 3D</option>
            <option value="materiales">Materiales</option>
            <option value="ia">IA</option>
            <option value="paquetes">Paquetes</option>
          </select>

          <label>* Licencia de uso</label>
          <select>
            <option value="">Seleccione</option>
            <option value="libre">Libre</option>
            <option value="comercial">Comercial</option>
            <option value="personal">Uso Personal</option>
          </select>

          <label>
            <input type="checkbox" /> Contenido sensible
          </label>

          <button className="subir-asset-boton" type="submit">Subir</button>

          <div className="campo-obligatorio">* Campos obligatorios</div>
        </div>
      </form>
    </div>
  );
}

export default SubirAssets;
