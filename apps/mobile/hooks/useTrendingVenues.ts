import { useQuery } from '@tanstack/react-query';
import { fetchTrendingVenues } from '@/lib/api';
export function useTrendingVenues(lat, lng, r = 3) { return useQuery({ queryKey: ['trending', lat, lng, r], queryFn: () => fetchTrendingVenues(lat, lng, r), enabled: lat != null && lng != null, staleTime: 300000 }); }
