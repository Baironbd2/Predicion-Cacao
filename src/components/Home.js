import React, { useState } from "react";
import img from "./images/inicio.png";
import "./home.css";

export default function Home () {
  const [isWavesCentered, setIsWavesCentered] = useState(false);

  const toggleWavesSize = () => {
    setIsWavesCentered((prevState) => !prevState);
  };
  return (
    <div>
      <section className="hero">
        <div
          className={`hero__waves ${isWavesCentered ? "is-centered" : ""}`}
        />
        <h1 className="hero__title">Modelo predictivo</h1>
        <img className="cacao" src={img} alt="Cacao" />
        <button className="hero__button" onClick={toggleWavesSize}>
          ¡Hey!
        </button>
      </section>
      <section className="content">
        <p className="content__paragraph">
          El cacao es considerado un rubro muy importante en el Ecuador, debido
          a que representa una fuente de ingresos favorable a la economía del
          país y esto se debe a su notable calidad del producto
        </p>
        <p className="content__paragraph">
          El problema que se genera en los cultivos es la presencia de la
          moniliasis que es una enfermedad fúngica que ataca el cultivo de cacao
          y está presente en la mayoría de los países latinoamericanos
        </p>
      </section>
    </div>
  );
};

