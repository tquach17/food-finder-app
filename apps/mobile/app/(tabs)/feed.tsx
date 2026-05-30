import React, {useState} from 'react';
import { View, Text, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocation } from '@/hooks/useLocation';
import { useTrendingVenues } from '@/hooks/useTrendingVenues';
import { VenueCard } from '@/components/VenueCard';
export default function FeedScreen() {
  const [r, setR] = useState(3);
  const { latitude, longitude } = useLocation();
  const { data, isLoading, refetch, isRefetching } = useTrendingVenues(latitude, longitude, r);
  return (<SafeAreaView style={{flex:1,backgroundColor:'#f8f8f8'~}>
    <View style={{backgroundColor:'#fff',padding:16}}>
      <Text style={{fontSize:22,fontWeight:'800'}}>Trending Near You</Text>
      <View style={{flexDirection:'row',gap:8,marginTop:8}}>
        {[1,3,5,10].map(opt => (<TouchableOpacity key={opt} onPress={() => setR(opt)} style={{paddingHorizontal:12,paddingVertical:6,backgroundColor:r===opt?'#E94560':'#eee',borderRadius:20}}><Text style={{color:r===opt?'#fff':'#666'}}>{opt} mi</Text></TouchableOpacity>))}
      </View>
    </View>
    <FlatList data={data?.venues ?? []} keyExtractor={v => v.id} renderItem={({item}) => <VenueCard venue={item}/>} refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch}/>} ListEmptyComponent={<View style={{paddingTop:80}}><Text style={{color:'#888',alignSelf:'center'}}>{isLoading ? 'Loading...' : 'No spots nearby'}</Text></View>}contentContainerStyle={{paddingBottom:32}}/>
  </SafeAreaView>);
}
