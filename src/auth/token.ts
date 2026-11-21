// Single place for reading/writing the JWT and building the auth header.
// Used by authProvider (login/logout/checks), api.ts (axios) and App.tsx (react-admin fetch).

export const TOKEN_KEY = "auth_token";

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);
export const setToken = (token: string): void => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = (): void => localStorage.removeItem(TOKEN_KEY);

type TokenPayload = { username?: string; sub?: string; exp?: number };

// Decodes the payload for display/expiry only. This does NOT verify the
// signature; the backend does that on every request.
export const decodeToken = (token: string): TokenPayload | null => {
  try {
    const part = token.split(".")[1];
    // JWTs use base64url; atob needs standard base64 with padding
    const base64 = part.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const exp = decodeToken(token)?.exp;
  return typeof exp !== "number" || exp * 1000 <= Date.now();
};

/** Returns a valid (present and unexpired) token, clearing a stale one. */
export const getValidToken = (): string | null => {
  const token = getToken();
  if (!token) return null;
  if (isTokenExpired(token)) {
    clearToken();
    return null;
  }
  return token;
};

/** Value for the Authorization header, or null when not logged in. */
export const getAuthHeader = (): string | null => {
  const token = getToken();
  return token ? `Bearer ${token}` : null;
};
