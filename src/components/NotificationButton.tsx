"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useWorkoutPlan } from "@/hooks/use-workout-plan";
import { BellRing } from "lucide-react";
import { useEffect, useState } from "react";

const NOTIFICATION_TIME = 9; // 9 AM
const REMINDER_STORAGE_KEY = 'fittrack-reminder-scheduled';

export function NotificationButton() {
    const { toast } = useToast();
    const [permission, setPermission] = useState<"default" | "denied" | "granted">("default");
    const [isClient, setIsClient] = useState(false);
    const { activePlan } = useWorkoutPlan();

    useEffect(() => {
        setIsClient(true);
        if ("Notification" in window) {
            setPermission(Notification.permission);
        }
    }, []);

    useEffect(() => {
        if (isClient && permission === "granted" && activePlan) {
            scheduleDailyReminder();
        }
    }, [isClient, permission, activePlan]);


    const scheduleDailyReminder = () => {
        const lastScheduled = localStorage.getItem(REMINDER_STORAGE_KEY);
        const today = new Date().toISOString().split('T')[0];

        if (lastScheduled === today) {
            // Already scheduled for today
            return;
        }

        const now = new Date();
        const notificationDate = new Date();
        notificationDate.setHours(NOTIFICATION_TIME, 0, 0, 0);

        let timeoutMs;
        if (now > notificationDate) {
            // If it's past 9 AM, schedule for tomorrow
            notificationDate.setDate(notificationDate.getDate() + 1);
            timeoutMs = notificationDate.getTime() - now.getTime();
        } else {
            // Schedule for today
            timeoutMs = notificationDate.getTime() - now.getTime();
        }
        
        setTimeout(() => {
            new Notification("FitTrack Workout Reminder", {
                body: "Time for your daily workout! Let's get moving.",
                icon: "/favicon.ico",
            });
            localStorage.setItem(REMINDER_STORAGE_KEY, new Date().toISOString().split('T')[0]);
            // Re-schedule for the next day
            setInterval(() => {
                 new Notification("FitTrack Workout Reminder", {
                    body: "Time for your daily workout! Let's get moving.",
                    icon: "/favicon.ico",
                });
                localStorage.setItem(REMINDER_STORAGE_KEY, new Date().toISOString().split('T')[0]);
            }, 24 * 60 * 60 * 1000);
        }, timeoutMs);
        
        toast({
            title: "Daily Reminders Set",
            description: `You'll be reminded at ${NOTIFICATION_TIME}:00 AM for your workout.`,
        });
    };

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
            if (activePlan) {
                scheduleDailyReminder();
            }
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
             new Notification("FitTrack Reminders", {
                body: "Thanks for enabling notifications! We'll help you stay on track.",
            });
            if (activePlan) {
                scheduleDailyReminder();
            }
        } else {
             toast({
                title: "Notifications Not Enabled",
                description: "You can enable them anytime later.",
            });
        }
    }

    if (!isClient || permission === 'granted' || !('Notification' in window)) {
        return null;
    }

    return (
        <Button onClick={handleRequestPermission} variant="outline" size="sm">
            <BellRing className="mr-2 h-4 w-4" />
            Enable Reminders
        </Button>
    )
}
