import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type HelpTooltip = {
  id: string;
  title: string;
  description: string;
  emoji: string;
};

const tooltips: HelpTooltip[] = [
  {
    id: "welcome",
    title: "Welcome to FunCoder!",
    description: "This is your Python playground where you can write and run code. Click on the snippets menu to try some examples!",
    emoji: "👋",
  },
  {
    id: "run_code",
    title: "Run Your Code",
    description: "Click the 'Run Code' button to see your program in action. The output will appear in the terminal below.",
    emoji: "▶️",
  },
  {
    id: "themes",
    title: "Change Themes",
    description: "You can change the look of your coding environment with the theme buttons in the top right.",
    emoji: "🎨",
  },
  {
    id: "achievements",
    title: "Earn Achievements",
    description: "Complete coding challenges to unlock special badges! Check your progress by clicking the trophy icon.",
    emoji: "🏆",
  },
];

const HelpTooltip = () => {
  const [open, setOpen] = useState(false);
  const [currentTooltip, setCurrentTooltip] = useState<HelpTooltip | null>(null);
  const [tooltipIndex, setTooltipIndex] = useState(0);
  
  useEffect(() => {
    // Check if this is the first visit
    const hasSeenTooltips = localStorage.getItem("funcoder_has_seen_tooltips");
    
    if (!hasSeenTooltips) {
      // Show the first tooltip after a short delay
      const timer = setTimeout(() => {
        setCurrentTooltip(tooltips[0]);
        setOpen(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const handleNext = () => {
    // If we're at the last tooltip, close and save to localStorage
    if (tooltipIndex >= tooltips.length - 1) {
      setOpen(false);
      localStorage.setItem("funcoder_has_seen_tooltips", "true");
      return;
    }
    
    // Otherwise, move to the next tooltip
    const nextIndex = tooltipIndex + 1;
    setTooltipIndex(nextIndex);
    setCurrentTooltip(tooltips[nextIndex]);
  };
  
  if (!currentTooltip) return null;
  
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-2xl">
            <span className="emoji text-2xl">{currentTooltip.emoji}</span>
            {currentTooltip.title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            {currentTooltip.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleNext} className="font-medium">
            {tooltipIndex >= tooltips.length - 1 ? "Got it!" : "Next tip"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default HelpTooltip;
