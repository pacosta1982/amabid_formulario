// src/components/GrupoFamiliarTab.jsx
import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

const GrupoFamiliarTab = ({ familia, handleFamiliaChange, agregarIntegrante, eliminarIntegrante }) => {
  return (
    <div className="p-3 border rounded bg-white">
      <h5 className="mb-3">3. Integrantes del Grupo Familiar</h5>
      <Form>
        {familia.map((persona, index) => (
          <div key={index} className="border rounded p-3 mb-3">
            <Row className="mb-2">
              <Col md={6}>
                <Form.Control
                  placeholder="Nombre y Apellido"
                  value={persona.nombre}
                  onChange={(e) => handleFamiliaChange(index, "nombre", e.target.value)}
                />
              </Col>
              <Col md={6}>
                <Form.Control
                  placeholder="C.I. Nº"
                  value={persona.ci}
                  onChange={(e) => handleFamiliaChange(index, "ci", e.target.value)}
                />
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md={4}>
                <Form.Control
                  placeholder="Edad"
                  value={persona.edad}
                  onChange={(e) => handleFamiliaChange(index, "edad", e.target.value)}
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  placeholder="Parentesco"
                  value={persona.parentesco}
                  onChange={(e) => handleFamiliaChange(index, "parentesco", e.target.value)}
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  placeholder="Escolaridad"
                  value={persona.escolaridad}
                  onChange={(e) => handleFamiliaChange(index, "escolaridad", e.target.value)}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={8}>
                <Form.Control
                  placeholder="Ocupación"
                  value={persona.ocupacion}
                  onChange={(e) => handleFamiliaChange(index, "ocupacion", e.target.value)}
                />
              </Col>
              <Col md={4}>
                <Button variant="outline-danger" onClick={() => eliminarIntegrante(index)}>
                  Eliminar
                </Button>
              </Col>
            </Row>
            {/* Discapacidad */}
                    <Row className="mb-2">
                      <Col>
                        <Form.Check
                          type="checkbox"
                          label="¿Es una persona con discapacidad?"
                          checked={persona.discapacidad}
                          onChange={(e) => handleFamiliaChange(index, "discapacidad", e.target.checked)}
                        />
                      </Col>
                    </Row>
                    {persona.discapacidad && (
                      <Row className="mb-2">
                        <Col md={6}>
                          <Form.Control
                            placeholder="Tipo de discapacidad (motora, sensorial, mental)"
                            value={persona.tipoDiscapacidad}
                            onChange={(e) => handleFamiliaChange(index, "tipoDiscapacidad", e.target.value)}
                          />
                        </Col>
                      </Row>
                    )}
          </div>
        ))}
        <Button variant="primary" onClick={agregarIntegrante}>
          Agregar Integrante
        </Button>
      </Form>
    </div>
  );
};

export default GrupoFamiliarTab;
