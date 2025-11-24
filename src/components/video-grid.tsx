'use client'

import type { Video } from '@/lib/data';
import VideoCard from '@/components/video-card';

interface VideoGridProps {
  videos: Video[];
  videoIds: string[];
}

export default function VideoGrid({ videos, videoIds }: VideoGridProps) {
  if (videos.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-400">No videos found in this category.</p>
      </div>
    );
  }

  const playlist = videoIds.join(',');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} playlist={playlist} />
      ))}
    </div>
  );
}
