import { useForm } from '../contexts/FormContext';
import { useState, useEffect } from 'react';
import { z } from 'zod';
import { maskCPF, maskPhone, maskCEP } from '../utils/masks';
import '../styles/Layout.css';

const step1Schema = z.object({
  fullname: z.string().min(1, 'Nome é obrigatório'),
  cpf: z.string().min(14, 'CPF inválido'),
  phone: z.string().min(14, 'Telefone inválido'),
  email: z.string().email('Email inválido'),
  address: z.object({
    cep: z.string().min(9, 'CEP inválido'),
    state: z.string().min(2, 'Estado obrigatório'),
    uf: z.string().length(2, 'UF inválido'),
    city: z.string().min(1, 'Cidade obrigatória'),
    neighborhood: z.string().min(1, 'Bairro obrigatório'),
    street: z.string().min(1, 'Rua obrigatória'),
    number: z.string().min(1, 'Número obrigatório'),
    complement: z.string().optional(),
  }),
});

interface Props {
  onNext: () => void;
}

const Step1 = ({ onNext }: Props) => {
  const { form, setForm } = useForm();
  const [data, setData] = useState(form.sender);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const preencherExemplo = () => {
    const exemplo = {
      fullname: 'João da Silva',
      cpf: '123.456.789-00',
      phone: '(11) 98765-4321',
      email: 'joao@email.com',
      address: {
        cep: '01001-000',
        state: 'SP',
        uf: 'SP',
        city: 'São Paulo',
        neighborhood: 'Centro',
        street: 'Praça da Sé',
        number: '100',
        complement: 'Sala 3',
      },
    };
    setData(exemplo);
  };

  const fetchAddress = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, '');
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

  const handleChange = (field: keyof typeof data, value: string) => {
    if (field === 'cpf') value = maskCPF(value);
    if (field === 'phone') value = maskPhone(value);
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (field: keyof typeof data.address, value: string) => {
    if (field === 'cep') value = maskCEP(value);
    setData((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }));
  };

  useEffect(() => {
    if (data.address.cep?.length === 9) {
      fetchAddress(data.address.cep);
    }
  }, [data.address.cep]);

  const handleNext = () => {
    const result = step1Schema.safeParse(data);
    if (result.success) {
      setForm((prev) => ({ ...prev, sender: data }));
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

  return (
    <div className="step-container">
      <button className="example-button" onClick={preencherExemplo}>Preencher com Exemplo</button>
      <h2>Informações do Remetente</h2>
      <p style={{ fontStyle: 'italic', color: '#444' }}>* Todos os campos são obrigatórios.</p>

      <input
        placeholder="* Nome completo"
        value={data.fullname}
        onChange={(e) => handleChange('fullname', e.target.value)}
      />
      {errors.fullname && <p style={{ color: 'red' }}>{errors.fullname}</p>}

      <input placeholder="* CPF" value={data.cpf} onChange={(e) => handleChange('cpf', e.target.value)} />
      {errors.cpf && <p style={{ color: 'red' }}>{errors.cpf}</p>}

      <input placeholder="* Telefone" value={data.phone} onChange={(e) => handleChange('phone', e.target.value)} />
      {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}

      <input placeholder="* Email" value={data.email} onChange={(e) => handleChange('email', e.target.value)} />
      {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

      <hr />
      <h3>Endereço</h3>

      <input
        placeholder="* CEP"
        value={data.address.cep || ''}
        onChange={(e) => handleAddressChange('cep', e.target.value)}
      />
      {errors.cep && <p style={{ color: 'red' }}>{errors.cep}</p>}

      <input
        placeholder="* Estado"
        value={data.address.state || ''}
        onChange={(e) => handleAddressChange('state', e.target.value)}
      />
      {errors.state && <p style={{ color: 'red' }}>{errors.state}</p>}

      <input
        placeholder="* UF"
        value={data.address.uf || ''}
        onChange={(e) => handleAddressChange('uf', e.target.value)}
      />
      {errors.uf && <p style={{ color: 'red' }}>{errors.uf}</p>}

      <input
        placeholder="* Cidade"
        value={data.address.city || ''}
        onChange={(e) => handleAddressChange('city', e.target.value)}
      />
      {errors.city && <p style={{ color: 'red' }}>{errors.city}</p>}

      <input
        placeholder="* Bairro"
        value={data.address.neighborhood || ''}
        onChange={(e) => handleAddressChange('neighborhood', e.target.value)}
      />
      {errors.neighborhood && <p style={{ color: 'red' }}>{errors.neighborhood}</p>}

      <input
        placeholder="* Rua"
        value={data.address.street || ''}
        onChange={(e) => handleAddressChange('street', e.target.value)}
      />
      {errors.street && <p style={{ color: 'red' }}>{errors.street}</p>}

      <input
        placeholder="* Número"
        value={data.address.number || ''}
        onChange={(e) => handleAddressChange('number', e.target.value)}
      />
      {errors.number && <p style={{ color: 'red' }}>{errors.number}</p>}

      <input
        placeholder="Complemento (opcional)"
        value={data.address.complement || ''}
        onChange={(e) => handleAddressChange('complement', e.target.value)}
      />

      <button onClick={handleNext}>Próximo</button>
    </div>
  );
};

export default Step1;
