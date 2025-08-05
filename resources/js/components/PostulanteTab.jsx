import React from "react";

const PostulanteTab = ({ datos, handleChange }) => {
  return (
    <fieldset>
      <legend>1.1 Datos del/la Postulante</legend>

      <div className="row">
        <div className="col-md-6 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre y Apellido"
            value={datos.postulante.nombre}
            onChange={(e) => handleChange("postulante", "nombre", e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="C.I. Nº"
            value={datos.postulante.ci}
            onChange={(e) => handleChange("postulante", "ci", e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-3">
          <input
            type="date"
            className="form-control"
            value={datos.postulante.fechaNacimiento}
            onChange={(e) => handleChange("postulante", "fechaNacimiento", e.target.value)}
          />
        </div>
        <div className="col-md-4 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Estado Civil"
            value={datos.postulante.estadoCivil}
            onChange={(e) => handleChange("postulante", "estadoCivil", e.target.value)}
          />
        </div>
        <div className="col-md-4 mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Edad"
            value={datos.postulante.edad}
            onChange={(e) => handleChange("postulante", "edad", e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nacionalidad"
            value={datos.postulante.nacionalidad}
            onChange={(e) => handleChange("postulante", "nacionalidad", e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Escolaridad"
            value={datos.postulante.escolaridad}
            onChange={(e) => handleChange("postulante", "escolaridad", e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Teléfono"
            value={datos.postulante.telefono}
            onChange={(e) => handleChange("postulante", "telefono", e.target.value)}
          />
        </div>
        <div className="col-md-4 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Otro Contacto"
            value={datos.postulante.otroContacto}
            onChange={(e) => handleChange("postulante", "otroContacto", e.target.value)}
          />
        </div>
        <div className="col-md-4 mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={datos.postulante.email}
            onChange={(e) => handleChange("postulante", "email", e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Profesión"
            value={datos.postulante.profesion}
            onChange={(e) => handleChange("postulante", "profesion", e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Actividad Laboral"
            value={datos.postulante.actividad}
            onChange={(e) => handleChange("postulante", "actividad", e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Ingreso mensual (Gs)"
            value={datos.postulante.ingreso}
            onChange={(e) => handleChange("postulante", "ingreso", e.target.value)}
          />
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={datos.postulante.rucActivo}
              onChange={(e) => handleChange("postulante", "rucActivo", e.target.checked)}
              id="rucActivoPostulante"
            />
            <label className="form-check-label" htmlFor="rucActivoPostulante">
              ¿Tiene RUC activo?
            </label>
          </div>
        </div>
      </div>
    </fieldset>
  );
};

export default PostulanteTab;
