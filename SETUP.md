# Getting Started - Bitemap API

## 1 Get Free API Keys

Both Google Places and YouTube use the same Google Cloud project:

1. Go to https://console.cloud.google.com/
2. Create project "Bitemap"
3. Enable: Places API and YouTube Data API v3
4. Create an API Key

TikTok: skip for now - users connect via OAuth later

## 2 Configure

cd apps/api
cp .env.example .env
# Edit .env and add your Google key for both variables

## 3 Start

npm install
npm run dev

## 4 Test

http://localhost:3000/venues/trending?lat=40.7128&lng=-74.0060&radius=2&city=New+York

## Trend Scores

YouTube 40% + Google reviews 35% + Google rating 15% + recency 10%
