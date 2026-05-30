import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function ProfileScreen() {
  return (<SafeAreaView style={{flex:1,backgroundColor:'#f8f8f8'}}>
    <ScrollView contentContainerStyle={{padding:16}}>
      <Text style={{fontSize:26,fontWeight:''800',marginBottom:16}}>Profile</Text>
      <View style={{backgroundColor:'#fff',padding:16,borderRadius:12,marginBottom:16}}>
        <Text style={{fontSize:12,color:'#888',textTransform:'uppercase',marginBottom:8}}>MY LISTS</Text>
        <TouchableOpacity style={{paddingVertical:10}}><Text>Want to Try</Text></TouchableOpacity>
        <TouchableOpacity style={{paddingVertical:10}}><Text>Been Here</Text></TouchableOpacity>
      </View>
      <View style={{backgroundColor:'#fff',padding:16,borderRadius:12}}>
        <Text style={{fontSize:12,color:'#888',textTransform:'uppercase',marginBottom:8}}>CONNECT SOCIAL</Text>
        <TouchableOpacity style={{backgroundColor:'#1A1A2E',borderRadius:8,padding:14,alignItems:'center',marginBottom:8}}><Text style={{color:'#fff'}}>Connect TikTok</Text></TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:'#1A1A2E',borderRadius:8,padding:14,alignItems:'center'}}><Text style={{color:'#fff'}}>Connect Instagram</Text></TouchableOpacity>
      </View>
    </ScrollView>
  </SafeAreaView>);
}
