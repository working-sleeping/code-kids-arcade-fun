
import { useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor";
import { useTheme } from "@/contexts/ThemeContext";

type CodeEditorProps = {
  initialCode: string;
  onChange: (code: string) => void;
};

const CodeEditor = ({ initialCode, onChange }: CodeEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (editorRef.current) {
      const newEditor = monaco.editor.create(editorRef.current, {
        value: initialCode,
        language: "python",
        theme: theme === "space" ? "vs-dark" : "vs",
        minimap: { enabled: false },
        automaticLayout: true,
        fontSize: 16,
        fontFamily: "JetBrains Mono, monospace",
        padding: { top: 16 },
        lineNumbers: "on",
        roundedSelection: true,
        scrollBeyondLastLine: false,
        cursorBlinking: "smooth",
        cursorSmoothCaretAnimation: "on",
      });

      newEditor.onDidChangeModelContent(() => {
        onChange(newEditor.getValue());
      });

      setEditor(newEditor);

      return () => {
        newEditor.dispose();
      };
    }
  }, [initialCode]);

  // Update editor theme when app theme changes
  useEffect(() => {
    if (editor) {
      monaco.editor.setTheme(theme === "space" ? "vs-dark" : "vs");
    }
  }, [theme, editor]);

  return (
    <div 
      ref={editorRef} 
      className="h-full w-full rounded-lg border-2 border-border overflow-hidden animate-slide-up"
      style={{ animation: "slide-up 0.5s ease-out" }}
    />
  );
};

export default CodeEditor;
