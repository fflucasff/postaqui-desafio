import React from "react";
import { useForm } from "../contexts/FormContext";

interface Props {
  onRestart: () => void;
}

export default function Step5({ onRestart }: Props) {
  const { form, resetForm } = useForm();

  function handleRestart() {
    resetForm();
    onRestart();
  }

  return (
    <div className="container">
      <h2>Resumo do Pedido</h2>

      <p>
        <strong>Remetente:</strong> {form.sender.fullname}
      </p>
      <p>
        <strong>Destinatário:</strong> {form.receiver.fullname}
      </p>
      <p>
        <strong>Descrição do Pacote:</strong>{" "}
        {form.package?.information.description}
      </p>

      {form.freightResult ? (
        <>
          <p>
            <strong>Transportadora:</strong> {form.freightResult.carrier}
          </p>
          <p>
            <strong>Valor do frete:</strong>{" "}
            R$ {form.freightResult.price.toFixed(2)}
          </p>
          <p>
            <strong>Prazo de entrega:</strong>{" "}
            {form.freightResult.deadline ?? "Indefinido"} dias úteis
          </p>
        </>
      ) : (
        <p style={{ color: "red" }}>Frete não calculado.</p>
      )}

      {form.trackingCode ? (
        <p>
          <strong>Código de rastreio:</strong> {form.trackingCode}
        </p>
      ) : (
        <p style={{ color: "red" }}>Código de rastreio não gerado.</p>
      )}

      <button onClick={handleRestart}>Nova Postagem</button>
    </div>
  );
}
