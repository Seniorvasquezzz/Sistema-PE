import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside style={{
      width: "220px",
      background: "#2c3e50",
      color: "white",
      padding: "25px 20px",
      minHeight: "100vh"
    }}>
      <h2 style={{ marginBottom: "30px" }}>Sistema PE</h2>

      <nav>
        <ul style={{ listStyle: "none" }}>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/paquetes">Paquetes</Link></li>
          <li><Link to="/rutas">Rutas</Link></li>
          <li><Link to="/locales">Locales</Link></li>
          <li><Link to="/no-retirados">No Retirados</Link></li>
          <li><Link to="/devoluciones">Devoluciones</Link></li>
        </ul>
      </nav>
    </aside>
  );
}
