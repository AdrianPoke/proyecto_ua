import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './Components/Layout';
import NotFound from "./pages/NotFound";
import AuthGuard from "./Components/AuthGuard";  // Import the AuthGuard


import Home from "./pages/Home";
import Login from "./pages/Login";
import Registro from "./pages/Registro"
import Perfil from "./pages/Perfil";
import BusquedaAvanzada from "./pages/BusquedaAvanzada";
import Politicas from "./pages/Politicas";


// PAGINAS DEL PERFIL DE USUARIO
// --------------------------------------------------
import AssetsSubidos from "./pages/AssetsSubidos";
import Configuracion from "./pages/Configuracion";
import Datos from "./pages/Datos";
import Descargas from "./pages/Descargas";
import Favoritos from "./pages/Favoritos";
// --------------------------------------------------


// PAGINAS RELACIONADAS CON LOS ASSETS
// ------------------------------------------------
import Categorias from "./pages/Categorias";
import SubirAssets from "./pages/SubirAssets";
import VistaAsset from "./pages/VistaAsset";
import AssetsCategoria from './pages/AssetsCategoria';
// ------------------------------------------------

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/politicas" element={<Politicas />} />
          <Route path="/busqueda-avanzada" element={<BusquedaAvanzada />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/categorias/:categoria" element={<AssetsCategoria />} />

          {/* Rutas protegidas */}
          <Route path="/vista-asset/:id" element={<AuthGuard><VistaAsset /></AuthGuard>} /> {/* Vista de asset individual */}
          <Route path="/subir-assets" element={<AuthGuard><SubirAssets /></AuthGuard>} /> {/* Página para subir un asset */}
          <Route path="/perfil" element={<AuthGuard><Perfil /></AuthGuard>} /> {/* Ruta principal del perfil */}
          <Route path="/perfil/assets-subidos" element={<AuthGuard><AssetsSubidos /></AuthGuard>} />
          <Route path="/perfil/configuracion" element={<AuthGuard><Configuracion /></AuthGuard>} />
          <Route path="/perfil/datos" element={<AuthGuard><Datos /></AuthGuard>} />
          <Route path="/perfil/descargas" element={<AuthGuard><Descargas /></AuthGuard>} />
          <Route path="/perfil/favoritos" element={<AuthGuard><Favoritos /></AuthGuard>} />

          {/* Ruta para páginas no encontradas */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
