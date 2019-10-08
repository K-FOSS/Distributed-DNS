// Web/UI/Routes/Configuration/InitialConfiguration.tsx
import Typography from '@material-ui/core/Typography';
import React, { useCallback } from 'react';
import { Form } from 'UI/Components/Styles/Form';
import {
  FieldType,
  TextFieldInputType,
} from 'UI/Components/Styles/Form/useFields';
import { useApolloErrors } from 'UI/Utils/useApolloErrors';
import { useInitialConfigurationMutation } from './initialConfiguration.gen';

interface FormData {
  username: string;
  email: string;
  password: string;
}

export default function InitialConfigurationRoute(): React.ReactElement {
  // const history = useHistory();

  const [
    initialConfiguration,
    { error: ApolloErrors },
  ] = useInitialConfigurationMutation();

  const errors = useApolloErrors(ApolloErrors);

  const handleSubmit = useCallback(
    async (formData: FormData) => {
      const response = await initialConfiguration({
        variables: { userInput: formData },
      });
      console.log(response);
    },
    [initialConfiguration],
  );

  return (
    <Form<FormData>
      title={
        <Typography variant='h4' align='center'>
          Configuration
        </Typography>
      }
      errors={errors}
      onSubmit={handleSubmit}
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
    />
  );
}
