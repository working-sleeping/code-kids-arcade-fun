
import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";

type BuddyState = "idle" | "happy" | "thinking" | "celebrating";
type BuddyEmoji = "🐱" | "🦄" | "🐙";

const CodeBuddy = ({ codeRunning }: { codeRunning: boolean }) => {
  const [state, setState] = useState<BuddyState>("idle");
  const [message, setMessage] = useState<string>("");
  const { theme } = useTheme();
  
  // Select buddy based on theme
  const getBuddyEmoji = (): BuddyEmoji => {
    switch (theme) {
      case "space": return "🐱";
      case "candyland": return "🦄";
      case "underwater": return "🐙";
      default: return "🐱";
    }
  };

  // Messages for different states
  const messages = {
    idle: [
      "Ready to code?",
      "Try writing a loop!",
      "What will you create today?",
      "Coding is fun!",
      "Let's make something awesome!"
    ],
    happy: [
      "Great job! ✨",
      "That was amazing! 🎉",
      "You're a coding star! 🌟",
      "Code ran perfectly! 🚀",
      "Woohoo! It worked! 👏"
    ],
    thinking: [
      "Running your code...",
      "Let's see what happens...",
      "Computing...",
      "Thinking...",
      "Processing..."
    ],
    celebrating: [
      "You earned an achievement! 🏆",
      "Level up! You're awesome! 🎖️",
      "New badge unlocked! 🎁",
      "Achievement get! 🌈",
      "Super coding skills! 🌟"
    ]
  };

  // Update buddy state based on code running status
  useEffect(() => {
    if (codeRunning) {
      setState("thinking");
      setMessage(messages.thinking[Math.floor(Math.random() * messages.thinking.length)]);
    } else {
      // When code finishes running, show happy state temporarily
      setState("happy");
      setMessage(messages.happy[Math.floor(Math.random() * messages.happy.length)]);
      
      // Return to idle state after 3 seconds
      const timer = setTimeout(() => {
        setState("idle");
        setMessage(messages.idle[Math.floor(Math.random() * messages.idle.length)]);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [codeRunning]);

  // Set a random idle message every 10 seconds when in idle state
  useEffect(() => {
    if (state === "idle") {
      const interval = setInterval(() => {
        setMessage(messages.idle[Math.floor(Math.random() * messages.idle.length)]);
      }, 10000);
      
      return () => clearInterval(interval);
    }
  }, [state]);

  // Initialize with a random idle message
  useEffect(() => {
    setMessage(messages.idle[Math.floor(Math.random() * messages.idle.length)]);
  }, []);

  // Show celebration state when an achievement is unlocked
  const showCelebration = () => {
    setState("celebrating");
    setMessage(messages.celebrating[Math.floor(Math.random() * messages.celebrating.length)]);
    
    setTimeout(() => {
      setState("idle");
      setMessage(messages.idle[Math.floor(Math.random() * messages.idle.length)]);
    }, 5000);
  };

  return (
    <div className="fixed bottom-4 right-4 flex items-end">
      <div className={`speech-bubble bg-primary text-primary-foreground max-w-[200px] mb-2 mr-2 shadow-lg animate-bounce-small ${state === "idle" ? "animate-pulse" : ""}`}>
        <p className="text-sm font-medium">{message}</p>
      </div>
      <div className={`w-16 h-16 flex items-center justify-center text-4xl rounded-full bg-card shadow-lg border-2 border-primary
        ${state === "thinking" ? "animate-spin" : ""} 
        ${state === "happy" ? "animate-bounce" : ""} 
        ${state === "celebrating" ? "animate-pulse" : ""}`}>
        <span className="emoji">{getBuddyEmoji()}</span>
      </div>
    </div>
  );
};

export default CodeBuddy;
