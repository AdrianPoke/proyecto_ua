import React from "react";
import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <div>
      <nav>
        <Link to="/">Inicio</Link> | <Link to="/assets">Assets</Link> | <Link to="/login">Login</Link>
      </nav>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
