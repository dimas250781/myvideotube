import { NextResponse } from 'next/server';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

const apiKeys = [
  process.env.YOUTUBE_API_KEY_1,
  process.env.YOUTUBE_API_KEY_2,
  process.env.YOUTUBE_API_KEY_3,
  process.env.YOUTUBE_API_KEY_4,
  process.env.YOUTUBE_API_KEY_5,
].filter((key): key is string => !!key);

let currentKeyIndex = 0;

const formatDuration = (isoDuration: string) => {
  const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '0:00'; // Return a valid format
  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  const seconds = parseInt(match[3] || '0');
  const h = hours > 0 ? `${hours}:` : '';
  const m = hours > 0 || minutes > 0 ? `${minutes.toString().padStart(2, '0')}:` : '0:';
  const s = seconds.toString().padStart(2, '0');
  return `${h}${m}${s}`.replace(/^0:/, ''); // Fix for 0:MM:SS format
};

const formatViews = (views: string) => {
    const num = parseInt(views);
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M views`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K views`;
    return `${num} views`;
};

async function fetchWithRetry(url: string) {
  if (apiKeys.length === 0) throw new Error('No YouTube API keys configured.');

  for (let i = 0; i < apiKeys.length; i++) {
    const apiKey = apiKeys[currentKeyIndex];
    const fullUrl = `${url}&key=${apiKey}`;
    
    try {
      const response = await fetch(fullUrl);
      const data = await response.json();

      if (data.error && data.error.errors[0].reason === 'quotaExceeded') {
        console.warn(`Quota exceeded for key index ${currentKeyIndex}. Switching to the next key.`);
        currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;
        continue;
      }
      if (!response.ok) throw new Error(data.error?.message || 'YouTube API error');

      return data;
    } catch (error) {
       console.error(`Error with key index ${currentKeyIndex}:`, error);
       currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;
    }
  }
  throw new Error('All YouTube API keys have failed or exceeded their quota.');
}

async function fetchVideoDetails(videoIds: string) {
    if (!videoIds) {
        return [];
    }
    const detailsData = await fetchWithRetry(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}`);
    
    if (!detailsData.items || detailsData.items.length === 0) {
        return [];
    }

    const channelIds = [...new Set(detailsData.items.map((item: any) => item.snippet.channelId).filter(Boolean))].join(',');
    let channelAvatars = new Map();
    if(channelIds) {
        const channelsData = await fetchWithRetry(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIds}`);
        if(channelsData.items) {
          channelAvatars = new Map(channelsData.items.map((channel: any) => [channel.id, channel.snippet.thumbnails.default.url]));
        }
    }
    
    return detailsData.items.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      thumbnailUrl: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default.url,
      duration: item.contentDetails ? formatDuration(item.contentDetails.duration) : '0:00',
      channelName: item.snippet.channelTitle,
      channelId: item.snippet.channelId,
      views: item.statistics ? formatViews(item.statistics.viewCount) : '0 views',
      uploadedAt: formatDistanceToNow(new Date(item.snippet.publishedAt), { addSuffix: true, locale: id }),
      description: item.snippet.description,
      channelAvatarUrl: channelAvatars.get(item.snippet.channelId) || '',
    }));
}


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const videoIds = searchParams.get('id');

  if (!videoIds) {
    return NextResponse.json({ message: 'Video ID(s) are required' }, { status: 400 });
  }

  try {
    const videoDetails = await fetchVideoDetails(videoIds);
    // If only one ID was requested, return a single object instead of an array
    if (videoIds.split(',').length === 1) {
        return NextResponse.json(videoDetails[0] || null);
    }
    return NextResponse.json(videoDetails);
  } catch (error: any) {
    console.error('Failed to fetch video details from YouTube:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
