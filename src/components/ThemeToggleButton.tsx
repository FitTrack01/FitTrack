"use client";

import *
as React from "react"
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast";

type Theme = "dark" | "light" | "system";

export function ThemeToggleButton() {
  const { toast } = useToast();
  const [theme, setThemeState] = React.useState<Theme>("system");
   const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
    const isDarkMode = document.documentElement.classList.contains("dark")
    setThemeState(isDarkMode ? "dark" : "light")
  }, [])

  const setTheme = (theme: Theme) => {
    if (
      theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.classList.add("dark")
    } else if (theme === 'dark') {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    setThemeState(theme);
    toast({
        title: "Theme Changed",
        description: `Switched to ${theme.charAt(0).toUpperCase() + theme.slice(1)} mode.`,
    })
  }

  if (!isClient) {
      return null;
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
       <span className="ml-2">Toggle Theme</span>
    </Button>
  )
}
