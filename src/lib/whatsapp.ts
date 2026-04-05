/**
 * Central WhatsApp deep links. Contact page uses a pre-filled first message to reduce friction.
 */

export const WHATSAPP_BASE_URL =
  import.meta.env.VITE_WHATSAPP_URL?.trim() || 'https://wa.me/447000000000';

export const WHATSAPP_FIRST_CONTACT_MESSAGE =
  "Hi, I'd like to find out about a website";

export function whatsappUrlWithPrefill(
  baseUrl: string = WHATSAPP_BASE_URL,
  message: string = WHATSAPP_FIRST_CONTACT_MESSAGE,
): string {
  const encoded = encodeURIComponent(message);
  if (baseUrl.includes('text=')) return baseUrl;
  const sep = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${sep}text=${encoded}`;
}

/** Digits from wa.me URL, if parseable */
export function whatsappDigitsFromUrl(url: string): string | null {
  const m = url.match(/wa\.me\/(\d+)/);
  return m ? m[1] : null;
}

/** Human-friendly label: env override, else rough format from wa.me path */
export function whatsappDisplayLabel(): string {
  const fromEnv = import.meta.env.VITE_WHATSAPP_DISPLAY_NUMBER?.trim();
  if (fromEnv) return fromEnv;

  const digits = whatsappDigitsFromUrl(WHATSAPP_BASE_URL);
  if (!digits) return 'WhatsApp';

  if (digits.startsWith('44') && digits.length >= 12) {
    const n = digits.slice(2);
    if (n.length === 10) {
      return `+44 ${n.slice(0, 4)} ${n.slice(4, 7)} ${n.slice(7)}`;
    }
  }
  return `+${digits}`;
}
