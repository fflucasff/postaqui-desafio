// src/api/postaqui.ts

// Simulação de API - não precisa de axios aqui por enquanto

export const calculateShipping = async (payload: any) => {
  console.log('Simulando envio do payload para cálculo de frete:', payload);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    data: {
      id: 'frete123',       // <-- adicione esta linha!
      price: 42.50,
      deadline: 5
    }
  };
};


export const generateTrackingCode = async (carrier: string, id: string) => {
  console.log(`Simulando geração de código de rastreio para a transportadora ${carrier} com ID ${id}`);

  // Simula um pequeno delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Retorno fake de código de rastreamento
  return {
    data: {
      tracking_code: 'ABC123456789BR'
    }
  };
};
