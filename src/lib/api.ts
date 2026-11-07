const DEFAULT_API_BASE_URL = "http://localhost:8000";

/**
 * Base URL for the Wonderlast API.
 *
 * - `NEXT_PUBLIC_API_URL` is exposed to the browser and is required on Vercel.
 * - `API_URL` can be used for server-only overrides.
 */
export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL?.trim() ||
  process.env.API_URL?.trim() ||
  DEFAULT_API_BASE_URL
).replace(/\/+$/, "");

export function apiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${API_BASE_URL}${normalizedPath}`;
}
