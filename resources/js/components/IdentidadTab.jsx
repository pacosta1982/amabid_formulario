// src/components/IdentidadTab.jsx
import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const IdentidadTab = ({ datos, handleChange }) => {
  return (
    <div className="p-3 border rounded bg-white">
      <h5 className="mb-3">5. Multiculturalidad e Identidad</h5>
      <Form>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Select
              value={datos.grupoEtnico}
              onChange={(e) => handleChange("identidad", "grupoEtnico", e.target.value)}
            >
              <option value="">¿Cómo te autoidentificás según tu grupo étnico?</option>
              <option value="mestizo">Mestizo</option>
              <option value="afrodescendiente">Afrodescendiente</option>
              <option value="indigena">Pueblo indígena</option>
              <option value="caucasica">Caucásica (blanca)</option>
              <option value="otro">Otro</option>
            </Form.Select>
          </Col>
          {datos.grupoEtnico === "otro" && (
            <Col md={6}>
              <Form.Control
                placeholder="Especifique otro grupo étnico"
                onChange={(e) => handleChange("identidad", "grupoEtnicoOtro", e.target.value)}
              />
            </Col>
          )}
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Select
              value={datos.genero}
              onChange={(e) => handleChange("identidad", "genero", e.target.value)}
            >
              <option value="">¿Cómo te autoidentificás según tu género?</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="noBinario">No binario</option>
              <option value="otro">Otro</option>
              <option value="prefiereNoDecir">Prefiero no decirlo</option>
            </Form.Select>
          </Col>
          {datos.genero === "otro" && (
            <Col md={6}>
              <Form.Control
                placeholder="Especifique otro género"
                onChange={(e) => handleChange("identidad", "generoOtro", e.target.value)}
              />
            </Col>
          )}
        </Row>
      </Form>
    </div>
  );
};

export default IdentidadTab;
