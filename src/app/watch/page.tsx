'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, PictureInPicture2 } from 'lucide-react';
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
    const [loading, setLoading] = useState(true);
    const [player, setPlayer] = useState<any>(null);

    const currentIndex = playlist.findIndex(id => id === videoId);

    useEffect(() => {
        const fetchVideoAndPlaylistDetails = async () => {
            if (!videoId) {
                setLoading(false);
                return;
            };
            
            setLoading(true);

            try {
                // Fetch current video details
                const resVideo = await fetch(`/api/youtube/details?id=${videoId}`);
                const videoData = await resVideo.json();
                setVideoDetails(videoData);

                // Fetch details for the rest of the playlist
                if (playlist.length > 0) {
                    const resPlaylist = await fetch(`/api/youtube/details?id=${playlist.join(',')}`);
                    const playlistData = await resPlaylist.json();
                    setPlaylistDetails(Array.isArray(playlistData) ? playlistData : (playlistData ? [playlistData] : []));
                }
            } catch (error) {
                console.error("Failed to fetch video details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchVideoAndPlaylistDetails();
    }, [videoId, playlistIds]); // Depend on playlistIds to refetch if playlist changes

    const handleVideoEnd: YouTubeProps['onEnd'] = (event) => {
        if (autoNext) {
            playNextVideo();
        }
    };
    
    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        setPlayer(event.target);
    };

    const playNextVideo = () => {
        if (currentIndex > -1 && currentIndex < playlist.length - 1) {
            const nextVideoId = playlist[currentIndex + 1];
            router.push(`/watch?v=${nextVideoId}&playlist=${playlist.join(',')}`);
        }
    };
    
    const togglePictureInPicture = async () => {
        if (!player) return;
        const videoElement = player.getIframe();
    
        if (!videoElement) {
            console.error('Could not get video iframe.');
            return;
        }

        if (document.pictureInPictureElement) {
            try {
                await document.exitPictureInPicture();
            } catch (error) {
                 console.error("Failed to exit Picture-in-Picture mode:", error);
            }
        } else if (document.pictureInPictureEnabled) {
             try {
                // The video element inside the iframe cannot be directly accessed.
                // Requesting PiP on the iframe itself is the standard way.
                await videoElement.requestPictureInPicture();
             } catch (error) {
                console.error("Failed to enter Picture-in-Picture mode:", error);
             }
        } else {
             console.error("Picture-in-Picture is not enabled in this browser.");
        }
    };


    if (loading) {
        return <div className="bg-black text-white h-screen flex items-center justify-center">Loading video...</div>
    }

    if (!videoId) {
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
            // enablejsapi is needed for PiP
            enablejsapi: 1,
            origin: typeof window !== 'undefined' ? window.location.origin : '',
        },
    };

    // Create a map for quick lookups to preserve order
    const videoDetailsMap = new Map(playlistDetails.map(v => [v.id, v]));
    const orderedPlaylistVideos = playlist
      .map(id => videoDetailsMap.get(id))
      .filter((v): v is Video => !!v);

    return (
        <div className="bg-black text-white min-h-screen flex flex-col lg:flex-row">
            {/* Main Content */}
            <div className="flex-1 flex flex-col lg:h-screen lg:overflow-y-hidden">
                 <div className="w-full lg:h-3/5 xl:h-3/4 flex-shrink-0 bg-black">
                    <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} onEnd={handleVideoEnd} className="w-full h-full aspect-video lg:aspect-auto" />
                </div>
                
                <div className="p-4 lg:overflow-y-auto">
                     <button
                        onClick={() => router.push('/')}
                        className="flex lg:hidden items-center gap-2 text-white hover:text-gray-300 transition-colors mb-4"
                    >
                        <ArrowLeft size={20} />
                        <span>Kembali</span>
                    </button>

                    <h1 className="text-xl md:text-2xl font-bold mb-2">{videoDetails?.title}</h1>
                    <div className="flex flex-wrap items-center justify-between text-gray-400 gap-4">
                        <p>{videoDetails?.channelName}</p>
                        <div className="flex items-center space-x-4">
                           <button onClick={togglePictureInPicture} className="flex items-center gap-2 text-sm text-white hover:text-gray-300 transition-colors p-1 rounded-md" aria-label="Toggle Picture in Picture">
                               <PictureInPicture2 size={20} />
                               <span>Minimalkan</span>
                           </button>
                           <div className="flex items-center space-x-2">
                               <Label htmlFor="auto-next" className="text-sm">Auto-Next</Label>
                               <Switch
                                    id="auto-next"
                                    checked={autoNext}
                                    onCheckedChange={setAutoNext}
                                />
                           </div>
                        </div>
                    </div>
                     <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm">{videoDetails?.views}</p>
                        <span className="text-sm">•</span>
                        <p className="text-sm">{videoDetails?.uploadedAt}</p>
                    </div>
                    <div className="mt-4 border-t border-gray-800 pt-4">
                        <p className="text-sm whitespace-pre-wrap">{videoDetails?.description}</p>
                    </div>
                </div>
            </div>

            {/* Playlist Sidebar */}
            <div className="lg:w-96 lg:border-l lg:border-gray-800 flex-shrink-0 lg:h-screen lg:flex lg:flex-col">
                <div className="p-4 border-b border-t lg:border-t-0 border-gray-800 flex justify-between items-center flex-shrink-0">
                    <h2 className="font-bold text-lg">Berikutnya</h2>
                     <button
                        onClick={() => router.push('/')}
                        className="hidden lg:flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span>Kembali</span>
                    </button>
                </div>
                <div className="lg:flex-1 lg:overflow-y-auto">
                    {orderedPlaylistVideos.slice(currentIndex + 1).map(video => (
                        <Link key={video.id} href={`/watch?v=${video.id}&playlist=${playlist.join(',')}`} className="flex gap-3 p-3 hover:bg-gray-800 transition-colors">
                            <div className="relative aspect-video w-32 flex-shrink-0">
                                <Image src={video.thumbnailUrl} alt={video.title} fill className="object-cover rounded-md" />
                                <span className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 py-0.5 rounded">{video.duration}</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-semibold line-clamp-2">{video.title}</h3>
                                <p className="text-xs text-gray-400 mt-1">{video.channelName}</p>
                                <p className="text-xs text-gray-400">{video.views}</p>
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
