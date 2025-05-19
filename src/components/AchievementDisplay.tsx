
import { useState } from "react";
import { useAchievements, Achievement } from "@/contexts/AchievementContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Award } from "lucide-react";

const AchievementDisplay = () => {
  const { achievements } = useAchievements();
  const [isOpen, setIsOpen] = useState(false);
  
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Award className="w-4 h-4" />
          <span className="font-medium">{unlockedCount}/{achievements.length}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <span className="emoji">🏆</span> Achievements
          </DialogTitle>
          <DialogDescription>
            Complete coding challenges to earn all badges!
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 gap-4 py-4">
          {achievements.map((achievement) => (
            <AchievementItem 
              key={achievement.id}
              achievement={achievement}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const AchievementItem = ({ achievement }: { achievement: Achievement }) => {
  return (
    <div 
      className={`p-4 rounded-lg border flex items-center gap-4 transition-all ${
        achievement.unlocked 
          ? "bg-primary/10 border-primary" 
          : "bg-muted/50 border-border"
      }`}
    >
      <div className="text-3xl emoji">
        {achievement.unlocked ? achievement.emoji : "🔒"}
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-base">{achievement.name}</h3>
        <p className={`text-sm ${achievement.unlocked ? "text-foreground/80" : "text-muted-foreground"}`}>
          {achievement.description}
        </p>
      </div>
    </div>
  );
};

export default AchievementDisplay;
