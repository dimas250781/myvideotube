import { videos, type Video } from '@/lib/data';
import { VideoGrid } from '@/components/video-grid';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Search } from 'lucide-react';

type ResultsPageProps = {
  searchParams: { q?: string };
};

export default function ResultsPage({ searchParams }: ResultsPageProps) {
  const query = searchParams.q || '';
  const results: Video[] = query
    ? videos.filter(video =>
        video.title.toLowerCase().includes(query.toLowerCase()) ||
        video.channelName.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div>
      {query ? (
        results.length > 0 ? (
          <VideoGrid videos={results} title={`Results for "${query}"`} />
        ) : (
          <Alert className="max-w-md mx-auto">
            <Search className="h-4 w-4" />
            <AlertTitle>No results found</AlertTitle>
            <AlertDescription>
              Your search for "{query}" did not return any results. Please try a different query.
            </AlertDescription>
          </Alert>
        )
      ) : (
        <Alert className="max-w-md mx-auto">
            <Search className="h-4 w-4" />
            <AlertTitle>Search for videos</AlertTitle>
            <AlertDescription>
              Use the search bar at the top to find videos.
            </AlertDescription>
          </Alert>
      )}
    </div>
  );
}
