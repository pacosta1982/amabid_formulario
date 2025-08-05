// src/components/CompromisoTab.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Col } from "react-bootstrap";

const CompromisoTab = ({ datos, handleChange }) => {
  return (
    <div className="p-3 border rounded bg-white">
      <legend className="mb-3">2.3 y 2.4 Ahorro y Cooperativa</legend>
      <Form>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Select
              value={datos.habilitaAhorro}
              onChange={(e) => handleChange("compromiso", "habilitaAhorro", e.target.value)}
            >
              <option value="">¿Se compromete a habilitar una cuenta de ahorro de Gs. 1.000.000?</option>
              <option value="si">Sí</option>
              <option value="no">No</option>
            </Form.Select>
          </Col>
          <Col md={6}>
            <Form.Control
              placeholder="Asociación a la Cooperativa"
              value={datos.asociacionCooperativa}
              onChange={(e) => handleChange("compromiso", "asociacionCooperativa", e.target.value)}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CompromisoTab;
