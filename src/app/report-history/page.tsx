import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Flag } from "lucide-react";

export default function ReportHistoryPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Report History</h1>
            <Alert>
                <Flag className="h-4 w-4" />
                <AlertTitle>No reports found.</AlertTitle>
                <AlertDescription>
                Your submitted reports will appear here.
                </AlertDescription>
            </Alert>
        </div>
    );
}
