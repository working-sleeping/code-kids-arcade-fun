
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { toast } from "sonner";

export type Achievement = {
  id: string;
  name: string;
  description: string;
  emoji: string;
  unlocked: boolean;
};

type AchievementContextType = {
  achievements: Achievement[];
  unlockAchievement: (id: string) => void;
  hasUnlockedAchievement: (id: string) => boolean;
};

const initialAchievements: Achievement[] = [
  {
    id: "first_run",
    name: "Code Explorer",
    description: "Run your first Python program",
    emoji: "🚀",
    unlocked: false,
  },
  {
    id: "loop_legend",
    name: "Loop Legend",
    description: "Created a program with a loop",
    emoji: "🔄",
    unlocked: false,
  },
  {
    id: "debug_hero",
    name: "Debug Hero",
    description: "Fixed an error in your code",
    emoji: "🐞",
    unlocked: false,
  },
  {
    id: "input_master",
    name: "Input Master",
    description: "Created a program that uses input()",
    emoji: "⌨️",
    unlocked: false,
  },
  {
    id: "theme_changer",
    name: "Theme Changer",
    description: "Changed the coding environment theme",
    emoji: "🎨",
    unlocked: false,
  },
];

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

export const AchievementProvider = ({ children }: { children: ReactNode }) => {
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  
  const unlockAchievement = (id: string) => {
    setAchievements((currentAchievements) => {
      const updatedAchievements = currentAchievements.map((achievement) => {
        if (achievement.id === id && !achievement.unlocked) {
          toast.success(`🏆 Achievement Unlocked: ${achievement.name}`, {
            description: achievement.description,
            icon: <span className="text-xl">{achievement.emoji}</span>,
          });
          return { ...achievement, unlocked: true };
        }
        return achievement;
      });
      
      return updatedAchievements;
    });
  };
  
  const hasUnlockedAchievement = (id: string) => {
    return achievements.some(achievement => achievement.id === id && achievement.unlocked);
  };
  
  return (
    <AchievementContext.Provider value={{ achievements, unlockAchievement, hasUnlockedAchievement }}>
      {children}
    </AchievementContext.Provider>
  );
};

export const useAchievements = () => {
  const context = useContext(AchievementContext);
  if (context === undefined) {
    throw new Error("useAchievements must be used within an AchievementProvider");
  }
  return context;
};
