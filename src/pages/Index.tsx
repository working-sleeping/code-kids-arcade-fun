
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AchievementProvider, useAchievements } from "@/contexts/AchievementContext";

// Components
import CodeEditor from "@/components/CodeEditor";
import Terminal from "@/components/Terminal";
import RunButton from "@/components/RunButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import AchievementDisplay from "@/components/AchievementDisplay";
import CodeSnippets from "@/components/CodeSnippets";
import Confetti from "@/components/Confetti";
import HelpTooltip from "@/components/HelpTooltip";

// Mock execution service (in real app this would call a backend)
const executePythonCode = async (code: string, input: string = ""): Promise<string> => {
  // This is a mock implementation - in production this would call a real backend
  console.log("Executing code:", code);
  console.log("With input:", input);
  
  // Simple detection for input() to show proper achievements
  const hasInput = code.includes("input(");
  const hasLoop = code.includes("for ") || code.includes("while ");
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate execution result
      if (code.trim() === "") {
        resolve("Error: Please write some code first!");
        return;
      }
      
      // Check for simple errors
      if (code.includes("print(") && !code.includes(")")) {
        return resolve("Error: Missing closing parenthesis in print statement");
      }
      
      // Simple mock output generator based on code content
      if (code.includes("print(")) {
        const printMatch = code.match(/print\(['"](.*?)['"].*?\)/);
        if (printMatch) {
          return resolve(printMatch[1] + "\n");
        }
      }
      
      if (hasInput && input) {
        return resolve(`You entered: ${input}\n`);
      }
      
      if (hasLoop) {
        let output = "";
        const count = Math.min(5, parseInt(code.match(/range\((\d+)/)?.[1] || "3"));
        for (let i = 0; i < count; i++) {
          output += `Loop iteration ${i+1}\n`;
        }
        return resolve(output);
      }
      
      resolve("Program executed successfully!\n");
    }, 500);
  });
};

const MainApp = () => {
  const [code, setCode] = useState("# Welcome to FunCoder!\n# Write your Python code here and click Run Code\n\nprint(\"Hello, world! 🚀\")");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [inputBuffer, setInputBuffer] = useState("");
  const { unlockAchievement } = useAchievements();
  
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    
    // Check for achievements
    if (newCode.includes("for ") || newCode.includes("while ")) {
      unlockAchievement("loop_legend");
    }
    
    if (newCode.includes("input(")) {
      unlockAchievement("input_master");
    }
  };
  
  const handleSelectSnippet = (snippetCode: string) => {
    setCode(snippetCode);
  };
  
  const handleRun = async () => {
    setIsRunning(true);
    setOutput("> Running your code...\n\n");
    
    try {
      const result = await executePythonCode(code, inputBuffer);
      
      if (result.startsWith("Error:")) {
        setOutput((prev) => prev + result + "\n");
        unlockAchievement("debug_hero");
      } else {
        setOutput((prev) => prev + result);
        setShowConfetti(true);
        
        // Hide confetti after 3 seconds
        setTimeout(() => {
          setShowConfetti(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Code execution error:", error);
      setOutput((prev) => prev + "Error executing code.\n");
      toast.error("There was an error running your code");
    } finally {
      setIsRunning(false);
    }
  };
  
  const handleTerminalInput = (data: string) => {
    // Echo input character to terminal
    setOutput((prev) => prev + data);
    setInputBuffer((prev) => prev + data);
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col p-4 md:p-6 transition-colors duration-300">
      <HelpTooltip />
      <Confetti show={showConfetti} />
      
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl md:text-3xl font-bold">
            Fun<span className="text-primary">Coder</span>
          </h1>
          <span className="emoji text-xl">🐍</span>
        </div>
        
        <div className="flex items-center gap-3">
          <CodeSnippets onSelect={handleSelectSnippet} />
          <AchievementDisplay />
          <ThemeSwitcher />
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex-1 grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-4 md:gap-6 h-[calc(100vh-8rem)]">
        {/* Code Editor Section */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-medium flex items-center gap-2">
              <span className="emoji">📝</span> Code Editor
            </h2>
            <RunButton onClick={handleRun} disabled={isRunning} />
          </div>
          <div className="flex-1 min-h-0">
            <CodeEditor initialCode={code} onChange={handleCodeChange} />
          </div>
        </div>
        
        {/* Terminal Section */}
        <div className="flex flex-col">
          <h2 className="text-lg font-medium mb-3 flex items-center gap-2">
            <span className="emoji">💻</span> Terminal
          </h2>
          <div className="flex-1 min-h-0">
            <Terminal output={output} input={handleTerminalInput} />
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-6 text-center text-sm text-muted-foreground">
        <p>Made with <span className="emoji">❤️</span> for young coders | FunCoder © 2025</p>
      </footer>
    </div>
  );
};

// Wrapper with providers
const Index = () => (
  <ThemeProvider>
    <AchievementProvider>
      <MainApp />
    </AchievementProvider>
  </ThemeProvider>
);

export default Index;
