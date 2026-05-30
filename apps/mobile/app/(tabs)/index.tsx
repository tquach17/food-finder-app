import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useLocation } from '@/hooks/useLocation';
import { useTrendingVenues } from '@/hooks/useTrendingVenues';
export default function MapScreen() {
  const { latitude, longitude, loading, error } = useLocation();
  const { data, isLoading } = useTrendingVenues(latitude, longitude);
  if (loading || isLoading) return (<View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#1A1A2E'}}><ActivityIndicator color="#E94560"/><Text style={{color:'#fff',marginTop:8}}>Finding trending spots...</Text></View>);
  return (<View style={{flex:1,backgroundColor:'#1A1A2E',justifyContent:'center',alignItems:'center'}}><Text style={{color:'#fff',fontSize:32}}>Map</Text><Text style={{color:'#888'}}>{data?.venues?.length ?? 0} spots nearby</Text><Text style={{color:'#888',fontSize:12}}>Add Mapbox token in app.json</Text></View>);
}
