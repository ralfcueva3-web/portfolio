/**
 * Simple in-memory rate limiter using a token bucket approach.
 * Suitable for Vercel serverless functions (per-instance, not distributed).
 */

interface RateLimitEntry {
  count: number;
  timestamp: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

/**
 * Checks if a request should be rate limited.
 * @param key - Unique identifier (e.g., IP address)
 * @param maxRequests - Maximum requests allowed in the window
 * @param windowMs - Time window in milliseconds
 * @returns true if the request should be BLOCKED
 */
export function isRateLimited(
  key: string,
  maxRequests: number = 10,
  windowMs: number = 60_000,
): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now - entry.timestamp > windowMs) {
    // Reset or create new entry
    rateLimitMap.set(key, { count: 1, timestamp: now });
    return false;
  }

  if (entry.count >= maxRequests) {
    return true; // Rate limited
  }

  entry.count += 1;
  return false;
}

/**
 * Extracts the client IP from a Next.js request.
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') ?? 'unknown';
}

// Periodically clean up old entries to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitMap.entries()) {
      if (now - entry.timestamp > 300_000) {
        // 5 min cleanup
        rateLimitMap.delete(key);
      }
    }
  }, 60_000);
}
