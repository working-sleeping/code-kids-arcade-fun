
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useAchievements } from "@/contexts/AchievementContext";

type RunButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

const RunButton = ({ onClick, disabled = false }: RunButtonProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const { unlockAchievement } = useAchievements();

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
      className={`flex items-center gap-2 font-bold ${isAnimating ? "animate-bounce-small" : ""}`}
      onClick={handleClick}
      disabled={disabled || isAnimating}
      size="lg"
    >
      <Play className="w-5 h-5" />
      Run Code
    </Button>
  );
};

export default RunButton;
