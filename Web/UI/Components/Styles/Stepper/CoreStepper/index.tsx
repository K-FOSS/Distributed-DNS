// Web/UI/Components/Styles/Stepper/CoreStepper/index.tsx
import React, { useState, useMemo } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { StepProvider } from './StepProvider';

interface CoreStepperStep {
  Component: () => React.ReactElement;
  label: string;
}

interface CoreStepperProps {
  steps: CoreStepperStep[];
}

export function CoreStepper({ steps }: CoreStepperProps): React.ReactElement {
  const [activeStep, setActiveStep] = useState<number>(0);

  const ActiveComponent = useMemo(() => steps[activeStep].Component, [
    activeStep,
    steps,
  ]);

  return (
    <>
      <Stepper activeStep={activeStep}>
        {steps.map(({ label }, i) => {
          return (
            <Step key={i}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <StepProvider activeStep={activeStep} setActiveStep={setActiveStep}>
        {' '}
        <ActiveComponent />
      </StepProvider>
    </>
  );
}
