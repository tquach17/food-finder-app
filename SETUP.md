# Getting Started — Bitemap API

## 1. Get Free API Keys (5 minutes)

### Google Places + YouTube (same Console)

1. Go to https://console.cloud.google.com/
2. Create a new project called "Bitemap"
3. Go to **APIs & Services ₒ Library** and enable:
   - **Places API** (venue discovery)
   - **YouTube Data API v3** (trend signals)
4. Create an API Key and copy it

### TikTok (optional, user OAuth only)
Skip for now - add later when users connect accounts.

---

## 2. Configure

```bash
cd apps/api
cp .env.example .env
# Edit .env and add your Google key for both variables
```

## 3. Start

```bash
npm install
npm run dev
```

## 4. Test

```
http://localhost:3000/venues/trending?lat=40.7128&lng=-74.0060&radius=2&city=New+York
```

## How Scores Work

| Signal | Weight | Source |
|---|---|---|
| YouTube videos (views x recency) | 40% | YouTube Data API v3 |
| Google review count | 35% | Google Places API |
| Google rating | 15% | Google Places API |
| Recency boost | 10% | Calculated |
