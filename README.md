# postaqui-desafio
# Mini Calculadora Postaqui 📦

Desenvolvido como parte do desafio técnico da empresa **Postaqui Logística**, esta aplicação visa calcular o valor de frete de uma encomenda com base em dados do remetente, destinatário e do pacote. O projeto utiliza React com TypeScript, respeita a estrutura de múltiplos steps (etapas) e faz consumo de API para cálculo do frete e rastreio.

---

## 🚀 Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/)
- [Zod](https://zod.dev/)
- [Vite + CSS Modules](https://vitejs.dev/guide/features.html)
- API [ViaCEP](https://viacep.com.br) (Autocompletar endereço via CEP)
- API [Postaqui Mock](https://f29faec4-6487-4b60-882f-383b4054cc32.mock.pstmn.io)

---

## 🧠 Conceitos Aplicados

- Hooks customizados (`useForm`)
- Context API para gerenciamento de estado entre etapas
- Máscaras de input (CPF, telefone, CEP)
- Validação de formulário com `zod`
- Validação de campos obrigatórios e mensagens de erro
- Estilização responsiva com CSS moderno
- Boas práticas de UX (botão "Preencher com Exemplo", loading, mensagens de erro, acessibilidade)

---

## 📦 Funcionalidades

### 📝 Step 1 - Remetente
- Preenchimento com máscara e validação
- Busca automática de endereço via CEP
- Validação com Zod
- Botão "Preencher com Exemplo"

### 📥 Step 2 - Destinatário
- Funcionalidades idênticas ao Step 1, exibindo dados do Step 1 no topo

### 📦 Step 3 - Informações do Pacote
- Campos de descrição, dimensões, valor declarado, e adicionais (AR, Logística Reversa, Mãos Próprias)
- Validação mínima de 10 caracteres na descrição
- Envio dos dados para cálculo de frete via API da Postaqui

### 💰 Step 4 - Resultados de Frete
- Listagem de opções de frete com transportadoras, valor e desconto

### 📬 Step 5 - Código de Rastreamento
- Após seleção da transportadora, exibe o código de rastreio gerado pela API

---

## 🔄 Ciclo da Aplicação

1. Usuário inicia na tela inicial e clica em "Calcular Frete"
2. Preenche as etapas obrigatórias (remetente, destinatário, pacote)
3. A aplicação envia os dados para a API `/shipping_calculate`
4. Após escolha de frete, envia para `/posting?carrier={CARRIER}`
5. Exibe código de rastreamento

---

## 📁 Como rodar localmente

``bash
# Clone o repositório
git clone https://github.com/fflucasff/postaqui-desafio.git

# Acesse a pasta do projeto
cd postaqui-desafio

# Instale as dependências
npm install

# Rode a aplicação
npm run dev

📂 Estrutura de Pastas
arduino
Copiar
Editar
postaqui-desafio/
│
├── public/
├── src/
│   ├── api/
│   ├── components/
│   ├── contexts/
│   ├── styles/
│   ├── utils/
│   └── main.tsx
├── .gitignore
├── index.html
├── vite.config.ts
└── README.md

✅ Checklist dos Requisitos
 React + TypeScript

 Context API

 Axios

 Custom Hook

 Step 1 a Step 5 funcionando

 Consumo da API de frete real

 Validações com Zod

 Máscara de inputs (CPF, telefone, CEP)

 Busca de endereço via CEP

 Código limpo, reutilizável e comentado

 Estilo moderno e responsivo

 README documentado

📌 Observações
A pasta node_modules está devidamente ignorada pelo .gitignore

A estrutura segue uma lógica modular para facilitar manutenção e escalabilidade

Os dados de API são mockados, portanto não representam preços reais

👨‍💻 Autor
Lucas Figueiredo Fernandes
GitHub | LinkedIn

📝 Licença
Este projeto está sob a licença MIT.
