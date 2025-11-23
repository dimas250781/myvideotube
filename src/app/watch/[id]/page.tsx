import { videos, channels, type Video, type Channel } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, Share2, MoreHorizontal } from 'lucide-react';
import SubscribeButton from '@/components/subscribe-button';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const imageMap = new Map(PlaceHolderImages.map(img => [img.id, img]));

type WatchPageProps = {
  params: { id: string };
};

export default function WatchPage({ params }: WatchPageProps) {
  const video: Video | undefined = videos.find(v => v.id === params.id);
  if (!video) {
    notFound();
  }

  const channel: Channel | undefined = channels.find(c => c.id === video.channelId);
  if (!channel) {
    notFound();
  }
  
  const relatedVideos = videos.filter(v => v.id !== video.id).slice(0, 15);

  const channelAvatar = imageMap.get(channel.avatarId);

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
      <div className="lg:w-2/3 xl:w-3/4">
        <div className="aspect-video bg-card rounded-xl overflow-hidden mb-4">
            <div className="w-full h-full bg-black flex items-center justify-center text-foreground">
                <p className="text-muted-foreground text-center p-4">This is a placeholder for the video player.<br/> Video playback for "{video.title}" would be here.</p>
            </div>
        </div>
        <h1 className="text-xl md:text-2xl font-bold mb-3">{video.title}</h1>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                {channelAvatar && (
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={channelAvatar.imageUrl} alt={channel.name} data-ai-hint={channelAvatar.imageHint} />
                        <AvatarFallback>{channel.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                )}
                <div>
                    <p className="font-semibold">{channel.name}</p>
                    <p className="text-sm text-muted-foreground">{channel.subscribers} subscribers</p>
                </div>
                <SubscribeButton />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
                <Button variant="secondary" className="rounded-full"><ThumbsUp className="mr-2" /> 12K</Button>
                <Button variant="secondary" className="rounded-full"><ThumbsDown /></Button>
                <Button variant="secondary" className="rounded-full"><Share2 className="mr-2" /> Share</Button>
                <Button variant="secondary" size="icon" className="rounded-full"><MoreHorizontal /></Button>
            </div>
        </div>
        <div className="bg-secondary rounded-xl p-4 mt-4">
            <p className="font-semibold">{video.views} &bull; {video.uploadedAt}</p>
            <p className="whitespace-pre-wrap mt-2 text-sm">{video.description}</p>
        </div>
      </div>
      <div className="lg:w-1/3 xl:w-1/4">
        <h2 className="text-xl font-bold mb-4">Up next</h2>
        <div className="flex flex-col gap-3">
          {relatedVideos.map(recVideo => (
            <CompactVideoCard key={recVideo.id} video={recVideo} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CompactVideoCard({ video }: { video: Video }) {
  const thumbnail = imageMap.get(video.thumbnailId);
  if (!thumbnail) return null;

  return (
    <Link href={`/watch/${video.id}`} className="group flex gap-3">
      <div className="relative aspect-video w-40 flex-shrink-0 overflow-hidden rounded-lg">
        <Image src={thumbnail.imageUrl} alt={video.title} width={160} height={90} className="w-full h-full object-cover" data-ai-hint={thumbnail.imageHint}/>
        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
          {video.duration}
        </div>
      </div>
      <div className="flex flex-col min-w-0">
        <h3 className="text-sm font-medium leading-snug text-foreground truncate-2-lines group-hover:text-primary">
          {video.title}
        </h3>
        <div className="text-xs text-muted-foreground mt-1">
          <p className="truncate">{video.channelName}</p>
          <p>
            {video.views} &bull; {video.uploadedAt}
          </p>
        </div>
      </div>
    </Link>
  );
}
