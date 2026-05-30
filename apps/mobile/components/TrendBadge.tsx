import React from 'react';
import { View, Text } from 'react-native';
export function TrendBadge({score}) {
  const label = score >= 85 ? 'Viral' : score >= 70 ? 'Trending' : score >= 50 ? 'Rising' : 'Stable';
  const bg = score >= 85 ? '#fef2f2' : score >= 70 ? '#fff7ed' : score >= 50 ? '#f0fdf4' : '#f8f8f8';
  const fg = score >= 85 ? '#ef4444' : score >= 70 ? '#f97316' : score >= 50 ? '#22c55e' : '#888';
  return (<View style={{backgroundColor: bg, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3}}><Text style={{color: fg, fontSize: 12, fontWeight: '700'}}>{label}</Text></View>);
}
