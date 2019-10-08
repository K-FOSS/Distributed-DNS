// Web/UI/Routes/Lab/index.tsx
import Typography from '@material-ui/core/Typography';
import { useSnackbar } from 'notistack';
import React, { useCallback } from 'react';
import { Form } from 'UI/Components/Styles/Form';
import {
  FieldType,
  TextFieldInputType,
} from 'UI/Components/Styles/Form/useFields';
import { Header } from 'UI/Components/Styles/Header';
import { CoreStepper } from 'UI/Components/Styles/Stepper/CoreStepper';
import { useStepper } from 'UI/Components/Styles/Stepper/CoreStepper/StepProvider';

interface FormData {
  username: string;
}

function FormLab(): React.ReactElement {
  const { nextStep } = useStepper();

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = useCallback(() => {
    nextStep();
    enqueueSnackbar('Successfully did something', { variant: 'success' });
  }, [enqueueSnackbar, nextStep]);

  return (
    <Form
      title={
        <Typography variant='h4' align='center'>
          Lab
        </Typography>
      }
      onSubmit={handleSubmit}
      fields={[
        {
          type: FieldType.TEXT,
          inputType: TextFieldInputType.USERNAME,
          name: 'username',
          label: 'Username',
        },
        {
          type: FieldType.SELECT,
          name: 'select',
          label: 'Testing',
          items: [
            { value: 'A1', label: 'Hello' },
            { value: 'A2', label: 'Hello2' },
          ],
        },
      ]}
    />
  );
}

export function TestLab(): React.ReactElement {
  return <div>Hello World Fucker</div>;
}

export default function LabRoute(): React.ReactElement {
  return (
    <>
      <Header title={{ primary: 'Lab' }} background='secondary' />
      <CoreStepper
        steps={[
          {
            label: 'Form',
            Component: FormLab,
          },
          {
            label: 'Test Lab',
            Component: TestLab,
          },
        ]}
      />
    </>
  );
}
