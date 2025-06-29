import { useForm } from "../contexts/FormContext";
import { useState, useEffect } from "react";
import { z } from "zod";
import { maskCPF, maskPhone, maskCEP } from "../utils/masks";
import "./Step.css";

const step2Schema = z.object({
  fullname: z.string().min(1, "Nome é obrigatório"),
  cpf: z.string().min(14, "CPF inválido"),
  phone: z.string().min(14, "Telefone inválido"),
  email: z.string().email("Email inválido"),
  address: z.object({
    cep: z.string().min(9, "CEP inválido"),
    state: z.string().min(2, "Estado obrigatório"),
    uf: z.string().length(2, "UF inválido"),
    city: z.string().min(1, "Cidade obrigatória"),
    neighborhood: z.string().min(1, "Bairro obrigatório"),
    street: z.string().min(1, "Rua obrigatória"),
    number: z.string().min(1, "Número obrigatório"),
    complement: z.string().optional(),
  }),
});

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const Step2 = ({ onNext, onBack }: Props) => {
  const { form, setForm } = useForm();
  const [data, setData] = useState(form.receiver);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fetchAddress = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, "");
    if (cleanCep.length !== 8) return;
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const json = await res.json();
      if (!json.erro) {
        setData((prev) => ({
          ...prev,
          address: {
            ...prev.address,
            state: json.uf,
            uf: json.uf,
            city: json.localidade,
            neighborhood: json.bairro,
            street: json.logradouro,
          },
        }));
      }
    } catch {
      // erro ignorado
    }
  };

  useEffect(() => {
    if (data.address.cep?.length === 9) {
      fetchAddress(data.address.cep);
    }
  }, [data.address.cep]);

  const handleChange = (field: keyof typeof data, value: string) => {
    if (field === "cpf") value = maskCPF(value);
    if (field === "phone") value = maskPhone(value);
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (field: keyof typeof data.address, value: string) => {
    if (field === "cep") value = maskCEP(value);
    setData((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }));
  };

  const handleNext = () => {
    const result = step2Schema.safeParse(data);
    if (result.success) {
      setForm((prev) => ({ ...prev, receiver: data }));
      setErrors({});
      onNext();
    } else {
      const fieldErrors = result.error.flatten().fieldErrors;
      const newErrors: Record<string, string> = {};
      Object.entries(fieldErrors).forEach(([key, val]) => {
        if (val && val.length > 0) newErrors[key] = val[0];
      });
      setErrors(newErrors);
    }
  };

  const fillExample = () => {
    const example = {
      fullname: "Maria Oliveira",
      cpf: "987.654.321-00",
      phone: "(21) 98765-4321",
      email: "maria.oliveira@email.com",
      address: {
        cep: "20040-020",
        state: "RJ",
        uf: "RJ",
        city: "Rio de Janeiro",
        neighborhood: "Centro",
        street: "Rua da Alfândega",
        number: "100",
        complement: "Ap 202",
      },
    };
    setData(example);
  };

  return (
    <div className="step-container">
      <h2>Destinatário</h2>
      <p className="note">* Campos obrigatórios</p>
      <button className="fill-btn" onClick={fillExample}>Preencher com exemplo</button>

      <input placeholder="Nome completo*" value={data.fullname} onChange={(e) => handleChange("fullname", e.target.value)} />
      {errors.fullname && <p className="error">{errors.fullname}</p>}

      <input placeholder="CPF*" value={data.cpf} onChange={(e) => handleChange("cpf", e.target.value)} />
      {errors.cpf && <p className="error">{errors.cpf}</p>}

      <input placeholder="Telefone*" value={data.phone} onChange={(e) => handleChange("phone", e.target.value)} />
      {errors.phone && <p className="error">{errors.phone}</p>}

      <input placeholder="Email*" value={data.email} onChange={(e) => handleChange("email", e.target.value)} />
      {errors.email && <p className="error">{errors.email}</p>}

      <hr />
      <h3>Endereço</h3>

      <input placeholder="CEP*" value={data.address.cep || ""} onChange={(e) => handleAddressChange("cep", e.target.value)} />
      <input placeholder="Estado*" value={data.address.state || ""} onChange={(e) => handleAddressChange("state", e.target.value)} />
      <input placeholder="UF*" value={data.address.uf || ""} onChange={(e) => handleAddressChange("uf", e.target.value)} />
      <input placeholder="Cidade*" value={data.address.city || ""} onChange={(e) => handleAddressChange("city", e.target.value)} />
      <input placeholder="Bairro*" value={data.address.neighborhood || ""} onChange={(e) => handleAddressChange("neighborhood", e.target.value)} />
      <input placeholder="Rua*" value={data.address.street || ""} onChange={(e) => handleAddressChange("street", e.target.value)} />
      <input placeholder="Número*" value={data.address.number || ""} onChange={(e) => handleAddressChange("number", e.target.value)} />
      <input placeholder="Complemento" value={data.address.complement || ""} onChange={(e) => handleAddressChange("complement", e.target.value)} />

      <div className="buttons">
        <button onClick={onBack}>Voltar</button>
        <button onClick={handleNext}>Próximo</button>
      </div>
    </div>
  );
};

export default Step2;
