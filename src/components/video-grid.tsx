import type { Video } from '@/lib/data';
import { VideoCard } from './video-card';

type VideoGridProps = {
  videos: Video[];
  title?: string;
};

export function VideoGrid({ videos, title }: VideoGridProps) {
  return (
    <section>
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-8">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </section>
  );
}
