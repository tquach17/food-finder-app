import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
export function useLocation() {
  const [state, setState] = useState({ latitude: null, longitude: null, error: null, loading: true });
  useEffect(() => { (async () => { const { status } = await Location.requestForegroundPermissionsAsync(); if (status !== 'granted') { setState(s => ({...s, error: 'denied', loading: false})); return; } const loc = await Location.getCurrentPositionAsync({}); setState({ latitude: loc.coords.latitude, longitude: loc.coords.longitude, error: null, loading: false }); })(); }, []);
  return state;
}
