
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, RocketLaunch } from "lucide-react";
import { useAchievements } from "@/contexts/AchievementContext";
import { useTheme } from "@/contexts/ThemeContext";

type RunButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

const RunButton = ({ onClick, disabled = false }: RunButtonProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const { unlockAchievement } = useAchievements();
  const { theme } = useTheme();

  // Get theme-specific button styles
  const getButtonStyles = () => {
    switch (theme) {
      case "space":
        return "bg-primary hover:bg-primary/80";
      case "candyland":
        return "bg-gradient-to-r from-candyland-primary to-candyland-accent hover:from-candyland-accent hover:to-candyland-primary";
      case "underwater":
        return "bg-gradient-to-r from-underwater-primary to-underwater-accent hover:from-underwater-accent hover:to-underwater-primary";
      default:
        return "bg-primary hover:bg-primary/80";
    }
  };

  const handleClick = () => {
    if (disabled) return;
    
    setIsAnimating(true);
    
    // Check for first run achievement
    unlockAchievement("first_run");
    
    // Run the code after animation
    setTimeout(() => {
      onClick();
      setIsAnimating(false);
    }, 500);
  };

  return (
    <Button
      className={`flex items-center gap-2 font-bold text-white ${getButtonStyles()}
        ${isAnimating ? "animate-bounce-small" : ""}`}
      onClick={handleClick}
      disabled={disabled || isAnimating}
      size="lg"
    >
      {isAnimating ? (
        <RocketLaunch className="w-5 h-5" />
      ) : (
        <Play className="w-5 h-5" />
      )}
      {isAnimating ? "Launching!" : "Run Code"} {isAnimating ? "🚀" : "🎮"}
    </Button>
  );
};

export default RunButton;
