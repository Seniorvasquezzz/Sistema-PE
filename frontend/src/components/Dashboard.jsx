import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "./Navbar";

function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Navbar />
      <h2>Bienvenido, {user?.usuario || "Usuario"}</h2>
      <p>Tu rol: {user?.rol}</p>
      <p>Local: {user?.local}</p>
    </div>
  );
}

export default Dashboard;
