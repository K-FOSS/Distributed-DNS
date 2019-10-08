import { AppState } from 'Server/State'

declare global {
  interface Window {
    APP_STATE: AppState;
    setImmediate: any
  }

  interface HotModule {
    dispose(cb: Function): void;
    accept(cb: Function): void;
  }

  interface NodeModule {
    hot: HotModule;
  }

  /* eslint-disable @typescript-eslint/no-namespace */
  namespace NodeJS {
    interface Process {
      browser: boolean;
    }
  }
  /* eslint-enable @typescript-eslint/no-namespace */
}
