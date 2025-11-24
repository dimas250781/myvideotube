'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, MonitorPlay, ListVideo } from 'lucide-react';
import { Suspense, useState, useEffect } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import type { Video } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

function WatchPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const videoId = searchParams.get('v');
    const playlistIds = searchParams.get('playlist');
    const playlist = playlistIds ? playlistIds.split(',') : [];

    const [videoDetails, setVideoDetails] = useState<Video | null>(null);
    const [playlistDetails, setPlaylistDetails] = useState<Video[]>([]);
    const [autoNext, setAutoNext] = useState(true);

    const currentIndex = playlist.findIndex(id => id === videoId);

    useEffect(() => {
        const fetchVideoAndPlaylistDetails = async () => {
            if (!videoId) return;

            try {
                // Fetch current video details
                const resVideo = await fetch(`/api/youtube/details?id=${videoId}`);
                const videoData = await resVideo.json();
                setVideoDetails(videoData);

                // Fetch details for the rest of the playlist
                if (playlist.length > 0) {
                    const resPlaylist = await fetch(`/api/youtube/details?id=${playlist.join(',')}`);
                    const playlistData = await resPlaylist.json();
                    setPlaylistDetails(Array.isArray(playlistData) ? playlistData : [playlistData]);
                }
            } catch (error) {
                console.error("Failed to fetch video details:", error);
            }
        };
        fetchVideoAndPlaylistDetails();
    }, [videoId, playlist.join(',')]);

    const handleVideoEnd: YouTubeProps['onEnd'] = (event) => {
        if (autoNext) {
            playNextVideo();
        }
    };

    const playNextVideo = () => {
        if (currentIndex < playlist.length - 1) {
            const nextVideoId = playlist[currentIndex + 1];
            router.push(`/watch?v=${nextVideoId}&playlist=${playlist.join(',')}`);
        }
    };

    if (!videoId) {
        // This part remains the same as your original code
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
                <p>Video not found.</p>
                <button
                    onClick={() => router.push('/')}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                    Go back to Home
                </button>
            </div>
        );
    }

    const opts: YouTubeProps['opts'] = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1,
            rel: 0,
            modestbranding: 1,
        },
    };

    const nextVideo = playlistDetails.find(v => v.id === playlist[currentIndex + 1]);

    return (
        <div className="bg-black text-white min-h-screen flex flex-col lg:flex-row">
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <div className="w-full aspect-video">
                    <YouTube videoId={videoId} opts={opts} onEnd={handleVideoEnd} className="w-full h-full" />
                </div>
                
                <div className="p-4">
                     <button
                        onClick={() => router.back()}
                        className="flex lg:hidden items-center gap-2 text-white hover:text-gray-300 transition-colors mb-4"
                    >
                        <ArrowLeft size={20} />
                        <span>Back</span>
                    </button>

                    <h1 className="text-xl md:text-2xl font-bold mb-2">{videoDetails?.title}</h1>
                    <div className="flex items-center justify-between text-gray-400">
                        <p>{videoDetails?.channelName}</p>
                        <div className="flex items-center space-x-2">
                           <Label htmlFor="auto-next" className="text-sm">Auto-Next</Label>
                           <Switch
                                id="auto-next"
                                checked={autoNext}
                                onCheckedChange={setAutoNext}
                            />
                        </div>
                    </div>
                     <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm">{videoDetails?.views}</p>
                        <span className="text-sm">•</span>
                        <p className="text-sm">{videoDetails?.uploadedAt}</p>
                    </div>
                </div>
            </div>

            {/* Playlist Sidebar */}
            <div className="lg:w-96 lg:border-l lg:border-gray-800 flex-shrink-0">
                <div className="p-4 border-b border-t lg:border-t-0 border-gray-800 flex justify-between items-center">
                    <h2 className="font-bold text-lg">Next up</h2>
                     <button
                        onClick={() => router.back()}
                        className="hidden lg:flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span>Back</span>
                    </button>
                </div>
                <div className="max-h-[50vh] lg:max-h-full lg:overflow-y-auto">
                    {playlistDetails.slice(currentIndex + 1).map(video => (
                        <Link key={video.id} href={`/watch?v=${video.id}&playlist=${playlist.join(',')}`} className="flex gap-3 p-3 hover:bg-gray-800 transition-colors">
                            <div className="relative aspect-video w-32 flex-shrink-0">
                                <Image src={video.thumbnailUrl} alt={video.title} fill className="object-cover rounded-md" />
                                <span className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 py-0.5 rounded">{video.duration}</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-semibold line-clamp-2">{video.title}</h3>
                                <p className="text-xs text-gray-400 mt-1">{video.channelName}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function WatchPage() {
    return (
        <Suspense fallback={<div className="bg-black text-white h-screen flex items-center justify-center">Loading video...</div>}>
            <WatchPageContent />
        </Suspense>
    );
}
