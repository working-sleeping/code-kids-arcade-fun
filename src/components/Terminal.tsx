
import { useEffect, useRef } from "react";
import { Terminal as XTerm } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

type TerminalProps = {
  output: string;
  input: (data: string) => void;
};

const Terminal = ({ output, input }: TerminalProps) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    // Initialize terminal
    const term = new XTerm({
      cursorBlink: true,
      fontSize: 16,
      fontFamily: "JetBrains Mono, monospace",
      theme: {
        background: "#1E1E2E",
        foreground: "#CDD6F4",
        cursor: "#F5E0DC",
      },
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    // Store references
    xtermRef.current = term;
    fitAddonRef.current = fitAddon;

    // Attach to DOM
    term.open(terminalRef.current);
    fitAddon.fit();

    // Handle terminal input
    term.onData((data) => {
      input(data);
    });

    // Handle window resizing
    const handleResize = () => {
      if (fitAddonRef.current) {
        fitAddonRef.current.fit();
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      if (xtermRef.current) {
        xtermRef.current.dispose();
      }
    };
  }, [input]);

  // Process new output
  useEffect(() => {
    if (xtermRef.current && output) {
      xtermRef.current.write(output);
    }
  }, [output]);

  return (
    <div 
      ref={terminalRef}
      className="h-full w-full rounded-lg border-2 border-border overflow-hidden animate-slide-up"
      style={{ animation: "slide-up 0.7s ease-out" }}
    />
  );
};

export default Terminal;
