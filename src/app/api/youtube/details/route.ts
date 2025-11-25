import { NextResponse } from 'next/server';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { getNextApiKey, updateApiKeyStatus } from '@/lib/api-key-manager';

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

async function fetchWithRetry(url: string): Promise<any> {
  let attempts = 0;
  const { keys } = getNextApiKey();
  const maxAttempts = keys.length;

  while(attempts < maxAttempts) {
    const { apiKey, keyIndex } = getNextApiKey();
    if (!apiKey) throw new Error('All API keys have failed or have quota issues.');

    const fullUrl = `${url}&key=${apiKey}`;
    try {
      updateApiKeyStatus(keyIndex, 'active');
      const response = await fetch(fullUrl);
      const data = await response.json();

      if (data.error && data.error.errors[0].reason === 'quotaExceeded') {
        console.warn(`Quota exceeded for key index ${keyIndex}. Switching to the next key.`);
        updateApiKeyStatus(keyIndex, 'quotaExceeded');
        attempts++;
        continue;
      }

      if (!response.ok) {
        updateApiKeyStatus(keyIndex, 'error');
        throw new Error(data.error?.message || 'YouTube API error');
      }

      updateApiKeyStatus(keyIndex, 'standby');
      return data;

    } catch (error) {
       console.error(`Error with key index ${keyIndex}:`, error);
       updateApiKeyStatus(keyIndex, 'error');
       attempts++;
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
    if (videoIds.split(',').length === 1) {
        return NextResponse.json(videoDetails[0] || null);
    }
    return NextResponse.json(videoDetails);
  } catch (error: any) {
    console.error('Failed to fetch video details from YouTube:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
