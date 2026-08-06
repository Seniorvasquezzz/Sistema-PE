import { useState, useEffect, useCallback } from "react";
import api from "../services/api";

export default function Paquetes() {
  const [form, setForm] = useState({
    vendedor: "",
    cliente: "",
    destino: "",
    procedencia: "",
    total: "",
    fecha_ingreso: ""
  });

  const [paquetes, setPaquetes] = useState([]);

  const cargarPaquetes = useCallback(async () => {
    try {
      const res = await api.get("/paquetes");
      setPaquetes(res.data);
    } catch (err) {
      console.error("Error cargando paquetes:", err);
    }
  }, []);

  const registrar = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/paquetes", form);
      console.log("REGISTRO RESPUESTA:", res.data);

      cargarPaquetes();

      setForm({
        vendedor: "",
        cliente: "",
        destino: "",
        procedencia: "",
        total: "",
        fecha_ingreso: ""
      });
    } catch (err) {
      console.error("Error registrando paquete:", err);
    }
  };

  useEffect(() => {
    cargarPaquetes();
  }, [cargarPaquetes]);

  return (
    <div>
      <h2>Ingreso de Paquetes</h2>

      <form onSubmit={registrar}>
        <input
          type="text"
          placeholder="Vendedor"
          value={form.vendedor}
          onChange={(e) => setForm({ ...form, vendedor: e.target.value })}
        />

        <input
          type="text"
          placeholder="Cliente"
          value={form.cliente}
          onChange={(e) => setForm({ ...form, cliente: e.target.value })}
        />

        <input
          type="text"
          placeholder="Destino"
          value={form.destino}
          onChange={(e) => setForm({ ...form, destino: e.target.value })}
        />

        <input
          type="text"
          placeholder="Procedencia"
          value={form.procedencia}
          onChange={(e) => setForm({ ...form, procedencia: e.target.value })}
        />

        <input
          type="number"
          placeholder="Total"
          value={form.total}
          onChange={(e) => setForm({ ...form, total: e.target.value })}
        />

        <input
          type="date"
          value={form.fecha_ingreso}
          onChange={(e) => setForm({ ...form, fecha_ingreso: e.target.value })}
        />

        <button>Registrar</button>
      </form>

      <h3>Paquetes ingresados</h3>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Vendedor</th>
            <th>Cliente</th>
            <th>Destino</th>
            <th>Procedencia</th>
            <th>Total</th>
            <th>Fecha ingreso</th>
          </tr>
        </thead>
        <tbody>
          {paquetes.map((p) => (
            <tr key={p.id_paquete}>
              <td>{p.id_paquete}</td>
              <td>{p.vendedor}</td>
              <td>{p.cliente}</td>
              <td>{p.destino}</td>
              <td>{p.procedencia}</td>
              <td>{p.total}</td>
              <td>{new Date(p.fecha_ingreso).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
