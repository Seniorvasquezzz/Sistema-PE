export default function FormModal({ title, onClose, onSubmit, children }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{title}</h2>

        <form onSubmit={onSubmit}>
          {children}

          <button type="submit">Guardar</button>
          <button type="button" onClick={onClose}>Cerrar</button>
        </form>
      </div>
    </div>
  );
}
