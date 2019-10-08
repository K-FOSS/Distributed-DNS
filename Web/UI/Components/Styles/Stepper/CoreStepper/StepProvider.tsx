// Web/UI/Components/Styles/Stepper/CoreStepper/StepProvider.tsx
import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
} from 'react';

interface StepContext {
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
}

const StepContext = createContext<StepContext>({
  activeStep: 0,
  setActiveStep: () => {},
});

export function StepProvider({
  children,
  activeStep,
  setActiveStep,
}: PropsWithChildren<StepContext>): React.ReactElement {
  return (
    <StepContext.Provider value={{ activeStep, setActiveStep }}>
      {children}
    </StepContext.Provider>
  );
}

interface UseStepper {
  nextStep: () => void;
  previousStep: () => void;
}

export function useStepper(): UseStepper {
  const { setActiveStep } = useContext(StepContext);

  const nextStep = useCallback(
    () => setActiveStep((currentStep) => currentStep + 1),
    [setActiveStep],
  );

  const previousStep = useCallback(
    () => setActiveStep((currentStep) => currentStep - 1),
    [setActiveStep],
  );

  return { nextStep, previousStep };
}
