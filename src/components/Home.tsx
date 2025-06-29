import React from "react";

interface Props {
  onStart: () => void;
}

export default function Home({ onStart }: Props) {
  return (
    <div className="container">
      <h1>Bem-vindo à Postaqui Logística</h1>
      <p>
        Frete internacional e nacional mais barato é aqui!
      </p>
      <p>
        Faça sua cotação de frete com a Postaqui Logística e descubra como é
        fácil e rápido enviar suas encomendas.
        Calculadora com cotação simultânea, desconto de até 80% e coleta grátis.
      </p>
      <p>
        Informe seus dados e obtenha a melhor cotação para sua entrega, sem
        complicações!
      </p>
      <button onClick={onStart}>Calcular Frete</button>
    </div>
  );
}
