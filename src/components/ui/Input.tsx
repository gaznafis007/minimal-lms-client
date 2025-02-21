"use client"

import type React from "react"

import { forwardRef } from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  icon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, icon, rightIcon, className = "", ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
        <div className="relative">
          {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</div>}
          <input
            ref={ref}
            className={`
            w-full rounded-md border px-3 py-2 text-sm transition-colors
            ${icon ? "pl-10" : ""}
            ${rightIcon ? "pr-10" : ""}
            ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            }
            focus:outline-none focus:ring-1
            disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-50
            ${className}
          `}
            {...props}
          />
          {rightIcon && <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightIcon}</div>}
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        {helperText && !error && <p className="text-sm text-gray-500">{helperText}</p>}
      </div>
    )
  },
)

Input.displayName = "Input"

