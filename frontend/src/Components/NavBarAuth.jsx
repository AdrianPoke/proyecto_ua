// NavBarAuth.jsx
import React from "react";
import { Link } from "react-router-dom";

function NavBarAuth() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </nav>
  );
}

export default NavBarAuth;
