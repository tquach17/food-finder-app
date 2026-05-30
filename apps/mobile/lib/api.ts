import axios from 'axios';
export const api = axios.create({ baseURL: process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000', timeout: 10000 });
export interface Venue { id: string; name: string; address: string; latitude: number; longitude: number; trendScore: number; yelpRating: number; yelpReviewCount: number; priceLevel: string; cuisine: string[]; isOpen: boolean; photoUrl?: string; distanceMiles?: number; }
export const fetchTrendingVenues = async (lat: number, lng: number, radiusMiles = 3) => { const { data } = await api.get('/venues/trending', { params: { lat, lng, radius: radiusMiles } }); return data; };
export const fetchVenueById = async (id: string) => { const { data } = await api.get(`/venues/${id}`); return data; };
