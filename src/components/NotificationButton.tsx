"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { BellRing } from "lucide-react";
import { useEffect, useState } from "react";

export function NotificationButton() {
    const { toast } = useToast();
    const [permission, setPermission] = useState<"default" | "denied" | "granted">("default");

    useEffect(() => {
        if ("Notification" in window) {
            setPermission(Notification.permission);
        }
    }, []);

    const handleRequestPermission = async () => {
        if (!("Notification" in window)) {
            toast({
                title: "Unsupported Browser",
                description: "This browser does not support desktop notifications.",
                variant: "destructive",
            });
            return;
        }

        if (Notification.permission === "granted") {
             toast({
                title: "Notifications Already Enabled",
                description: "You will be reminded to complete your exercises.",
            });
            return;
        }

        if (Notification.permission === "denied") {
            toast({
                title: "Permission Denied",
                description: "Please enable notifications in your browser settings.",
                variant: "destructive",
            });
            return;
        }

        const result = await Notification.requestPermission();
        setPermission(result);
        if (result === 'granted') {
            toast({
                title: "Notifications Enabled!",
                description: "You'll receive reminders for your workouts. Great job!",
            });
             new Notification("FitFlow Reminders", {
                body: "Thanks for enabling notifications! We'll help you stay on track.",
            });
        } else {
             toast({
                title: "Notifications Not Enabled",
                description: "You can enable them anytime later.",
            });
        }
    }

    if (permission === 'granted' || typeof window === 'undefined' || !('Notification' in window)) {
        return null; // Don't show the button if already granted or not supported
    }

    return (
        <Button onClick={handleRequestPermission} variant="outline" size="sm">
            <BellRing className="mr-2 h-4 w-4" />
            Enable Reminders
        </Button>
    )
}
