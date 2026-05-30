import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import { venueRoutes } from './routes/venues';
const server = Fastify({logger: true});
async function start() {
  await server.register(cors, {origin: true});
  await server.register(rateLimit, {max: 100, timeWindow: '1 minute'});
  await server.register(venueRoutes, {prefix: '/venues'});
  server.get('/health', async () => ({status: 'ok', ts: new Date().toISOString()}));
  await server.listen({port: Number(process.env.PORT??3000), host: '0.0.0.0'});
}
start().catch(e => {console.error(e); process.exit(1);});
