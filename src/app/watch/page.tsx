'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Suspense } from 'react';

function WatchPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const videoId = searchParams.get('v');

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
    
    return (
        <div className="bg-black min-h-screen">
            <div className="fixed top-0 left-0 right-0 z-10 p-4 bg-black bg-opacity-80 backdrop-blur-sm">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
                >
                    <ArrowLeft size={20} />
                    <span>Back</span>
                </button>
            </div>
            <div className="flex justify-center items-center h-screen">
                <div className="w-full max-w-4xl aspect-video">
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                    ></iframe>
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
