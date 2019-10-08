// Web/UI/Components/Styles/Form/useField.tsx
import React, { useMemo } from 'react';
import { useImport } from 'UI/Components/Providers/ImportProvider';
import { useStyles } from './Styles';
import { Register } from './types';
import { ValidationError } from 'UI/Utils/useApolloErrors';
import { Loader } from '../Loader';

export enum FieldType {
  TEXT = 'text',
  SELECT = 'select',
  DATE = 'date',
}

enum FieldAutoComplete {
  'password' = 'current-password',
  'new-password' = 'new-password',
  'username' = 'username',
  'email' = 'email',
  'text' = 'off',
}

export enum TextFieldInputType {
  TEXT = 'text',
  PASSWORD = 'password',
  NEW_PASSWORD = 'new-password',
  USERNAME = 'username',
  EMAIL = 'email',
}

export enum HTMLInputType {
  'new-password' = 'password',
  'password' = 'password',
  'email' = 'email',
  'username' = 'username',
  'text' = 'text',
}

interface TextFieldType {
  type: FieldType.TEXT;
  label: string;
  inputType: TextFieldInputType;
  name: string;
}

interface SelectItem {
  label: string;
  value?: string;
}

export interface SelectFieldType {
  type: FieldType.SELECT;
  items: SelectItem[];
  label: string;
  name: string;
}

export type Field = TextFieldType | SelectFieldType;

export type UseFields = React.ReactElement;

interface UseFieldsInput {
  fields: Field[];
  register: Register;
  errors?: ValidationError;
}

export function useFields({
  fields,
  register,
  errors,
}: UseFieldsInput): UseFields {
  const classes = useStyles({});
  const TextField = useImport({
    imported: import(
      'UI/Components/Styles/Inputs/TextField/BaseTextField/index'
    ),
    path: 'Components/Styles/Inputs/TextField/BaseTextField/index.tsx',
    // TODO: TextField Skeleton Loader
    Loader,
  });

  return useMemo(
    () => (
      <>
        {fields.map((field, i) => {
          const validState = errors && field.name === errors.field && errors;

          switch (field.type) {
            case FieldType.TEXT:
              return (
                <TextField
                  variant='outlined'
                  className={classes.fieldStyle}
                  inputRef={register}
                  key={i}
                  fullWidth
                  error={!!validState}
                  helperText={validState && validState.errorMessage}
                  {...field}
                  autoComplete={FieldAutoComplete[field.inputType]}
                  type={HTMLInputType[field.inputType]}
                />
              );
            case FieldType.SELECT:
              return (
                <TextField
                  select
                  variant='outlined'
                  className={classes.fieldStyle}
                  inputRef={register}
                  SelectProps={{
                    native: true,
                  }}
                  key={i}
                  fullWidth
                  error={!!validState}
                  helperText={validState && validState.errorMessage}
                  {...field}
                >
                  {field.items.map(({ label, value = label }, i) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </TextField>
              );
          }
        })}
      </>
    ),
    [fields, errors, classes.fieldStyle, register],
  );
}
