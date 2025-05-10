import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MotionWrapper from "./MotionWrapper";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Registro from "../pages/Registro";
import Perfil from "../pages/Perfil";
import BusquedaAvanzada from "../pages/BusquedaAvanzada";
import Politicas from "../pages/Politicas";
import Accesibilidad from "../pages/Accesibilidad";
import AssetsSubidos from "../pages/AssetsSubidos";
import Configuracion from "../pages/Configuracion";
import Datos from "../pages/Datos";
import Descargas from "../pages/Descargas";
import Favoritos from "../pages/Favoritos";
import Categorias from "../pages/Categorias";
import SubirAssets from "../pages/SubirAssets";
import VerAsset from "../pages/VerAsset";
import EditarAsset from "../pages/EditarAsset";
import AssetsCategoria from "../pages/AssetsCategoria";
import AuthGuard from "./AuthGuard";
import GuestGuard from "./GuestGuard";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Con animación */}
        <Route path="/" element={<MotionWrapper><Home /></MotionWrapper>} />
        <Route path="/home" element={<MotionWrapper><Home /></MotionWrapper>} />
        <Route path="/registro" element={<GuestGuard><MotionWrapper><Registro /></MotionWrapper></GuestGuard>} />
        <Route path="/login" element={<GuestGuard><MotionWrapper><Login /></MotionWrapper></GuestGuard>} />
        <Route path="/politicas" element={<MotionWrapper><Politicas /></MotionWrapper>} />
        <Route path="/accesibilidad" element={<MotionWrapper><Accesibilidad /></MotionWrapper>} />
        <Route path="/busqueda-avanzada" element={<MotionWrapper><BusquedaAvanzada /></MotionWrapper>} />
        <Route path="/categorias" element={<MotionWrapper><Categorias /></MotionWrapper>} />
        <Route path="/categorias/:categoria" element={<MotionWrapper><AssetsCategoria /></MotionWrapper>} />
        <Route path="/asset/:id" element={<AuthGuard><MotionWrapper><VerAsset /></MotionWrapper></AuthGuard>} />
        <Route path="/asset/:id/editar" element={<AuthGuard><MotionWrapper><EditarAsset /></MotionWrapper></AuthGuard>} />
        <Route path="/subir-assets" element={<AuthGuard><MotionWrapper><SubirAssets /></MotionWrapper></AuthGuard>} />

        {/* SIN animación */}
        <Route path="/perfil" element={<AuthGuard><Perfil /></AuthGuard>} />
        <Route path="/perfil/assets-subidos" element={<AuthGuard><AssetsSubidos /></AuthGuard>} />
        <Route path="/perfil/configuracion" element={<AuthGuard><Configuracion /></AuthGuard>} />
        <Route path="/perfil/datos" element={<AuthGuard><Datos /></AuthGuard>} />
        <Route path="/perfil/descargas" element={<AuthGuard><Descargas /></AuthGuard>} />
        <Route path="/perfil/favoritos" element={<AuthGuard><Favoritos /></AuthGuard>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
