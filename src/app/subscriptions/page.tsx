import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Clapperboard } from "lucide-react";

export default function SubscriptionsPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Subscriptions</h1>
            <Alert>
                <Clapperboard className="h-4 w-4" />
                <AlertTitle>No videos yet!</AlertTitle>
                <AlertDescription>
                Videos from your subscribed channels will appear here. For now, check out the home page for recommendations!
                </AlertDescription>
            </Alert>
        </div>
    );
}
