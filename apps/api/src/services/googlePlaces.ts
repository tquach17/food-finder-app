import axios from 'axios';

const BASE = 'https://maps.googleapis.com/maps/api';
const KEY = process.env.GOOGLE_PLACES_API_KEY <?? '';

export interface Place {
  placeId: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  rating: number;
  reviewCount: number;
  priceLevel: string;
  types: string[];
  isOpen: boolean;
  photoUrl?: string;
}

export async function searchNearby(lat: number, lng: number, radiusMeters: number, limit = 50): Promise<Place[]> {
  const { data } = await axios.get(`${BASE}/place/nearbysearch/json`, {
    params: { location: `${lat},${lng}`, radius: Math.min(radiusMeters, 50000), type: 'restaurant', key: KEY },
  });
  if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    throw new Error(`Google Places error: ${data.status} - ${data.error_message ?? ''}`);
  }
  return (data.results ?? []).slice(0, limit).map((r: any) => ({
    placeId: r.place_id, name: r.name, address: r.vicinity ?? '',
    latitude: r.geometry.location.lat, longitude: r.geometry.location.lng,
    rating: r.rating ?? 0, reviewCount: r.user_ratings_total ?? 0,
    priceLevel: '$'.repeat(r.price_level ?? 1),
    types: (r.types ?? []).filter((t: string) => t !== 'food' && t !== 'establishment').slice(0, 3),
    isOpen: r.opening_hours?.open_now ?? true,
    photoUrl: r.photos?.[0]?.photo_reference
      ? `${BASE}/place/photo?maxwidth=800&photoreference=${r.photos[0].photo_reference}&key=${KEY}`
      : undefined,
  }));
}
