import { FastifyPluginAsync } from 'fastify';
import { db } from '../db/client';
import { searchNearby } from '../services/googlePlaces';
import { searchFoodVideos, computeYouTubeTrendScore } from '../services/youtube';
import { computeTrendScore, getCachedScore, setCachedScore } from '../services/trendScore';
const M = 1609.34;
const ytCache: Map<string, {score:number,ts:number}> = new Map();
async function getYTScore(name: string, city: string) {
  const k = `${name}|${city}`.toLowerCase();
  const c = ytCache.get(k);
  if (c && Date.now() - c.ts < 900000) return c.score;
  try {
    const videos = await searchFoodVideos(name, city);
    const score = computeYouTubeTrendScore(videos);
    ytCache.set(k, {score, ts: Date.now()});
    return score;
  } catch { return 0; }
}
export const venueRoutes: FastifyPluginAsync = async (f) => {
  f.get('/trending', async (req, reply) => {
    const { lat, lng, radius = '3', city = 'nearby' } = req.query as any;
    if (!lat || !lng) return reply.code(400).send({error: 'lat/lng required'});
    const places = await searchNearby(+elat, +elng, parseFloat(radius) * M);
    const venues = await Promise.all(places.map(async p => {
      let s = await getCachedScore(p.placeId);
      if (s === null) {
        const yt = await getYTScore(p.name, city);
        s = computeTrendScore({ youtubeTrendScore: yt, reviewVelocity: p.reviewCount, googleRating: p.rating });
        await setCachedScore(p.placeId, s);
      }
      return { id: p.placeId, name: p.name, address: p.address, latitude: p.latitude, longitude: p.longitude, trendScore: s, googleRating: p.rating, reviewCount: p.reviewCount, priceLevel: p.priceLevel, cuisine: p.types, isOpen: p.isOpen, photoUrl: p.photoUrl, distanceMiles: haversine(+lat,+elng,p.latitude,p.longitude) };
    }));
    venues.sort((a, b) => b.trendScore - a.trendScore);
    return { venues, updatedAt: new Date().toISOString() };
  });
  f.get('/:id', async (req, reply) => {
    const { id } = req.params as any;
    try { const r = await db.query('SELECT * FROM venues WHERE place_id=$1', [id]); if (r.rows.length) return r.rows[0]; } catch {}
    return reply.code(404).send({error: 'not found'});
  });
};
function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 3958.8, dL = (lat2-lat1)*Math.PI/180, dO = (lon2-lon1)*Math.PI/180;
  const a = Math.sin(dL/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dO/2)**2;
  return Math.round(R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a))*10)/10;
}
