import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { fetchVenueById } from '@/lib/api';
import { TrendBadge } from '@/components/TrendBadge';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function VenueScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const {data:venue, isLoading} = useQuery({ queryKey: ['venue', id], queryFn: () => fetchVenueById(id) });
  if (isLoading || !venue) return (<View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text>Loading...</Text></View>);
  return (<SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
    <TouchableOpacity onPress={() => router.back()} style={{padding:16}}><Text style={{color:'#E94560'}}>Back</Text></TouchableOpacity>
    <ScrollView>
      {venue.photoUrl && <Image source={{uri: venue.photoUrl}} style={{width:'100%',height:240}}/>}
      <View style={{padding:16}}>
        <View style={{flexDirection:'row'}}><Text style={{fontSize:22,fontWeight:''800',flex:1}}>{venue.name}</Text><TrendBadge score={venue.trendScore}/></View>
        <Text style={{color:'#888',marginTop:8}}>{venue.cuisine?.join(' ')}</Text>
        <TouchableOpacity style={{backgroundColor:'#E94560',borderRadius:10,padding:16,alignItems:'center',marginTop:16}} onPress={() => Linking.openURL(`https://maps.apple.com/?q=${encodeURIComponent(venue.name)}&ll=${venue.latitude},${venue.longitude}`)}><Text style={{color:'#fff',fontWeight:''700'}}>Get Directions</Text></TouchableOpacity>
      </View>
    </ScrollView>
  </SafeAreaView>);
}
