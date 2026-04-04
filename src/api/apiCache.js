// Simple in-memory cache with TTL (time-to-live)
const cache = new Map()
const TTL_MS = 5 * 60 * 1000 // 5 minutes

export const getCached = (key) => {
  const entry = cache.get(key)
  if (!entry) return null
  if (Date.now() - entry.ts > TTL_MS) {
    cache.delete(key)
    return null
  }
  return entry.data
}

export const setCache = (key, data) => {
  cache.set(key, { data, ts: Date.now() })
}
