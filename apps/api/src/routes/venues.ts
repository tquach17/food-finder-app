import { FastifyPluginAsync } from 'fastify';
import { db } from '../db/client';
import { searchNearby } from '../services/yelp';
import { computeTrendScore, getCachedScore, setCachedScore } from '../services/trendScore';
const M = 1609.34;
export const venueRoutes: FastifyPluginAsync = async (f) => {
  f.get('/trending', async (req, reply) => {
    const { lat, lng, radius = '3' } = req.query as any;
    if (!lat || !lng) return reply.code(400).send({error: 'lat/lng required'});
    const bs = await searchNearby(+lat, +lng, parseFloat(radius) * M);
    const venues = await Promise.all(bs.map(async b => {
      let s = await getCachedScore(b.id);
      if (s === null) { s = computeTrendScore({ socialSaves: Math.floor(Math.random() * 30), reviewVelocity: Math.floor(b.review_count / 52), checkins: Math.floor(Math.random() * 20), recencyBoost: Math.round(b.rating * 20) }); await setCachedScore(b.id, s); }
      return { id: b.id, name: b.name, address: `${b.location.address1}, ${b.location.city}`, latitude: b.coordinates.latitude, longitude: b.coordinates.longitude, trendScore: s, yelpRating: b.rating, yelpReviewCount: b.review_count, priceLevel: b.price ?? '$', cuisine: b.categories.map(c => c.title), isOpen: !b.is_closed, photoUrl: b.image_url };
    }));
    venues.sort((a, b) => b.trendScore - a.trendScore);
    return { venues, updatedAt: new Date().toISOString() };
  });
  f.get('/:id', async (req, reply) => {
    const { id } = req.params as any;
    try { const r = await db.query('SELECT * FROM venues WHERE yelp_id=$1', [id]); if (r.rows.length > 0) return r.rows[0]; } catch {}
    return reply.code(404).send({error: 'not found'});
  });
};
