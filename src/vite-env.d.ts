/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTACT_EMAIL?: string;
  /** Full WhatsApp link, e.g. https://wa.me/447123456789 */
  readonly VITE_WHATSAPP_URL?: string;
  /** Optional display label for Contact page, e.g. +44 7700 900000 */
  readonly VITE_WHATSAPP_DISPLAY_NUMBER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
