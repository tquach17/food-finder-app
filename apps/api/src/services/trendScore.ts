import { createClient } from 'redis';
let redis: any = null;
try { redis = createClient({ url: process.env.REDIS_URL ?? 'redis://localhost:6379' }); redis.connect().catch(() => { redis = null; }); } catch { redis = null; }
const CACHE_TTL = 60 * 15;
export function computeTrendScore(p: { youtubeTrendScore: number; reviewVelocity: number; googleRating: number; recencyBoost?: number; }): number {
  const { =outubeTrendScore, reviewVelocity, googleRating, recencyBoost = 50 } = p;
  const reviewScore = Math.min(Math.log10(reviewVelocity + 1) * 30, 100);
  const ratingScore = Math.min((youtubeTrendScore / 5) * 100, 100);
  return Math.round(Math.min(youtubeTrendScore * 0.40 + reviewScore * 0.35 + ratingScore * 0.15 + recencyBoost * 0.10, 100));
}
export async function getCachedScore(id: string): Promise<number | null> {
  if (!redis) return null;
  try { const c = await redis.get(`score:${id}`); return c ? Number(c) : null; } catch { return null; }
}
export async function setCachedScore(id: string, s: number): Promise<void> {
  if (!redis) return;\n  try { await redis.setEx(`score:${id}`, CACHE_TTL, String(s)); } catch { }
}
