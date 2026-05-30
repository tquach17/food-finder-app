import { createClient } from 'redis';
const redis = createClient({url: process.env.REDIS_URL});
redis.connect().catch(console.error);
const TTL = 60 * 15;
export function computeTrendScore(p: {socialSaves: number; reviewVelocity: number; checkins: number; recencyBoost: number}) {
  const s = Math.min(p.socialSaves * 2, 100) * 0.4 + Math.min(p.reviewVelocity * 5, 100) * 0.3 + Math.min(p.checkins * 3, 100) * 0.2 + p.recencyBoost * 0.1;
  return Math.round(Math.min(s, 100));
}
export async function getCachedScore(id: string) { const c = await redis.get(`score:${id}`); return c ? Number(c) : null; }
export async function setCachedScore(id: string, s: number) { await redis.setEx(`score:${id}`, TTL, String(s)); }
