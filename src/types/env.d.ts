interface ImportMetaEnv {
  readonly BASE_URL: string;
  readonly MODE: string;
  readonly VITE_APP_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  dataLayer: Array<Record<string, unknown> | unknown[]>;
  gtag: (...args: unknown[]) => void;
}
