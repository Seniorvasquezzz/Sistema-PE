import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ usuario: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", form);
      console.log("RESPUESTA LOGIN:", res.data);

      if (res.data.ok) {
        localStorage.setItem("token", res.data.token);
        onLogin(res.data.usuario);

        // 🔥 ESTA LÍNEA ES LA QUE FALTABA
        navigate("/dashboard");
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Usuario</label>
            <input
              type="text"
              value={form.usuario}
              onChange={(e) =>
                setForm({ ...form, usuario: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button className="btn-primary" type="submit">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
