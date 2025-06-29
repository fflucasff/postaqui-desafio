import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

// Tipagens
interface Address {
  cep: string;
  state: string;
  uf: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  complement?: string;
}

interface Person {
  fullname: string;
  cpf: string;
  phone: string;
  email: string;
  address: Address;
}

interface PackageInfo {
  weight: string;
  height: string;
  width: string;
  length: string;
  reverse: boolean;
  ar: boolean;
  own_hands: boolean;
  information: {
    amount: string;
    quantity: string;
    description: string;
  };
}

interface FreightResult {
  price: number;
  deadline?: number; // API não fornece prazo, opcional
  carrier: string;
  shipmentId: string;
}

interface FormData {
  sender: Person;
  receiver: Person;
  package?: PackageInfo;
  freightResult?: FreightResult | null;
  trackingCode?: string;
}

interface FormContextType {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  calculateFreight: () => Promise<void>;
  postShipment: () => Promise<void>;
  resetForm: () => void;
}

const defaultForm: FormData = {
  sender: {
    fullname: "",
    cpf: "",
    phone: "",
    email: "",
    address: {
      cep: "",
      state: "",
      uf: "",
      city: "",
      neighborhood: "",
      street: "",
      number: "",
      complement: "",
    },
  },
  receiver: {
    fullname: "",
    cpf: "",
    phone: "",
    email: "",
    address: {
      cep: "",
      state: "",
      uf: "",
      city: "",
      neighborhood: "",
      street: "",
      number: "",
      complement: "",
    },
  },
  package: undefined,
  freightResult: null,
  trackingCode: "",
};

const FormContext = createContext<FormContextType | undefined>(undefined);

const api = axios.create({
  baseURL: "https://f29faec4-6487-4b60-882f-383b4054cc32.mock.pstmn.io",
  headers: {
    "Content-Type": "application/json",
  },
});

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [form, setForm] = useState<FormData>(defaultForm);

  // Função para calcular frete
  async function calculateFreight() {
    if (!form.package) throw new Error("Pacote não preenchido");
    try {
      const response = await api.post<{
        shipment: {
          _id: string;
          carrier: string;
          price: number;
          discount: number;
        }[];
      }>("/shipping_calculate", {
        sender: form.sender,
        receiver: form.receiver,
        package: form.package,
      });

      if (!response.data.shipment.length)
        throw new Error("Nenhum frete retornado");

      // Pega o primeiro frete (você pode permitir escolher)
      const frete = response.data.shipment[0];

      setForm((prev) => ({
        ...prev,
        freightResult: {
          price: frete.price,
          carrier: frete.carrier,
          shipmentId: frete._id,
          deadline: 5, // Ajuste se tiver info real
        },
      }));
    } catch (error) {
      console.error("Erro ao calcular frete", error);
      setForm((prev) => ({
        ...prev,
        freightResult: null,
        trackingCode: "",
      }));
      throw error;
    }
  }

  // Função para postar e obter código de rastreio
  async function postShipment() {
    if (!form.freightResult) throw new Error("Frete não calculado");

    // Mapeia nome da transportadora para o formato da API
    const carrierMap: Record<string, string> = {
      "Correios Pac": "CORREIOS",
      "Correios Sedex": "CORREIOS",
      "Jadlog Express": "JADLOG",
      "Jadlog Package": "JADLOG",
      "Azul Cargo": "AZUL_CARGO",
    };

    const carrierApi = carrierMap[form.freightResult.carrier] || "CORREIOS";

    try {
      const response = await api.post<{ code: string }>(
        `/posting?carrier=${carrierApi}`,
        {
          calculated_id: form.freightResult.shipmentId,
        }
      );

      setForm((prev) => ({
        ...prev,
        trackingCode: response.data.code,
      }));
    } catch (error) {
      console.error("Erro ao gerar código de rastreio", error);
      setForm((prev) => ({
        ...prev,
        trackingCode: "",
      }));
      throw error;
    }
  }

  function resetForm() {
    setForm(defaultForm);
  }

  return (
    <FormContext.Provider
      value={{ form, setForm, calculateFreight, postShipment, resetForm }}
    >
      {children}
    </FormContext.Provider>
  );
};

export function useForm() {
  const context = useContext(FormContext);
  if (!context)
    throw new Error("useForm deve ser usado dentro de um FormProvider");
  return context;
}
