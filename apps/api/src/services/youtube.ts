import axios from 'axios';

const KEY = process.env.YOUTUBE_API_KEY ?? '';
const BASE = 'https://www.googleapis.com/youtube/v3';

export interface VideoSignal {
  videoId: string; title: string; viewCount: number; likeCount: number; publishedAt: string; channelTitle: string;
}

export async function searchFoodVideos(query: string, city: string, maxResults = 10): Promise<VideoSignal[]> {
  const d30 = new Date(); d30.setDate(d30.getDate() - 30);
  const searchRes = await axios.get(`${BASE}/search`, {
    params: { part: 'snippet', q: `${query} ${city} restaurant food`, type: 'video', order: 'date', publishedAfter: d30.toISOString(), maxResults, key: KEY },
  });
  const items = searchRes.data.items ?? [];
  if (!items.length) return [];
  const videoIds = items.map((i: any) => i.id.videoId).join(',');
  const statsRes = await axios.get(`${BASE}/videos`, { params: { part: 'statistics,snippet', id: videoIds, key: KEY } });
  return (statsRes.data.items ?? []).map((v: any) => ({
    videoId: v.id, title: v.snippet.title, viewCount: Number(v.statistics.viewCount ?? 0),
    likeCount: Number(v.statistics.likeCount ?? 0), publishedAt: v.snippet.publishedAt, channelTitle: v.snippet.channelTitle,
  }));
}

export function computeYouTubeTrendScore(videos: VideoSignal[]): number {
  if (!videos.length) return 0;
  const now = Date.now();
  let score = 0;
  for (const v of videos) {
    const ageDays = (now - new Date(v.publishedAt).getTime()) / 86400000;
    const recencyWeight = Math.max(0, 1 - ageDays / 30);
    score += Math.min(Math.log10(v.viewCount + 1) * 20, 100) * recencyWeight;
  }
  return Math.round(Math.min(score / videos.length, 100));
}
