export const maskCPF = (value: string) => {
  const clean = value.replace(/\D/g, '').slice(0, 11);
  return clean.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

export const maskPhone = (value: string) => {
  const clean = value.replace(/\D/g, '').slice(0, 11);
  return clean.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
};

export const maskCEP = (value: string) => {
  const clean = value.replace(/\D/g, '').slice(0, 8);
  return clean.replace(/(\d{5})(\d{3})/, '$1-$2');
};
