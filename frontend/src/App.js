// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './Components/Layout';
import Home from "./pages/Home";
import Login from "./pages/Login";
import VistaAsset from "./pages/VistaAsset";
import NotFound from "./pages/NotFound";
import AssetsSubidos from "./pages/AssetsSubidos";
import CategoriaEfectos3D from "./pages/CategoriaEfectos3D";
import CategoriaMateriales from "./pages/CategoriaMateriales";
import Categorias from "./pages/Categorias";
import CategoriaGraficos2D from "./pages/CategoriaGraficos2D";
import CategoriaModelos3D from "./pages/CategoriaModelos3D";
import CategoriaScripts from "./pages/CategoriaScripts";
import CategoriaAudio from "./pages/CategoriaAudio";
import CategoriaIA from "./pages/CategoriaIA";
import CategoriaPaquetes from "./pages/CategoriaPaquetes";
import Configuracion from "./pages/Configuracion";
import Favoritos from "./pages/Favoritos";
import Descargas from "./pages/Descargas";
import Datos from "./pages/Datos";
import Politicas from "./pages/Politicas";
import Registro from "./pages/Registro";
import Perfil from "./pages/Perfil";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Rutas para usuarios no autenticados */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/politicas" element={<Politicas />} />

          {/* Rutas para usuarios autenticados */}
          <Route path="/assets" element={<VistaAsset />} />
          
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/categorias/efectos3d" element={<CategoriaEfectos3D />} />
          <Route path="/categorias/materiales" element={<CategoriaMateriales />} />
          <Route path="/categorias/graficos2d" element={<CategoriaGraficos2D />} />
          <Route path="/categorias/modelos3d" element={<CategoriaModelos3D />} />
          <Route path="/categorias/scripts" element={<CategoriaScripts />} />
          <Route path="/categorias/audio" element={<CategoriaAudio />} />
          <Route path="/categorias/ia" element={<CategoriaIA />} />
          <Route path="/categorias/paquetes" element={<CategoriaPaquetes />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/perfil/configuracion" element={<Configuracion />} />
          <Route path="/perfil/favoritos" element={<Favoritos />} />
          <Route path="/perfil/descargas" element={<Descargas />} />
          <Route path="/perfil/datos" element={<Datos />} />
          <Route path="/perfil/assets-subidos" element={<AssetsSubidos />} />

          {/* Ruta para páginas no encontradas */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
