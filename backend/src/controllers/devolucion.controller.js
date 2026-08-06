export const registrarDevolucion = async (req, res) => {
  try {
    const { id_paquete, motivo, local_destino } = req.body;

    // Validación básica
    if (!id_paquete || !motivo) {
      return res.status(400).json({ mensaje: "Datos incompletos" });
    }

    // Aquí luego conectamos con la BD real
    res.json({
      mensaje: "Devolución registrada correctamente",
      data: { id_paquete, motivo, local_destino }
    });

  } catch (error) {
    console.error("Error al registrar devolución:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

export const obtenerDevoluciones = async (req, res) => {
  try {
    // Aquí luego conectamos con la BD real
    res.json({
      mensaje: "Listado de devoluciones",
      data: []
    });

  } catch (error) {
    console.error("Error al obtener devoluciones:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

export const crearDevolucion = async (req, res) => {
  try {
    const { id_paquete, motivo, local_destino } = req.body;

    if (!id_paquete || !motivo) {
      return res.status(400).json({ mensaje: "Datos incompletos" });
    }

    res.json({
      mensaje: "Devolución creada correctamente",
      data: { id_paquete, motivo, local_destino }
    });

  } catch (error) {
    console.error("Error al crear devolución:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};
