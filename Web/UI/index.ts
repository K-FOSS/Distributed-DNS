// Web/UI/index.ts
export const loader = (): Promise<typeof import('UI/Client')> =>
  import('UI/Client');
