import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Flame } from "lucide-react";

export default function TrendingPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Trending</h1>
            <Alert>
                <Flame className="h-4 w-4" />
                <AlertTitle>Coming Soon!</AlertTitle>
                <AlertDescription>
                Trending videos will be shown here.
                </AlertDescription>
            </Alert>
        </div>
    );
}
