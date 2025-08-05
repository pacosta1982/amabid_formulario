import React from "react";

const InmuebleTab = ({ datos, handleChange }) => {
  return (
    <div className="row g-2">
      <legend>1.1 Inmueble</legend>
      <div className="col-md-6">
        <select
          className="form-control"
          value={datos.inmueble.tituloPropiedad}
          onChange={(e) => handleChange("inmueble", "tituloPropiedad", e.target.value)}
        >
          <option value="">¿Tiene título de propiedad?</option>
          <option value="si">Sí</option>
          <option value="no">No</option>
          <option value="tramite">En trámite</option>
        </select>
      </div>

      <div className="col-md-6">
        <select
          className="form-control"
          value={datos.inmueble.comprobantePago}
          onChange={(e) => handleChange("inmueble", "comprobantePago", e.target.value)}
        >
          <option value="">¿Tiene comprobante de pago del 50% o más?</option>
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className="col-md-12">
        <input
          className="form-control"
          type="text"
          placeholder="Otro documento que acredite tenencia legal"
          value={datos.inmueble.otroDocumento}
          onChange={(e) => handleChange("inmueble", "otroDocumento", e.target.value)}
        />
      </div>

      <div className="col-md-6">
        <input
          className="form-control"
          type="text"
          placeholder="Conexión ANDE (directo)"
          value={datos.inmueble.conexionANDE}
          onChange={(e) => handleChange("inmueble", "conexionANDE", e.target.value)}
        />
      </div>
      <div className="col-md-6">
        <input
          className="form-control"
          type="text"
          placeholder="N° de Finca o Matrícula"
          value={datos.inmueble.fincaMatricula}
          onChange={(e) => handleChange("inmueble", "fincaMatricula", e.target.value)}
        />
      </div>

      <div className="col-md-6">
        <input
          className="form-control"
          type="text"
          placeholder="Dirección"
          value={datos.inmueble.direccion}
          onChange={(e) => handleChange("inmueble", "direccion", e.target.value)}
        />
      </div>
      <div className="col-md-3">
        <input
          className="form-control"
          type="text"
          placeholder="Barrio"
          value={datos.inmueble.barrio}
          onChange={(e) => handleChange("inmueble", "barrio", e.target.value)}
        />
      </div>
      <div className="col-md-3">
        <input
          className="form-control"
          type="text"
          placeholder="Municipio"
          value={datos.inmueble.municipio}
          onChange={(e) => handleChange("inmueble", "municipio", e.target.value)}
        />
      </div>

      <div className="col-md-6">
        <input
          className="form-control"
          type="text"
          placeholder="N° de Cuenta CTE/Padron"
          value={datos.inmueble.padron}
          onChange={(e) => handleChange("inmueble", "padron", e.target.value)}
        />
      </div>
      <div className="col-md-6">
        <select
          className="form-control"
          value={datos.inmueble.subsidioAnterior}
          onChange={(e) => handleChange("inmueble", "subsidioAnterior", e.target.value)}
        >
          <option value="">¿Recibió subsidio habitacional?</option>
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>
      </div>
    </div>
  );
};

export default InmuebleTab;
