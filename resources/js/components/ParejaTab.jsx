import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const ParejaTab = ({ datos, handleChange }) => {
  return (
    <fieldset>
      <legend>1.3 Datos del/la Cónyuge o Pareja</legend>
      <div className="row">
        <div className="col-md-6 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre y Apellido"
            value={datos.pareja.nombre}
            onChange={(e) => handleChange("pareja", "nombre", e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="C.I. Nº"
            value={datos.pareja.ci}
            onChange={(e) => handleChange("pareja", "ci", e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-3">
          <input
            type="date"
            className="form-control"
            value={datos.pareja.fechaNacimiento}
            onChange={(e) => handleChange("pareja", "fechaNacimiento", e.target.value)}
          />
        </div>
        <div className="col-md-4 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Estado Civil"
            value={datos.pareja.estadoCivil}
            onChange={(e) => handleChange("pareja", "estadoCivil", e.target.value)}
          />
        </div>
        <div className="col-md-4 mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Edad"
            value={datos.pareja.edad}
            onChange={(e) => handleChange("pareja", "edad", e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nacionalidad"
            value={datos.pareja.nacionalidad}
            onChange={(e) => handleChange("pareja", "nacionalidad", e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Escolaridad"
            value={datos.pareja.escolaridad}
            onChange={(e) => handleChange("pareja", "escolaridad", e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Teléfono"
            value={datos.pareja.telefono}
            onChange={(e) => handleChange("pareja", "telefono", e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={datos.pareja.email}
            onChange={(e) => handleChange("pareja", "email", e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Profesión"
            value={datos.pareja.profesion}
            onChange={(e) => handleChange("pareja", "profesion", e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Actividad Laboral"
            value={datos.pareja.actividad}
            onChange={(e) => handleChange("pareja", "actividad", e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Ingreso mensual (Gs)"
            value={datos.pareja.ingreso}
            onChange={(e) => handleChange("pareja", "ingreso", e.target.value)}
          />
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <div className="form-check me-4">
            <input
              className="form-check-input"
              type="checkbox"
              checked={datos.pareja.rucActivo}
              onChange={(e) => handleChange("pareja", "rucActivo", e.target.checked)}
              id="rucActivoPareja"
            />
            <label className="form-check-label" htmlFor="rucActivoPareja">
              ¿Tiene RUC activo?
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={datos.pareja.subsidioAnterior}
              onChange={(e) => handleChange("pareja", "subsidioAnterior", e.target.checked)}
              id="subsidioPareja"
            />
            <label className="form-check-label" htmlFor="subsidioPareja">
              ¿Recibió subsidio habitacional?
            </label>
          </div>
        </div>
      </div>
      <div className="p-3 border rounded bg-white">
              <h5 className="mb-3">4. Salud, Embarazo y Enfermedad</h5>
              <Form>
                {/* Discapacidad */}
                <Row className="mb-2">
                  <Col>
                    <Form.Check
                      type="checkbox"
                      label="¿Es una persona con discapacidad?"
                      checked={datos.pareja.discapacidad}
                      onChange={(e) => handleChange("pareja", "discapacidad", e.target.checked)}
                    />
                  </Col>
                </Row>
                {datos.pareja.discapacidad && (
                  <Row className="mb-2">
                    <Col md={6}>
                      <Form.Control
                        placeholder="Tipo de discapacidad (motora, sensorial, mental)"
                        value={datos.pareja.tipoDiscapacidad}
                        onChange={(e) => handleChange("pareja", "tipoDiscapacidad", e.target.value)}
                      />
                    </Col>
                  </Row>
                )}

                {/* Embarazo */}
                <Row className="mb-2">
                  <Col>
                    <Form.Check
                      type="checkbox"
                      label="¿Está embarazada?"
                      checked={datos.pareja.embarazo}
                      onChange={(e) => handleChange("pareja", "embarazo", e.target.checked)}
                    />
                  </Col>
                </Row>
                {datos.pareja.embarazo && (
                  <Row className="mb-2">
                    <Col md={6}>
                      <Form.Control
                        placeholder="Tiempo de gestación"
                        value={datos.pareja.gestacion}
                        onChange={(e) => handleChange("pareja", "gestacion", e.target.value)}
                      />
                    </Col>
                  </Row>
                )}

                {/* Enfermedad */}
                <Row className="mb-2">
                  <Col>
                    <Form.Check
                      type="checkbox"
                      label="¿Tiene una enfermedad grave incapacitante?"
                      checked={datos.pareja.enfermedad}
                      onChange={(e) => handleChange("pareja", "enfermedad", e.target.checked)}
                    />
                  </Col>
                </Row>
                {datos.pareja.enfermedad && (
                  <>
                    <Row className="mb-2">
                      <Col md={12}>
                        <Form.Control
                          placeholder="Descripción de la enfermedad"
                          value={datos.pareja.enfermedadDescripcion}
                          onChange={(e) => handleChange("pareja", "enfermedadDescripcion", e.target.value)}
                        />
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col>
                        <Form.Check
                          type="checkbox"
                          label="¿Tiene responsable de cuidados?"
                          checked={datos.pareja.responsableCuidados}
                          onChange={(e) => handleChange("pareja", "responsableCuidados", e.target.checked)}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col>
                        <Form.Check
                          type="checkbox"
                          label="¿Incapacita en actividades productivas o personales?"
                          checked={datos.pareja.afectaActividades}
                          onChange={(e) => handleChange("pareja", "afectaActividades", e.target.checked)}
                        />
                      </Col>
                    </Row>
                  </>
                )}
              </Form>
            </div>
    </fieldset>
  );
};

export default ParejaTab;
