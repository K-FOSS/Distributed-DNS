// Web/UI/Components/Styles/Form/useTextField.ts
import { useImport } from 'UI/Components/Providers/ImportProvider';
import { Loader } from '../Loader';

export function useTextField() {
  return useImport({
    imported: import(
      // eslint-disable-next-line comma-dangle
      'UI/Components/Styles/Inputs/TextField/BaseTextField/index'
    ),
    path: 'Components/Styles/Inputs/TextField/BaseTextField/index.tsx',
    // TODO: TextField Skeleton Loader
    Loader: Loader,
  });
}
