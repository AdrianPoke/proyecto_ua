import React from "react";
import "../styles/politicas.css";

function Accesibilidad() {
  return (
    <div className="politicas-container">
      <h2 className="politicas-titulo">Política de accesibilidad</h2>

      <p>
        En MoLaMaZo Assets, creemos en la inclusión digital y el acceso equitativo a la información. Nos comprometemos a garantizar que nuestra página web de gestión de assests digitales sea accesible para todas las personas, incluidas aquellas con discapacidades.
      </p>

      <h3 className="politicas-subtitulo">1. Nuestro compromiso con la accesibilidad</h3>
      <p> 
        Buscamos cumplir con los estándares de accesibilidad web, incluyendo las Pautas de Accesibilidad para el Contenido Web (WCAG 2.1), asegurando que nuestro sitio sea utilizable por personas con diversas capacidades.
      </p>

      <h3 className="politicas-subtitulo">2. Medidas de Accesibilidad implementados</h3>
      <p>Hemos integrado las siguientes mejoras en nuestra plataforma:</p>
      <ul>
        <li>Compatibilidad con lectores de pantalla y software de asistencia.</li>
        <li>Navegación optimizada por teclado.</li>
        <li>Contraste adecuado para mejorar la visibilidad del contenido.</li>
        <li>Etiquetas y descripciones alternativas para elementos multimedia.</li>
      </ul>

      <h3 className="politicas-subtitulo">3. Mejoras continuas</h3>
      <p>
        Revisamos y mejoramos constantemente nuestra accesibilidad mediante:
      </p>
      <ul>
        <li>Pruebas regulares con usuarios que utilizan tecnologías de asistencia.</li>
        <li>Evaluaciones periódicas de accesibilidad en conformidad con las WCAG.</li>
        <li>Capacitación a nuestro equipo de desarrollo sobre accesibilidad digital.</li>
      </ul>

      <h3 className="politicas-subtitulo">4. Asistencia y contacto</h3>
      <p>
        Si encuentras alguna barrera de accesibilidad en nuestra página o necesitas asistencia, contáctanos a través de <b>MoLaMaZo@hotmail.com</b> para mejorar tu experiencia.
      </p>

      <h3 className="politicas-subtitulo">5. Modificaciones a la Política de Accesibilidad</h3>
      <p>
        Nos comprometemos a actualizar esta política conforme evolucione nuestra plataforma para mejorar la inclusión digital de todos los usuarios.
      </p>
    </div>
  );
}

export default Accesibilidad;
