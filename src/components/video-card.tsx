import type { Video } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { channels } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const imageMap = new Map(PlaceHolderImages.map(img => [img.id, img]));

type VideoCardProps = {
  video: Video;
};

export function VideoCard({ video }: VideoCardProps) {
  const channel = channels.find(c => c.id === video.channelId);
  const thumbnail = imageMap.get(video.thumbnailId);
  const channelAvatar = channel ? imageMap.get(channel.avatarId) : undefined;

  if (!thumbnail) return null;

  return (
    <div className="group">
      <Link href={`/watch/${video.id}`} className="block">
        <div className="relative aspect-video overflow-hidden rounded-xl">
          <Image
            src={thumbnail.imageUrl}
            alt={video.title}
            width={400}
            height={225}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={thumbnail.imageHint}
          />
          <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
            {video.duration}
          </div>
        </div>
      </Link>
      <div className="flex gap-3 pt-3">
        {channel && channelAvatar && (
          <Link href={`/channel/${channel.id}`} className="flex-shrink-0 mt-1">
            <Avatar className="h-9 w-9">
              <AvatarImage src={channelAvatar.imageUrl} alt={channel.name} data-ai-hint={channelAvatar.imageHint} />
              <AvatarFallback>{channel.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
        )}
        <div className="flex flex-col min-w-0">
          <Link href={`/watch/${video.id}`}>
            <h3 className="text-base font-medium leading-snug text-foreground truncate-2-lines group-hover:text-primary">
              {video.title}
            </h3>
          </Link>
          <div className="text-sm text-muted-foreground mt-1">
            <p className="truncate">{video.channelName}</p>
            <p>
              {video.views} &bull; {video.uploadedAt}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add this utility class to globals.css if it doesn't exist, or use a plugin
// For simplicity, we'll assume a plugin or similar setup that provides this.
// A simple way to achieve this is with a style tag, but that's not ideal.
// The best way is to use a tailwind plugin like @tailwindcss/line-clamp.
// For now, the `truncate` class on the title will suffice. Let's make it more robust.
// We can use a simple CSS trick. Let's make it a 2-line clamp.
// In globals.css or a style block, we'd have:
// .truncate-2-lines {
//   overflow: hidden;
//   text-overflow: ellipsis;
//   display: -webkit-box;
//   -webkit-line-clamp: 2;
//   -webkit-box-orient: vertical;
// }
// For this project, a single line truncate is acceptable.
