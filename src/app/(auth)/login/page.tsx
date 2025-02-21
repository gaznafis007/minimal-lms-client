"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { FaGraduationCap } from "react-icons/fa"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"


export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <FaGraduationCap className="h-12 w-12 text-slate-800 mx-auto" />
            <h1 className="mt-4 text-2xl font-bold text-slate-800">Welcome back</h1>
            <p className="mt-2 text-sm text-gray-600">Please sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input label="Email" type="email" placeholder="you@example.com" required />
            <Input label="Password" type="password" placeholder="••••••••" required />

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Sign in
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:flex-1">
        <div
          className="h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('https://plus.unsplash.com/premium_vector-1682310599143-6104e556763d?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        />
      </div>
    </div>
  )
}

