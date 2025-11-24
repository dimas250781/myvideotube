export type Video = {
  id: string;
  title: string;
  thumbnailUrl: string; // Changed from thumbnailId
  duration: string;
  channelName: string;
  channelId: string;
  views: string;
  uploadedAt: string;
  description: string;
  category: string;
  channelAvatarUrl?: string; // Add this to hold the channel avatar
};

export type Channel = {
  id: string;
  name: string;
  avatarId: string;
  subscribers: string;
};

// This data is now fetched from the YouTube API, so we can clear it.
export const channels: Channel[] = [];
export const videos: Video[] = [];
