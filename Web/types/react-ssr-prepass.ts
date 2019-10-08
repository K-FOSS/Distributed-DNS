declare module 'react-ssr-prepass' {
  import { ReactElement } from 'react';

  type PrepassFN = (c: React.ReactElement, any: any) => Promise<any>;

  export default function(component: ReactElement, fn?: PrepassFN): void;
}
