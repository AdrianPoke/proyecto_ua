import React from "react";
import "../styles/politicas.css";

function Politicas() {
  return (
    <div className="politicas-container">
      <h2 className="politicas-titulo">Política de Privacidad</h2>

      <p>
        En MoLaMaZo Assets, nos comprometemos a proteger la privacidad y
        seguridad de los datos de nuestros usuarios. Esta Política de Privacidad
        describe cómo recopilamos, utilizamos, almacenamos y protegemos la
        información personal que nos proporcionas al utilizar nuestra página web
        de gestión de assets digitales.
      </p>

      <h3 className="politicas-subtitulo">1. Información que Recopilamos</h3>
      <p> 
        Recopilamos información personal y no personal para mejorar nuestros
        servicios y garantizar una experiencia óptima. Esta información puede
        incluir:
      </p>
      <ul>
        <li>Datos de registro: Nombre real, dirección de correo electrónico y contraseña.</li>
        <li>
          Datos de uso: Información sobre cómo utilizas la plataforma, incluyendo
          interacciones con otros usuarios, descargas y subidas de assets.
        </li>
        <li>
          Información técnica: Dirección IP, tipo de dispositivo, sistema operativo y configuración del navegador.
        </li>
        <li>
          Cookies y tecnologías similares: Utilizamos cookies para personalizar la experiencia y mejorar el rendimiento del sitio.
        </li>
      </ul>

      <h3 className="politicas-subtitulo">2. Uso de la Información</h3>
      <p>La información recopilada se utiliza para:</p>
      <ul>
        <li>Proveer y mejorar nuestros servicios.</li>
        <li>Gestionar la seguridad y autenticación de los usuarios.</li>
        <li>Personalizar la experiencia del usuario.</li>
        <li>Comunicaciones y soporte.</li>
        <li>Cumplir con obligaciones legales y regulatorias.</li>
      </ul>

      <h3 className="politicas-subtitulo">3. Compartición de la Información</h3>
      <p>
        No compartimos información personal con terceros, salvo en los siguientes casos:
      </p>
      <ul>
        <li>Para el cumplimiento de obligaciones legales.</li>
        <li>
          Con proveedores de servicios esenciales bajo estrictas políticas de privacidad.
        </li>
      </ul>

      <h3 className="politicas-subtitulo">4. Derechos del Usuario</h3>
      <p>
        Los usuarios pueden acceder, corregir o eliminar su información personal a través
        de la configuración de la cuenta o contactando a nuestro soporte.
      </p>

      <h3 className="politicas-subtitulo">5. Modificaciones a la Política de Privacidad</h3>
      <p>
        Nos reservamos el derecho de modificar esta política. Se notificará a los
        usuarios sobre cambios significativos.
      </p>
    </div>
  );
}

export default Politicas;
