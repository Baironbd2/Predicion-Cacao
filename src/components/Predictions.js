import React, { useState, useEffect } from "react";
import { getData } from "../middleware/GetData";

import "./predictions.css";

const URL = process.env.REACT_APP_URL;

export default function Predictions() {
  const [PLANTA, setPLANTA] = useState(0);
  const [FRUTO, setFRUTO] = useState(0);
  const [SEVERIDAD, setSEVERIDAD] = useState(0);
  const [data, setData] = useState([]);
  const [description, setDescritcion] = useState("");
  const [offlineData, setOfflineData] = useState({}); 

  useEffect(() => {
    const fetchData = async () => {
      const datos = await getData();
      setOfflineData(datos);
      setData(datos);
    };
    fetchData();
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (navigator.onLine) {
      const res = await fetch(`${URL}/api/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          PLANTA,
          FRUTO,
          SEVERIDAD,
          Date: offlineData.Date,
          Dew_Point: offlineData.Dew_Point,
          Gust_Speed: offlineData.Gust_Speed,
          RH: offlineData.RH,
          Rain: offlineData.Rain,
          Temperature: offlineData.Temperature,
          Wind_Direction: offlineData.Wind_Direction,
          Wind_Speed: offlineData.Wind_Speed,
          _id: offlineData._id,
        }),
      });
      const responseData = await res.json();
      setDescritcion(responseData);
      console.log(description);
    } else {
      const offlineDataManual = JSON.parse(
        localStorage.getItem("offlineDataManual") || "[]"
      );
      offlineDataManual.push({
        PLANTA,
        FRUTO,
        SEVERIDAD,
        Date: offlineData.Date,
        Dew_Point: offlineData.Dew_Point,
        Gust_Speed: offlineData.Gust_Speed,
        RH: offlineData.RH,
        Rain: offlineData.Rain,
        Temperature: offlineData.Temperature,
        Wind_Direction: offlineData.Wind_Direction,
        Wind_Speed: offlineData.Wind_Speed,
        _id: offlineData._id,
      });
      localStorage.setItem(
        "offlineDataManual",
        JSON.stringify(offlineDataManual)
      );
    }
  };

  const handleButtonClick = (e) => {
    handleSubmit(e);
  };

  // const syncOfflineData = async () => {
  //   if (navigator.onLine) {
  //     const offlineDataManual = JSON.parse(
  //       localStorage.getItem("offlineDataManual") || "[]"
  //     );
  //     for (const item of offlineDataManual) {
  //       const res = await fetch(`${URL}/api/dat/${item._id}`, {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           PLANTA: item.PLANTA,
  //           FRUTO: item.FRUTO,
  //           INCIDENCIA: item.INCIDENCIA,
  //           SEVERIDAD: item.SEVERIDAD,
  //         }),
  //       });
  //       const responseData = await res.json();
  //       console.log(responseData);
  //     }
  //     localStorage.removeItem("offlineDataManual");
  //   } else {
  //     const offlineData = JSON.parse(
  //       localStorage.getItem("offlineData") || "[]"
  //     );
  //     setData(offlineData);
  //   }
  // };
  // const getData = async () => {
  //   if (navigator.onLine) {
  //     const res = await fetch(`${URL}/api/all`);
  //     const responseJson = await res.json();
  //     const datos = responseJson[0];
  //     setData(datos);
  //     localStorage.setItem("offlineData", JSON.stringify(datos));

  //   } else {
  //     const offlineData = JSON.parse(
  //       localStorage.getItem("offlineData") || "[]"
  //     );
  //     setData(offlineData);
  //   }
  // };
  // useEffect(() => {
  //   getData();
  //   syncOfflineData(); 
  // }, []);

  let roundrain = 0;
  let roundtemp = 0;
  let roundrh = 0;
  let roundDePo = 0;
  let roundWiSp = 0;
  let roundGuSp = 0;
  let roundWiDi = 0;

  if (data && data.Temperature) {
    roundtemp = data.Temperature.toFixed(2);
    roundrh = data.RH.toFixed(2);
    roundDePo = data.Dew_Point.toFixed(2);
    roundWiSp = data.Wind_Speed.toFixed(2);
    roundGuSp = data.Gust_Speed.toFixed(2);
    roundWiDi = data.Wind_Direction.toFixed(2);
  }
  if (data && data.Rain) {
    roundrain = data.Rain.toFixed(2);
  }

  return (
    <div>
      <div>
        <div className="'pricing">
          <div className="card-conteiner">
            <div className="datos-card">
              <h3>Lluvia</h3>
              <samp className="bar"></samp>
              <p className="btc">{roundrain}</p>
            </div>
            <div className="datos-card">
              <h3>Temperatura</h3>
              <samp className="bar"></samp>
              <p className="btc">{roundtemp}</p>
            </div>
            <div className="datos-card">
              <h3>RH</h3>
              <samp className="bar"></samp>
              <p className="btc">{roundrh}</p>
            </div>
            <div className="datos-card">
              <h3>Punto de rocío</h3>
              <samp className="bar"></samp>
              <p className="btc">{roundDePo}</p>
            </div>
            <div className="datos-card">
              <h3>Velocidad del viento</h3>
              <samp className="bar"></samp>
              <p className="btc">{roundWiSp}</p>
            </div>
            <div className="datos-card">
              <h3>Velocidad de Ráfaga</h3>
              <samp className="bar"></samp>
              <p className="btc">{roundGuSp}</p>
            </div>
            <div className="datos-card">
              <h3>Dirección del viento</h3>
              <samp className="bar"></samp>
              <p className="btc">{roundWiDi}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="cardform">
        <form
          className="form-horizontal"
          onSubmit={(e) => handleSubmit(e, data._id)}
        >
          <div className="card-body">
            <h4 className="card-title">Caracteristicas de la Planta</h4>
            <div className="form-group row">
              <label type="text" className="planta">
                Planta
              </label>
              <div className="col-sm-6">
                <input
                  required
                  type="text"
                  className="form-control"
                  value={PLANTA}
                  onChange={(e) => setPLANTA(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group row">
              <label type="text" className="col-sm-3">
                Fruto
              </label>
              <div className="col-sm-6">
                <input
                  required
                  type="text"
                  className="form-control"
                  value={FRUTO}
                  onChange={(e) => setFRUTO(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group row">
              <label type="text">Severidad</label>
              <div className="col-sm-6">
                <input
                  required
                  type="text"
                  className="form-control"
                  value={SEVERIDAD}
                  onChange={(e) => setSEVERIDAD(e.target.value)}
                />
              </div>
            </div>
            <h4 className="card-title">Resultados</h4>
            <div className="form-group row">
              <label htmlFor="cono1" className="col-sm-3">
                Descripcion
              </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control"
                  defaultValue={description}
                  readOnly
                  style={{ textAlign: "center" }}
                />
              </div>
            </div>
          </div>
          <div className="border-top">
            <div className="card-body">
              <button className="btn" onClick={handleButtonClick}>
                Predecir
              </button>
            </div>
          </div>
        </form>
      </div>
      <br />
    </div>
  );
}
