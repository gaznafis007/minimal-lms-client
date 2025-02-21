"use client"

import type React from "react"

import { forwardRef } from "react"

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = "", ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
        <textarea
          ref={ref}
          className={`
          w-full rounded-md border px-3 py-2 text-sm transition-colors
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
        {error && <p className="text-sm text-red-500">{error}</p>}
        {helperText && !error && <p className="text-sm text-gray-500">{helperText}</p>}
      </div>
    )
  },
)

Textarea.displayName = "Textarea"

