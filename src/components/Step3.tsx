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
  const [localError, setLocalError] = useState("");

  const pkg = form.package || {
    weight: "",
    height: "",
    width: "",
    length: "",
    reverse: false,
    ar: false,
    own_hands: false,
    information: {
      amount: "",
      quantity: "",
      description: "",
    },
  };

  const handleChange = (field: keyof typeof pkg, value: string | boolean) => {
    setForm((prev) => ({
      ...prev,
      package: {
        ...pkg,
        [field]: value,
        information: { ...pkg.information },
      },
    }));
  };

  const handleInfoChange = (field: keyof typeof pkg.information, value: string) => {
    setForm((prev) => ({
      ...prev,
      package: {
        ...pkg,
        information: {
          ...pkg.information,
          [field]: value,
        },
      },
    }));
  };

  async function handleNext() {
    setError("");
    setLocalError("");

    if (!pkg.information.description || pkg.information.description.length < 10) {
      setLocalError("A descrição deve ter no mínimo 10 caracteres.");
      return;
    }

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

  return (
    <div className="step-container">
      <h2>Informações da Correspondência</h2>

      <label htmlFor="description">* Descrição (mínimo 10 caracteres):</label>
      <textarea
        id="description"
        placeholder="Ex: Livros, documentos, eletrônicos..."
        value={pkg.information.description}
        onChange={(e) => handleInfoChange("description", e.target.value)}
      />
      {localError && <p className="error">{localError}</p>}

      <label htmlFor="amount">Valor Declarado (R$):</label>
      <input
        id="amount"
        type="number"
        placeholder="Ex: 150.00"
        value={pkg.information.amount}
        onChange={(e) => handleInfoChange("amount", e.target.value)}
      />

      <label htmlFor="quantity">Quantidade:</label>
      <input
        id="quantity"
        type="number"
        placeholder="Ex: 2"
        value={pkg.information.quantity}
        onChange={(e) => handleInfoChange("quantity", e.target.value)}
      />

      <label htmlFor="weight">Peso (kg):</label>
      <input
        id="weight"
        type="number"
        placeholder="Ex: 1.5"
        value={pkg.weight}
        onChange={(e) => handleChange("weight", e.target.value)}
      />

      <label htmlFor="height">Altura (cm):</label>
      <input
        id="height"
        type="number"
        placeholder="Ex: 20"
        value={pkg.height}
        onChange={(e) => handleChange("height", e.target.value)}
      />

      <label htmlFor="width">Largura (cm):</label>
      <input
        id="width"
        type="number"
        placeholder="Ex: 15"
        value={pkg.width}
        onChange={(e) => handleChange("width", e.target.value)}
      />

      <label htmlFor="length">Comprimento (cm):</label>
      <input
        id="length"
        type="number"
        placeholder="Ex: 30"
        value={pkg.length}
        onChange={(e) => handleChange("length", e.target.value)}
      />

      <label>
        <input
          type="checkbox"
          checked={pkg.reverse}
          onChange={(e) => handleChange("reverse", e.target.checked)}
        />
        Logística Reversa
      </label>

      <label>
        <input
          type="checkbox"
          checked={pkg.ar}
          onChange={(e) => handleChange("ar", e.target.checked)}
        />
        Aviso de Recebimento (AR)
      </label>

      <label>
        <input
          type="checkbox"
          checked={pkg.own_hands}
          onChange={(e) => handleChange("own_hands", e.target.checked)}
        />
        Mãos Próprias
      </label>

      {error && <p className="error">{error}</p>}

      <div className="buttons">
        <button onClick={onBack}>Voltar</button>
        <button disabled={loading} onClick={handleNext}>
          {loading ? "Calculando..." : "Calcular Frete"}
        </button>
      </div>
    </div>
  );
}
