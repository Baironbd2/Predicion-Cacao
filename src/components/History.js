import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const URL = process.env.REACT_APP_URL;

export default function Historial() {
  const [predictionData, setPredictionData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    if (navigator.onLine) {
      const response = await fetch(`${URL}/api/allpredict`);
      const data = await response.json();
      setPredictionData(data);
      localStorage.setItem("offlineDatadt", JSON.stringify(data)); 
    } else {
      const offlineDatadt = JSON.parse(
        localStorage.getItem("offlineDatadt") || "[]"
      );
      setPredictionData(offlineDatadt);
    }
  };
  const columns = [
    {
      name: "Rain",
      selector: (fila) => fila.Rain,
      sortable: true,
    },
    {
      name: "Temperature",
      selector: (fila) => fila.Temperature,
      sortable: true,
    },
    {
      name: "RH",
      selector: (fila) => fila.RH,
      sortable: true,
    },
    {
      name: "Dew Point",
      selector: (fila) => fila.Dew_Point,
      sortable: true,
    },
    {
      name: "Wind Speed",
      selector: (fila) => fila.Wind_Speed,
      sortable: true,
    },
    {
      name: "Gust Speed",
      selector: (fila) => fila.Gust_Speed,
      sortable: true,
    },
    {
      name: "Wind Direction",
      selector: (fila) => fila.Wind_Direction,
      sortable: true,
    },
    {
      name: "Planta",
      selector: (fila) => fila.planta,
      sortable: true,
    },
    {
      name: "Fruto",
      selector: (fila) => fila.fruto,
      sortable: true,
    },
    {
      name: "Severidad",
      selector: (fila) => fila.severidad,
      sortable: true,
    },
    {
      name: "Incidencia",
      selector: (fila) => fila.incidencia,
      sortable: true,
    },
  ];

  return (
    <section className="page-section" id="Busqueda">
      <div className="containerdata">
        <div className="text-center">
          <h2 className="section-heading text-uppercase">Búsqueda</h2>
          <h3 className="section-subheading text-muted">
            Consulta una predicción realizada
          </h3>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <div className="tile-body">
                <DataTable
                  title=""
                  columns={columns}
                  data={predictionData}
                  pagination
                  searchable
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
