import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { TrendBadge } from './TrendBadge';
export function VenueCard({venue}) {
  const router = useRouter();
  return (<TouchableOpacity style={styles.card} onPress={() => router.push(`/venue/${venue.id}`)} activeOpacity={0.85}>
    {venue.photoUrl && <Image source={{uri: venue.photoUrl}} style={styles.img}/>}
    <View style={styles.content}>
      <View style={styles.row}><Text style={styles.name} numberOfLines={1}>{venue.name}</Text><TrendBadge score={venue.trendScore}/></View>
      <Text style={{color: '#888', fontSize: 13}}>{venue.cuisine.join(' ')} {venue.priceLevel}</Text>
    </View>
  </TouchableOpacity>);
}
const styles = StyleSheet.create({ card: {backgroundColor: '#fff', borderRadius: 12, margin: 8, elevation: 2}, img: {width: '100%', height: 150}, content: {padding: 12}, row: {flexDirection: 'row', justifyContent: 'space-between'}, name: {fontSize: 16, fontWeight: '700', flex: 1} });
