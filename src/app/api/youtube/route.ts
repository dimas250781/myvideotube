import { NextResponse } from 'next/server';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

const apiKeys = (process.env.YOUTUBE_API_KEYS || '').split(',');
let currentKeyIndex = 0;

const YOUTUBE_VIDEO_CATEGORIES: { [key: string]: string } = {
  Musik: '10',
  Film: '1',
  Berita: '25',
  Komedi: '23',
  Horor: '27', // Horror is part of Entertainment/Film, using search instead
  Traveling: '19',
  Hobby: '20', // Gaming
  Kuliner: '26', // Howto & Style
};

// Function to format duration from ISO 8601 to HH:MM:SS
const formatDuration = (isoDuration: string) => {
  const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '00:00';

  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  const seconds = parseInt(match[3] || '0');

  const h = hours > 0 ? `${hours}:` : '';
  const m = hours > 0 || minutes > 0 ? `${minutes.toString().padStart(2, '0')}:` : '00:';
  const s = seconds.toString().padStart(2, '0');
  
  return `${h}${m}${s}`;
};

// Function to format large numbers
const formatViews = (views: string) => {
    const num = parseInt(views);
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M views`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K views`;
    return `${num} views`;
};


async function fetchWithRetry(url: string) {
  for (let i = 0; i < apiKeys.length; i++) {
    const apiKey = apiKeys[currentKeyIndex];
    const fullUrl = `${url}&key=${apiKey}`;
    
    try {
      const response = await fetch(fullUrl);
      const data = await response.json();

      if (data.error && data.error.errors[0].reason === 'quotaExceeded') {
        console.warn(`Quota exceeded for key index ${currentKeyIndex}. Switching to the next key.`);
        currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;
        continue; // Try next key
      }
      if (!response.ok) {
        throw new Error(data.error?.message || 'YouTube API error');
      }

      return data;

    } catch (error) {
       console.error(`Error with key index ${currentKeyIndex}:`, error);
       currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;
    }
  }
  throw new Error('All YouTube API keys have failed or exceeded their quota.');
}


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'Beranda';
  
  if (!apiKeys.length || !apiKeys[0]) {
    return NextResponse.json({ message: 'YouTube API key not configured' }, { status: 500 });
  }

  try {
    let queryParams: string;
    const regionCode = 'ID'; // Indonesia
    const maxResults = 20;

    if (category === 'Beranda') {
      queryParams = `part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=${regionCode}&maxResults=${maxResults}&videoCategoryId=0`;
    } else if (YOUTUBE_VIDEO_CATEGORIES[category]) {
       queryParams = `part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=${regionCode}&maxResults=${maxResults}&videoCategoryId=${YOUTUBE_VIDEO_CATEGORIES[category]}`;
    } else {
      // For categories not in the map, use search
      const searchQuery = encodeURIComponent(`${category} indonesia`);
      queryParams = `part=snippet&q=${searchQuery}&regionCode=${regionCode}&maxResults=${maxResults}&type=video`;
    }

    const videosData = await fetchWithRetry(`https://www.googleapis.com/youtube/v3/videos?${queryParams}`);
    const searchData = queryParams.includes('&q=') ? await fetchWithRetry(`https://www.googleapis.com/youtube/v3/search?${queryParams}`) : null;

    const items = searchData ? searchData.items : videosData.items;
    
    // If we did a search, we need to fetch video details separately to get duration and stats
    let finalItems = items;
    if (searchData) {
        const videoIds = items.map((item: any) => item.id.videoId).join(',');
        const detailsData = await fetchWithRetry(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds}`);
        
        const detailsMap = new Map(detailsData.items.map((item: any) => [item.id, item]));
        finalItems = items.map((item: any) => ({ ...item, ...detailsMap.get(item.id.videoId) }));
    }

    const channelIds = [...new Set(finalItems.map((item: any) => item.snippet.channelId))].join(',');
    const channelsData = await fetchWithRetry(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIds}`);
    const channelAvatars = new Map(channelsData.items.map((channel: any) => [channel.id, channel.snippet.thumbnails.default.url]));

    const formattedVideos = finalItems.map((item: any) => ({
      id: typeof item.id === 'object' ? item.id.videoId : item.id,
      title: item.snippet.title,
      thumbnailUrl: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default.url,
      duration: item.contentDetails ? formatDuration(item.contentDetails.duration) : '0:00',
      channelName: item.snippet.channelTitle,
      channelId: item.snippet.channelId,
      views: item.statistics ? formatViews(item.statistics.viewCount) : '0 views',
      uploadedAt: formatDistanceToNow(new Date(item.snippet.publishedAt), { addSuffix: true, locale: id }),
      description: item.snippet.description,
      category: category,
      channelAvatarUrl: channelAvatars.get(item.snippet.channelId) || '',
    }));

    return NextResponse.json(formattedVideos);
  } catch (error: any) {
    console.error('Failed to fetch videos from YouTube:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
