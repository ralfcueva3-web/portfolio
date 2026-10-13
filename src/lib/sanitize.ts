/**
 * Input sanitization and validation utilities for AI endpoints and forms.
 * Strips HTML tags, trims whitespace, removes control characters, and enforces max length.
 */

/**
 * Strips HTML tags, removes ASCII and Unicode control characters,
 * trims whitespace, and truncates to maximum allowed length.
 *
 * @param input - The raw input text to sanitize.
 * @param maxLength - Maximum permitted character length (defaults to 500).
 * @returns The sanitized input string.
 */
export function sanitizeInput(input: string, maxLength: number = 500): string {
  return input
    .replace(/<[^>]*>/g, '') // Strip HTML
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Control chars
    .trim()
    .slice(0, maxLength);
}

/**
 * Validates whether the given string conforms to standard email format.
 *
 * @param email - The email string to validate.
 * @returns True if valid email format, false otherwise.
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Checks whether text contains known spam keywords or patterns.
 *
 * @param text - The text string to test.
 * @returns True if spam patterns are detected, false otherwise.
 */
export function containsSpam(text: string): boolean {
  const spamPatterns = [
    /\bcasino\b/i,
    /\bviagra\b/i,
    /\bcrypto\s*invest/i,
    /\bfree\s*money\b/i,
    /\bclick\s*here\b/i,
  ];
  return spamPatterns.some((p) => p.test(text));
}
