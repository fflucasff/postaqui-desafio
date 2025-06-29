import React, { useState } from "react";
import { useForm } from "../contexts/FormContext";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function Step3({ onNext, onBack }: Props) {
  const { form, setForm, calculateFreight } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleNext() {
    setError("");
    setLoading(true);

    try {
      await calculateFreight();
      onNext();
    } catch (err) {
      setError("Erro ao calcular o frete. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  // Exemplo de campo descrição e pacote — adapte os campos conforme seu projeto
  return (
    <div className="container">
      <h2>Informações da Correspondência</h2>
      <label>Descrição (mínimo 10 caracteres):</label>
      <textarea
        value={form.package?.information.description || ""}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            package: {
              ...prev.package!,
              information: {
                ...prev.package!.information,
                description: e.target.value,
              },
            },
          }))
        }
      />
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button disabled={loading} onClick={handleNext}>
        {loading ? "Calculando..." : "Calcular Frete"}
      </button>

      <button onClick={onBack}>Voltar</button>
    </div>
  );
}
