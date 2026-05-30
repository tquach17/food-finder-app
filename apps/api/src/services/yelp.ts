import axios from 'axios';
const yelp = axios.create({baseURL: 'https://api.yelp.com/v3', headers: {Authorization: `Bearer ${process.env.YELP_API_KEY}`}});
export async function searchNearby(lat: number, lng: number, r: number, limit = 50) {
  const {data} = await yelp.get('/businesses/search', {params: {latitude: lat, longitude: lng, radius: Math.min(r, 40000), categories: 'restaurants,food', limit, sort_by: 'review_count'}});
  return data.businesses ?? [];
}
