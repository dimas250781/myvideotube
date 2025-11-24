'use client';

import type { Video } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface VideoCardProps {
  video: Video;
  playlist: string;
}

export default function VideoCard({ video, playlist }: VideoCardProps) {
  const watchUrl = `/watch?v=${video.id}&playlist=${playlist}`;
  
  return (
    <div className="flex flex-col">
      <Link href={watchUrl} className="group">
        <div className="relative aspect-video rounded-xl overflow-hidden">
            <Image
              src={video.thumbnailUrl}
              alt={video.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform"
            />
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-1.5 py-0.5 rounded">
            {video.duration}
          </div>
        </div>
      </Link>
      <div className="flex gap-3 pt-3">
        {video.channelId && video.channelAvatarUrl && (
          <Link href={`https://www.youtube.com/channel/${video.channelId}`} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 mt-1">
            <Avatar className="h-9 w-9">
              <AvatarImage src={video.channelAvatarUrl} alt={video.channelName} />
              <AvatarFallback>{video.channelName.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
        )}
        <div className="flex-1">
          <h3 className="text-white font-semibold text-base leading-tight line-clamp-2">
            <Link href={watchUrl}>{video.title}</Link>
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
