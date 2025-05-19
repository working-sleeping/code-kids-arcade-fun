
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Gamepad, Award } from "lucide-react";
import { useAchievements } from "@/contexts/AchievementContext";

type Game = {
  id: string;
  title: string;
  description: string;
  emoji: string;
  code: string;
  challenge: string;
  hint: string;
  solution: string;
  achievementId: string;
};

const games: Game[] = [
  {
    id: "game1",
    title: "Loop the Planets",
    description: "Create a loop to print all the planets",
    emoji: "🪐",
    code: "# List of planets\nplanets = ['Mercury', 'Venus', 'Earth', 'Mars',\n          'Jupiter', 'Saturn', 'Uranus', 'Neptune']\n\n# CHALLENGE: Use a for loop to print each planet name\n# Write your code here:\n\n",
    challenge: "Use a for loop to print all the planets in the list",
    hint: "Try using: for planet in planets:",
    solution: "for planet in planets:\n    print(planet)",
    achievementId: "loop_legend"
  },
  {
    id: "game2",
    title: "Guess the Number",
    description: "Create a number guessing game",
    emoji: "🎮",
    code: "# Number guessing game\nimport random\n\n# Secret number between 1 and 10\nsecret = random.randint(1, 10)\n\n# CHALLENGE: Ask the user to guess the number using input()\n# and tell them if they guessed correctly\n# Write your code here:\n\n",
    challenge: "Use input() to get the user's guess and compare it to the secret number",
    hint: "Remember to convert the input to an integer with int(input())",
    solution: "guess = int(input(\"Guess a number between 1 and 10: \"))\nif guess == secret:\n    print(\"You got it! 🎉\")\nelse:\n    print(f\"Not quite. The number was {secret} 🙂\")",
    achievementId: "input_master"
  },
  {
    id: "game3",
    title: "Emoji Translator",
    description: "Create a dictionary to translate words to emojis",
    emoji: "📚",
    code: "# Emoji translator\n\n# CHALLENGE: Create a dictionary mapping words to emojis\n# and use it to translate user input\n# Write your code here:\n\n",
    challenge: "Create a dictionary with words as keys and emojis as values, then use input() to translate words",
    hint: "Start with: emojis = {'happy': '😊', 'sad': '😢'}",
    solution: "emojis = {\n    'happy': '😊',\n    'sad': '😢',\n    'love': '❤️',\n    'cat': '🐱',\n    'dog': '🐶'\n}\n\nword = input(\"Enter a word to translate: \").lower()\n\nif word in emojis:\n    print(f\"{word} = {emojis[word]}\")\nelse:\n    print(\"I don't know that word yet! 🤔\")",
    achievementId: "debug_hero"
  }
];

const CodingGames = ({ onSelectGame }: { onSelectGame: (code: string) => void }) => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { unlockAchievement } = useAchievements();

  const handleSelectGame = (game: Game) => {
    setSelectedGame(game);
    onSelectGame(game.code);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Gamepad className="w-4 h-4" />
          <span>Games</span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <span className="emoji">🎮</span> Code Games
          </DialogTitle>
          <DialogDescription>
            Fun coding challenges to learn Python! Complete them to earn achievements.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {games.map((game) => (
            <Card key={game.id} className="overflow-hidden transition-all duration-300 hover:shadow-md hover:scale-[1.01]">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <span className="emoji text-xl">{game.emoji}</span> {game.title}
                    </CardTitle>
                    <CardDescription>{game.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Challenge:</strong> {game.challenge}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <p className="flex items-center gap-1">
                  <Award className="w-4 h-4" /> <span className="text-xs">Earns achievement</span>
                </p>
                <Button size="sm" onClick={() => handleSelectGame(game)}>
                  Play Game
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CodingGames;
