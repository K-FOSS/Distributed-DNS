// Web/UI/Components/Styles/Form/index.tsx
import Paper from '@material-ui/core/Paper';
import React, { PropsWithChildren } from 'react';
import useForm from 'react-hook-form';
import { useStyles } from 'UI/Components/Styles/Form/Styles';
import { ValidationError } from 'UI/Utils/useApolloErrors';
import BaseButtonCore from '../Button/BaseButton/BaseButtonCore';
import { Field, useFields } from './useFields';

interface FormProps<T> {
  title: React.ReactElement;
  fields: Field[];
  onSubmit: (data: T) => any;
  errors?: ValidationError;
}

export function Form<T>({
  fields,
  onSubmit,
  title,
  errors,
}: PropsWithChildren<FormProps<T>>): React.ReactElement {
  const { register, handleSubmit } = useForm<T>();

  const classes = useStyles({});

  const Fields = useFields({ fields, register, errors });

  return (
    <section className={classes.section}>
      <Paper
        component={'form' as 'div'}
        onSubmit={handleSubmit(onSubmit)}
        className={classes.form}
      >
        {title}
        {Fields}
        <BaseButtonCore
          submit
          label='Submit'
          fullWidth
          color='primary'
          variant='contained'
        />
      </Paper>
    </section>
  );
}
