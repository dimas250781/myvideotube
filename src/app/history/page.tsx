import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { History } from "lucide-react";

export default function HistoryPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">History</h1>
            <Alert>
                <History className="h-4 w-4" />
                <AlertTitle>Your history is empty.</AlertTitle>
                <AlertDescription>
                Videos you watch will appear here.
                </AlertDescription>
            </Alert>
        </div>
    );
}
