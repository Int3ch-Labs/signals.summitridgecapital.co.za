import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        shadow-slate-200/50
        transition-all
        duration-200
        ${className}
      `}
    >
      {children}
    </div>
  );
}