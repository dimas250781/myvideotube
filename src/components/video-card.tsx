'use client';

import type { Video } from '@/lib/data';
import { channels } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const channel = channels.find(c => c.id === video.channelId);
  const channelAvatar = PlaceHolderImages.find(p => p.id === channel?.avatarId);
  const thumbnail = PlaceHolderImages.find(p => p.id === video.thumbnailId);

  return (
    <div className="flex flex-col">
      <Link href={`/watch/${video.id}`} className="group">
        <div className="relative aspect-video rounded-xl overflow-hidden">
          {thumbnail && (
            <Image
              src={thumbnail.imageUrl}
              alt={video.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform"
              data-ai-hint={thumbnail.imageHint}
            />
          )}
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-1.5 py-0.5 rounded">
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
        <div className="flex-1">
          <h3 className="text-white font-semibold text-base leading-tight line-clamp-2">
            <Link href={`/watch/${video.id}`}>{video.title}</Link>
          </h3>
          <p className="text-gray-400 text-sm mt-1">{video.channelName}</p>
          <div className="text-gray-400 text-sm">
            <span>{video.views}</span>
            <span className="mx-1">•</span>
            <span>{video.uploadedAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
