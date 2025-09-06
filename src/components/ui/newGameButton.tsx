import React from "react";

interface NewGameButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export function NewGameButton({ onClick, children }: NewGameButtonProps) {
  return (
    <button onClick={onClick} className="newGameButton">
      {children}
    </button>
  );
}
