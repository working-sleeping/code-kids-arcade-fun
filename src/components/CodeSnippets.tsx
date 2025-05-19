
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookOpen } from "lucide-react";

type Snippet = {
  name: string;
  description: string;
  code: string;
  emoji: string;
};

const snippets: Snippet[] = [
  {
    name: "Hello World",
    description: "Start with the basics",
    emoji: "👋",
    code: '# Simple Hello World Program\nprint("Hello, World! 👋")',
  },
  {
    name: "Name Input",
    description: "Get user's name and say hello",
    emoji: "📝",
    code: '# Ask for user\'s name\nname = input("What\'s your name? ")\nprint(f"Hello, {name}! Nice to meet you! 😊")',
  },
  {
    name: "Number Guessing",
    description: "Guess a random number",
    emoji: "🎮",
    code: '# Number guessing game\nimport random\n\nsecret = random.randint(1, 10)\n\nprint("I\'m thinking of a number between 1 and 10 🤔")\nguess = int(input("Your guess: "))\n\nif guess == secret:\n    print("You got it! 🎉")\nelse:\n    print(f"Not quite. The number was {secret} 🙂")',
  },
  {
    name: "For Loop",
    description: "Make a loop pattern",
    emoji: "🔄",
    code: '# Create a colorful pattern with loops\nfor i in range(1, 6):\n    print("🌈 " * i)',
  },
  {
    name: "Animal Sounds",
    description: "Simple dictionary example",
    emoji: "🐱",
    code: '# Dictionary of animal sounds\nanimals = {\n    "cat": "meow 🐱",\n    "dog": "woof 🐶",\n    "cow": "moo 🐮",\n    "duck": "quack 🦆"\n}\n\n# Ask for an animal\nanimal = input("Type an animal name: ").lower()\n\nif animal in animals:\n    print(f"The {animal} says {animals[animal]}")\nelse:\n    print("I don\'t know that animal! 🤔")',
  },
];

type CodeSnippetsProps = {
  onSelect: (code: string) => void;
};

const CodeSnippets = ({ onSelect }: CodeSnippetsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (code: string) => {
    onSelect(code);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          <span>Snippets</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Code Snippets</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {snippets.map((snippet) => (
          <DropdownMenuItem 
            key={snippet.name}
            onClick={() => handleSelect(snippet.code)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="emoji text-xl">{snippet.emoji}</span>
            <div>
              <div className="font-medium">{snippet.name}</div>
              <div className="text-xs text-muted-foreground">{snippet.description}</div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CodeSnippets;
