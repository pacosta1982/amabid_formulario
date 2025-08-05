// src/components/MejorasTab.jsx
import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const MejorasTab = ({ datos, handleChange }) => {
  return (
    <div className="p-3 border rounded bg-white">
      <h5 className="mb-3">7. Mejoras y Observaciones</h5>
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="¿Qué quiere mejorar en su vivienda con este proyecto?"
              value={datos.mejoras}
              onChange={(e) => handleChange("mejoras", null, e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Observaciones adicionales"
              value={datos.observaciones}
              onChange={(e) => handleChange("observaciones", null, e.target.value)}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default MejorasTab;
