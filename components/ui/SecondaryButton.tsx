import Link from "next/link";
import React from "react";

interface SecondaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
}

export default function SecondaryButton({
  children,
  href,
  className = "",
  type = "button",
  ...props
}: SecondaryButtonProps) {
  const styles = `
    inline-flex
    min-h-11
    items-center
    justify-center
    rounded-xl
    border
    border-slate-200
    bg-white
    px-5
    py-2.5
    text-sm
    font-semibold
    text-slate-700
    shadow-sm
    transition-all
    duration-200
    hover:border-blue-200
    hover:bg-blue-50
    hover:text-blue-700
    hover:shadow-md
    active:scale-[0.98]
    focus:outline-none
    focus:ring-2
    focus:ring-blue-500
    focus:ring-offset-2
    disabled:cursor-not-allowed
    disabled:opacity-50
    ${className}
  `;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={styles}
      {...props}
    >
      {children}
    </button>
  );
}