import React from "react";

interface Props {
  onStart: () => void;
}

export default function Home({ onStart }: Props) {
  return (
    <div className="container">
      <h1>Bem-vindo à Postaqui Logística</h1>
      <p>
        Simplifique o cálculo do seu frete com nossa mini calculadora rápida e
        eficiente.
      </p>
      <p>
        Informe seus dados e obtenha a melhor cotação para sua entrega, sem
        complicações!
      </p>
      <button onClick={onStart}>Calcular Frete</button>
    </div>
  );
}
