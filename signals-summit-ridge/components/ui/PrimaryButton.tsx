import Link from "next/link";
import React from "react";

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
}

export default function PrimaryButton({
  children,
  href,
  className = "",
  type = "button",
  ...props
}: PrimaryButtonProps) {
  const styles = `
    inline-flex
    min-h-11
    items-center
    justify-center
    rounded-xl
    bg-blue-600
    px-5
    py-2.5
    text-sm
    font-semibold
    text-white
    shadow-sm
    shadow-blue-600/20
    transition-all
    duration-200
    hover:bg-blue-700
    hover:shadow-lg
    hover:shadow-blue-600/20
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