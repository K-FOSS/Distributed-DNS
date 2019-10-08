// Web/UI/Routes/Authentication/Login.tsx
import Typography from '@material-ui/core/Typography';
import React, { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useLogin } from 'UI/Components/Providers/Session/useLogin';
import { Form } from 'UI/Components/Styles/Form';
import { useApolloErrors } from 'UI/Utils/useApolloErrors';
import {
  TextFieldInputType,
  FieldType,
} from 'UI/Components/Styles/Form/useFields';

interface FormData {
  username: string;
  password: string;
}

export default function LoginRoute(): React.ReactElement {
  const history = useHistory();
  const { state } = useLocation<{ pathName?: string }>();

  const [login, { error: ApolloErrors }] = useLogin();

  const errors = useApolloErrors(ApolloErrors);

  const handleSubmit = useCallback(
    async (formData: FormData) => {
      const response = await login(formData);
      if (response) history.push(state?.pathName || '/')
    },
    [history, login, state],
  );

  return (
    <Form<FormData>
      title={
        <Typography variant='h4' align='center'>
          Login
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
          inputType: TextFieldInputType.PASSWORD,
          name: 'password',
          label: 'Password',
        },
      ]}
      errors={errors}
      onSubmit={handleSubmit}
    />
  );
}
