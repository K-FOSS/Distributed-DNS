// Web/UI/Routes/Authentication/Signup.tsx
import Typography from '@material-ui/core/Typography';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import { useRegister } from 'UI/Components/Providers/Session/useRegister';
import { Form } from 'UI/Components/Styles/Form';
import { useApolloErrors } from 'UI/Utils/useApolloErrors';
import {
  FieldType,
  TextFieldInputType,
} from 'UI/Components/Styles/Form/useFields';

interface FormData {
  username: string;
  email: string;
  password: string;
}

export default function RegisterRoute(): React.ReactElement {
  const history = useHistory();

  const [register, { error: ApolloErrors }] = useRegister();

  const errors = useApolloErrors(ApolloErrors);

  const handleSubmit = useCallback(
    async (formData: FormData) => {
      const response = await register(formData);
      if (response) history.push('/');
    },
    [history, register],
  );

  return (
    <Form<FormData>
      title={
        <Typography variant='h4' align='center'>
          Register
        </Typography>
      }
      fields={[
        {
          type: FieldType.TEXT,
          inputType: TextFieldInputType.USERNAME,
          name: 'username',
          label: 'Username',
        },
        {
          type: FieldType.TEXT,
          inputType: TextFieldInputType.EMAIL,
          name: 'email',
          label: 'Email',
        },
        {
          type: FieldType.TEXT,
          inputType: TextFieldInputType.NEW_PASSWORD,
          name: 'password',
          label: 'Password',
        },
      ]}
      errors={errors}
      onSubmit={handleSubmit}
    />
  );
}
