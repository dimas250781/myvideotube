'use client';

import { VideoGrid } from '@/components/video-grid';
import { videos } from '@/lib/data';

type HomeProps = {
  activeCategory?: string;
};

export default function Home({ activeCategory = 'Beranda' }: HomeProps) {
  const filteredVideos =
    activeCategory === 'Beranda'
      ? videos
      : videos.filter(video => video.category === activeCategory);

  return (
    <div className="space-y-8">
      <VideoGrid videos={filteredVideos} />
    </div>
  );
}
