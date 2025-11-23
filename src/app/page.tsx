import { getVideoRecommendations } from '@/ai/flows/video-recommendations';
import { VideoGrid } from '@/components/video-grid';
import { videos } from '@/lib/data';
import type { Video } from '@/lib/data';

export default async function Home() {
  // Mock user data for AI recommendations
  const mockUserInput = {
    userId: 'user-123',
    viewingHistory: ['react-in-100-seconds', 'css-for-js-devs'],
    interests: ['web development', 'react', 'nextjs'],
    numRecommendations: 8,
  };

  let recommendedVideos: Video[] = [];

  try {
    const { recommendations } = await getVideoRecommendations(mockUserInput);
    
    const videoMap = new Map(videos.map(video => [video.id, video]));
    recommendedVideos = recommendations.map(id => videoMap.get(id)).filter(Boolean) as Video[];

    if (recommendedVideos.length < mockUserInput.numRecommendations) {
      const existingIds = new Set(recommendedVideos.map(v => v.id));
      const fallbackVideos = videos
        .filter(v => !existingIds.has(v.id))
        .slice(0, mockUserInput.numRecommendations - recommendedVideos.length);
      recommendedVideos.push(...fallbackVideos);
    }

  } catch (error) {
    console.error("AI recommendation failed, using default videos:", error);
    recommendedVideos = videos.slice(0, mockUserInput.numRecommendations);
  }

  return (
    <div className="space-y-8">
      <VideoGrid videos={recommendedVideos} />
    </div>
  );
}
