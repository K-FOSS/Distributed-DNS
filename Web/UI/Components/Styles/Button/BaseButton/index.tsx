// Web/UI/Components/Styles/Button/BaseButton/index.tsx
import React, { useMemo } from 'react';
import { useImport } from 'UI/Components/Providers/ImportProvider';
import { BaseButtonProps } from './BaseButtonCore';
import { Loader } from '../../Loader';

export function BaseButton(props: BaseButtonProps): React.ReactElement {
  const Button = useImport({
    imported: import('./BaseButtonCore'),
    path: 'Components/Styles/Button/BaseButton/BaseButtonCore.tsx',
    Loader,
  });

  return useMemo(() => <Button {...props} />, [props]);
}
