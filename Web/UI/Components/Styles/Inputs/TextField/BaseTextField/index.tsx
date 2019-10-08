// Web/UI/Components/Styles/TextField/BaseTextField/index.tsx
import React from 'react';
import TextField, { OutlinedTextFieldProps } from '@material-ui/core/TextField';

export default function BaseTextField(
  props: OutlinedTextFieldProps,
): React.ReactElement {
  return <TextField {...props} />;
}
