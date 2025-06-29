import React, { useState } from "react";
import { FormProvider } from "./contexts/FormContext";
import Home from "./components/Home";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import Step5 from "./components/Step5";
import "../styles/Layout.css";

export default function App() {
  const [step, setStep] = useState(0); // 0=Home, 1..5=Steps

  function goToStep(stepNumber: number) {
    setStep(stepNumber);
  }

  return (
    <FormProvider>
      {step === 0 && <Home onStart={() => goToStep(1)} />}
      {step === 1 && <Step1 onNext={() => goToStep(2)} />}
      {step === 2 && <Step2 onNext={() => goToStep(3)} onBack={() => goToStep(1)} />}
      {step === 3 && <Step3 onNext={() => goToStep(4)} onBack={() => goToStep(2)} />}
      {step === 4 && <Step4 onNext={() => goToStep(5)} onBack={() => goToStep(3)} />}
      {step === 5 && <Step5 onRestart={() => goToStep(0)} />}
    </FormProvider>
  );
}
