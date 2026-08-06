import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Layout from "./layout/Layout";
import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";
import Paquetes from "./pages/Paquetes";
import Rutas from "./pages/Rutas";
import Locales from "./pages/Locales";
import NoRetirados from "./pages/NoRetirados";
import Devoluciones from "./pages/Devoluciones";

function PrivateRoute({ children }) {
  const { usuario } = useContext(AuthContext);
  return usuario ? children : <Navigate to="/login" />;
}

export default function App() {
  const { login } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login onLogin={login} />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="paquetes" element={<Paquetes />} />
          <Route path="rutas" element={<Rutas />} />
          <Route path="locales" element={<Locales />} />
          <Route path="no-retirados" element={<NoRetirados />} />
          <Route path="devoluciones" element={<Devoluciones />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
