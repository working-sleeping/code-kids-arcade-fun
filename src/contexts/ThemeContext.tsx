
import { createContext, useContext, useState, ReactNode } from "react";

export type Theme = "space" | "candyland" | "underwater";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("space");
  
  const updateTheme = (newTheme: Theme) => {
    document.documentElement.classList.remove(`theme-${theme}`);
    if (newTheme !== "space") {
      document.documentElement.classList.add(`theme-${newTheme}`);
    }
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
