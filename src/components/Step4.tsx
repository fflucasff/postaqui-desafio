import React, { useState } from "react";
import { useForm } from "../contexts/FormContext";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function Step4({ onNext, onBack }: Props) {
  const { form, postShipment } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handlePost() {
    setError("");
    setLoading(true);

    try {
      await postShipment();
      onNext();
    } catch {
      setError("Erro ao gerar código de rastreio. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (!form.freightResult)
    return (
      <div className="container">
        <p>Não há frete calculado.</p>
        <button onClick={onBack}>Voltar</button>
      </div>
    );

  return (
    <div className="container">
      <h2>Resultado do Frete</h2>
      <p>
        <strong>Transportadora:</strong> {form.freightResult.carrier}
      </p>
      <p>
        <strong>Valor:</strong> R$ {form.freightResult.price.toFixed(2)}
      </p>
      <p>
        <strong>Prazo:</strong> {form.freightResult.deadline ?? "Indefinido"} dias úteis
      </p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button disabled={loading} onClick={handlePost}>
        {loading ? "Gerando código..." : "Postar e Gerar Código de Rastreio"}
      </button>
      <button onClick={onBack}>Voltar</button>
    </div>
  );
}
