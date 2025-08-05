// src/components/Formulario.jsx
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "bootstrap/dist/css/bootstrap.min.css";

// Importar componentes por pestaña
import PostulanteTab from "./PostulanteTab";
import ParejaTab from "./ParejaTab";
import InmuebleTab from "./InmuebleTab";
import CompromisoTab from "./CompromisoTab";
import GrupoFamiliarTab from "./GrupoFamiliarTab";
import SaludTab from "./SaludTab";
import IdentidadTab from "./IdentidadTab";
import DocumentosTab from "./DocumentosTab";
import MejorasTab from "./MejorasTab";

const Formulario = () => {
  const [datos, setDatos] = useState({
    postulante: {}, pareja: {}, inmueble: {}, compromiso: {},
    salud: {}, identidad: {}, documentos: {},
    mejoras: "", observaciones: ""
  });
  const [familia, setFamilia] = useState([]);
  const [activeTab, setActiveTab] = useState("postulante");

  const handleChange = (seccion, campo, valor) => {
    if (campo === null) {
      setDatos((prev) => ({ ...prev, [seccion]: valor }));
    } else {
      setDatos((prev) => ({
        ...prev,
        [seccion]: {
          ...prev[seccion],
          [campo]: valor,
        },
      }));
    }
  };

  const handleFamiliaChange = (index, campo, valor) => {
    const nuevaFamilia = [...familia];
    nuevaFamilia[index][campo] = valor;
    setFamilia(nuevaFamilia);
  };

  const agregarIntegrante = () => {
    setFamilia([...familia, {
      nombre: "", ci: "", edad: "", parentesco: "",
      escolaridad: "", ocupacion: ""
    }]);
  };

  const eliminarIntegrante = (index) => {
    const nuevaFamilia = familia.filter((_, i) => i !== index);
    setFamilia(nuevaFamilia);
  };

  const handleSubmit = async () => {
    /*const wb = XLSX.utils.book_new();
    const generalData = XLSX.utils.json_to_sheet([datos]);
    const familiaData = XLSX.utils.json_to_sheet(familia);
    XLSX.utils.book_append_sheet(wb, generalData, "Datos Generales");
    XLSX.utils.book_append_sheet(wb, familiaData, "Grupo Familiar");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "respuesta_formulario.xlsx");*/
    await fetch("http://localhost:3001/formulario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        datos,
        familia
      }),
    });
    console.log(datos)
    console.log(familia)
  };

  const tabs = [
    { key: "postulante", label: "Postulante", component: <PostulanteTab datos={datos} handleChange={handleChange} /> },
    { key: "pareja", label: "Pareja", component: <ParejaTab datos={datos} handleChange={handleChange} /> },
    { key: "inmueble", label: "Inmueble", component: <InmuebleTab datos={datos} handleChange={handleChange} /> },
    { key: "compromiso", label: "Compromiso", component: <CompromisoTab datos={datos} handleChange={handleChange} /> },
    { key: "familia", label: "Grupo Familiar", component: <GrupoFamiliarTab familia={familia} handleFamiliaChange={handleFamiliaChange} agregarIntegrante={agregarIntegrante} eliminarIntegrante={eliminarIntegrante} /> },
    { key: "salud", label: "Salud", component: <SaludTab datos={datos} handleChange={handleChange} /> },
    { key: "identidad", label: "Identidad", component: <IdentidadTab datos={datos} handleChange={handleChange} /> },
    { key: "documentos", label: "Documentos", component: <DocumentosTab datos={datos} handleChange={handleChange} /> },
    { key: "mejoras", label: "Mejoras y Observaciones", component: <MejorasTab datos={datos} handleChange={handleChange} /> },
  ];

  return (
    <div className="container my-5">
      <h2 className="text-primary mb-4">Formulario de Inscripción</h2>

      <ul className="nav nav-tabs mb-3">
        {tabs.map((tab) => (
          <li className="nav-item" key={tab.key}>
            <button
              className={`nav-link ${activeTab === tab.key ? "active" : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="tab-content p-3 border bg-white">
        {tabs.map((tab) => (
          <div
            key={tab.key}
            className={`tab-pane fade ${activeTab === tab.key ? "show active" : ""}`}
          >
            {tab.component}
          </div>
        ))}
      </div>

      <div className="d-grid mt-4">
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
          Guardar respuestas en Excel
        </button>
      </div>
    </div>
  );
};

export default Formulario;