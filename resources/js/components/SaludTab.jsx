// src/components/SaludTab.jsx
import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const SaludTab = ({ datos, handleChange }) => {
  return (
    <div className="p-3 border rounded bg-white">
      <h5 className="mb-3">4. Salud, Embarazo y Enfermedad</h5>
      <Form>
        {/* Discapacidad */}
        <Row className="mb-2">
          <Col>
            <Form.Check
              type="checkbox"
              label="¿Es una persona con discapacidad?"
              checked={datos.discapacidad}
              onChange={(e) => handleChange("salud", "discapacidad", e.target.checked)}
            />
          </Col>
        </Row>
        {datos.discapacidad && (
          <Row className="mb-2">
            <Col md={6}>
              <Form.Control
                placeholder="Tipo de discapacidad (motora, sensorial, mental)"
                value={datos.tipoDiscapacidad}
                onChange={(e) => handleChange("salud", "tipoDiscapacidad", e.target.value)}
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
              checked={datos.embarazo}
              onChange={(e) => handleChange("salud", "embarazo", e.target.checked)}
            />
          </Col>
        </Row>
        {datos.embarazo && (
          <Row className="mb-2">
            <Col md={6}>
              <Form.Control
                placeholder="Tiempo de gestación"
                value={datos.gestacion}
                onChange={(e) => handleChange("salud", "gestacion", e.target.value)}
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
              checked={datos.enfermedad}
              onChange={(e) => handleChange("salud", "enfermedad", e.target.checked)}
            />
          </Col>
        </Row>
        {datos.enfermedad && (
          <>
            <Row className="mb-2">
              <Col md={12}>
                <Form.Control
                  placeholder="Descripción de la enfermedad"
                  value={datos.enfermedadDescripcion}
                  onChange={(e) => handleChange("salud", "enfermedadDescripcion", e.target.value)}
                />
              </Col>
            </Row>

            <Row className="mb-2">
              <Col>
                <Form.Check
                  type="checkbox"
                  label="¿Tiene responsable de cuidados?"
                  checked={datos.responsableCuidados}
                  onChange={(e) => handleChange("salud", "responsableCuidados", e.target.checked)}
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                <Form.Check
                  type="checkbox"
                  label="¿Incapacita en actividades productivas o personales?"
                  checked={datos.afectaActividades}
                  onChange={(e) => handleChange("salud", "afectaActividades", e.target.checked)}
                />
              </Col>
            </Row>
          </>
        )}
      </Form>
    </div>
  );
};

export default SaludTab;
