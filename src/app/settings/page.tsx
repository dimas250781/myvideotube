import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Settings } from "lucide-react";

export default function SettingsPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Settings</h1>
            <Alert>
                <Settings className="h-4 w-4" />
                <AlertTitle>Coming Soon!</AlertTitle>
                <AlertDescription>
                User settings will be available here.
                </AlertDescription>
            </Alert>
        </div>
    );
}
