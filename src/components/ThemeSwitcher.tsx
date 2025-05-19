
import { useTheme, Theme } from "@/contexts/ThemeContext";
import { useAchievements } from "@/contexts/AchievementContext";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type ThemeOption = {
  value: Theme;
  label: string;
  emoji: string;
  description: string;
};

const themeOptions: ThemeOption[] = [
  { value: "space", label: "Space", emoji: "🌌", description: "Dark space theme with purple accents" },
  { value: "candyland", label: "Candyland", emoji: "🍭", description: "Bright and sweet with candy colors" },
  { value: "underwater", label: "Underwater", emoji: "🌊", description: "Cool blue underwater world theme" },
];

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const { unlockAchievement } = useAchievements();
  
  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    unlockAchievement("theme_changer");
  };

  return (
    <div className="flex space-x-2">
      <TooltipProvider>
        {themeOptions.map((option) => (
          <Tooltip key={option.value}>
            <TooltipTrigger asChild>
              <Button
                variant={theme === option.value ? "default" : "outline"}
                size="icon"
                onClick={() => handleThemeChange(option.value)}
                className={`relative h-9 w-9 rounded-full ${
                  theme === option.value 
                    ? "ring-2 ring-primary" 
                    : ""
                }`}
              >
                <span className="emoji text-lg">{option.emoji}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{option.label} - {option.description}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
};

export default ThemeSwitcher;
