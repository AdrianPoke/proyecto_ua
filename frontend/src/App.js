import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './Components/Layout';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Categorias from "./pages/Categorias";
import NotFound from "./pages/NotFound";
import AuthGuard from "./Components/AuthGuard";  // Import the AuthGuard

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* AuthGuard checks if the user is authenticated */}
          <Route path="/categorias" element={<AuthGuard><Categorias /></AuthGuard>} /> {/* Protect route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
