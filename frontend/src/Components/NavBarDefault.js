// src/pages/NavBarNormal.jsx
import React from "react";
import { Link } from "react-router-dom";

function NavBarDefault() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/registro">Register</Link></li>
      </ul>
    </nav>
  );
}

export default NavBarDefault;
