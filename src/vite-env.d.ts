/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** GA4 Measurement ID (e.g. G-XXXXXXXXXX). Optional — analytics is a no-op without it. */
  readonly VITE_GA4_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
