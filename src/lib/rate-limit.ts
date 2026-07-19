type RateLimitRecord = {
  count: number
  resetAt: number
}

const buckets = new Map<string, RateLimitRecord>()

export function checkRateLimit({
  key,
  limit = 5,
  windowMs = 10 * 60 * 1000,
}: {
  key: string
  limit?: number
  windowMs?: number
}) {
  const now = Date.now()
  const current = buckets.get(key)

  if (!current || current.resetAt <= now) {
    buckets.set(key, {
      count: 1,
      resetAt: now + windowMs,
    })
    return { allowed: true, remaining: limit - 1, resetAt: now + windowMs }
  }

  if (current.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: current.resetAt }
  }

  current.count += 1
  return { allowed: true, remaining: limit - current.count, resetAt: current.resetAt }
}
