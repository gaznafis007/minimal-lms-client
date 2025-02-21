"use client"

import type React from "react"

import { forwardRef } from "react"
import { FaSpinner } from "react-icons/fa"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger"
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
  children: React.ReactNode
  fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      className = "",
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

    const variants = {
      primary: "bg-slate-700 text-white hover:bg-slate-800 focus-visible:ring-blue-600",
      secondary: "bg-gray-600 text-white hover:bg-gray-700 focus-visible:ring-gray-600",
      outline: "border-2 border-gray-300 hover:bg-gray-50 focus-visible:ring-gray-600",
      ghost: "hover:bg-gray-100 focus-visible:ring-gray-600",
      danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600",
    }

    const sizes = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-base",
      lg: "h-12 px-6 text-lg",
    }

    return (
      <button
        ref={ref}
        className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading && <FaSpinner className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"

