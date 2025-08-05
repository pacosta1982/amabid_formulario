// src/components/DocumentosTab.jsx
import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const DocumentosTab = ({ datos, handleChange }) => {
  return (
    <div className="p-3 border rounded bg-white">
      <h5 className="mb-3">6. Documentación Adjunta</h5>
      <Form>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Check
              type="checkbox"
              label="Fotocopia de cédula del solicitante y/o pareja"
              checked={datos.cedula}
              onChange={(e) => handleChange("documentos", "cedula", e.target.checked)}
            />
          </Col>
          <Col md={6}>
            <Form.Check
              type="checkbox"
              label="Título de propiedad u otro documento legal"
              checked={datos.tituloPropiedad}
              onChange={(e) => handleChange("documentos", "tituloPropiedad", e.target.checked)}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Check
              type="checkbox"
              label="Comprobante de ingreso (hasta 3,5 USM)"
              checked={datos.comprobanteIngreso}
              onChange={(e) => handleChange("documentos", "comprobanteIngreso", e.target.checked)}
            />
          </Col>
          <Col md={6}>
            <Form.Check
              type="checkbox"
              label="Documentos sociales requeridos (según MUVH)"
              checked={datos.documentosSociales}
              onChange={(e) => handleChange("documentos", "documentosSociales", e.target.checked)}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default DocumentosTab;
