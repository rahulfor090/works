import { randomBytes } from 'crypto';

/**
 * Generates a secure random token
 * @param length - Length of the token in bytes (before encoding to base64)
 * @returns A base64url-encoded string
 */
export function generateSecureToken(length = 32): string {
  // Generate random bytes
  const buffer = randomBytes(length);
  
  // Convert to base64 and make URL-safe
  return buffer
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Generates an API key in the format: prefix_randomToken
 * @param prefix - Prefix for the API key (e.g., 'nvr')
 * @param tokenLength - Length of the random token in bytes
 * @returns Formatted API key string
 */
export function generateApiKey(prefix = 'nvr', tokenLength = 32): string {
  const token = generateSecureToken(tokenLength);
  return `${prefix}_${token}`;
}
