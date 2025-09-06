import React from "react";

interface NewGameButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export function NewGameButton({ onClick, children }: NewGameButtonProps) {
  return (
    <button
      onClick={onClick}
      className="font-pressstart tracking-[0.05em] leading-[1.6] text-[30px] text-center text-[#f4a45d] rounded-2xl border-4 border-[#f4a45d] py-3 px-6 cursor-pointer block mx-auto bg-transparent transition-all duration-300 ease-in-out hover:bg-[rgba(244,164,93,0.1)] hover:scale-105"
    >
      {children}
    </button>
  );
}
