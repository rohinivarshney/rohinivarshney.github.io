/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADMIN_AUTH_KEY: string;
  readonly VITE_ADMIN_PASS_KEY: string;
  readonly VITE_ADMIN_DEFAULT_PASS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
