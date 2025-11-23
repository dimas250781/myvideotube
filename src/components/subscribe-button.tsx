'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Bell } from 'lucide-react';

export default function SubscribeButton() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  return (
    <Button
      variant={isSubscribed ? 'secondary' : 'default'}
      onClick={() => setIsSubscribed(!isSubscribed)}
      className="ml-4 rounded-full"
    >
      {isSubscribed && <Bell className="mr-2 h-4 w-4" />}
      {isSubscribed ? 'Subscribed' : 'Subscribe'}
    </Button>
  );
}
