
import { useEffect, useState } from "react";

type ConfettiProps = {
  show: boolean;
};

type ConfettiPiece = {
  id: number;
  x: number;
  delay: number;
  color: string;
  size: number;
};

const colors = ["#FF6B6B", "#4ECDC4", "#FFD166", "#06D6A0", "#118AB2"];

const Confetti = ({ show }: ConfettiProps) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (show) {
      const newPieces = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100, // random position across screen
        delay: Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 0.7 + 0.3, // size between 0.3 and 1
      }));
      
      setPieces(newPieces);
      
      // Clean up after animation completes
      const timer = setTimeout(() => {
        setPieces([]);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [show]);
  
  if (!show && pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute top-0 animate-confetti-drop"
          style={{
            left: `${piece.x}%`,
            backgroundColor: piece.color,
            width: `${piece.size * 15}px`,
            height: `${piece.size * 15}px`,
            borderRadius: Math.random() > 0.5 ? "50%" : "0",
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
