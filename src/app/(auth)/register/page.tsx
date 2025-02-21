"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm, type SubmitHandler } from "react-hook-form"
import { FaEnvelope, FaLock, FaUser, FaGoogle, FaGithub, FaEye, FaEyeSlash, FaCheck, FaTimes } from "react-icons/fa"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { loginFeatures } from "@/constants/loginFeatures"

interface RegisterFormInputs {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const passwordRequirements = [
  {
    label: "At least 8 characters",
    test: (password: string) => password.length >= 8,
  },
  {
    label: "Contains a number",
    test: (password: string) => /\d/.test(password),
  },
  {
    label: "Contains a lowercase letter",
    test: (password: string) => /[a-z]/.test(password),
  },
  {
    label: "Contains an uppercase letter",
    test: (password: string) => /[A-Z]/.test(password),
  },
  {
    label: "Contains a special character",
    test: (password: string) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
]

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const password = watch("password", "")

  const validatePassword = (value: string) => {
    if (!value) {
      return "Password is required"
    }
    if (value.length < 8) {
      return "Password must be at least 8 characters"
    }
    if (!/\d/.test(value)) {
      return "Password must contain a number"
    }
    if (!/[a-z]/.test(value)) {
      return "Password must contain a lowercase letter"
    }
    if (!/[A-Z]/.test(value)) {
      return "Password must contain an uppercase letter"
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return "Password must contain a special character"
    }
    return true
  }

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log(data)
      router.push("/dashboard")
    } catch (error) {
      console.error("Registration error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-800">Create your account</h1>
            <p className="mt-2 text-sm text-gray-600">Start your learning journey today</p>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" className="flex-1 text-slate-800" onClick={() => console.log("Google Sign up")}>
              <FaGoogle className="mr-2" />
              Google
            </Button>
            <Button variant="outline" className="flex-1 text-slate-800" onClick={() => console.log("GitHub Sign up")}>
              <FaGithub className="mr-2" />
              GitHub
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Full Name"
              placeholder="John Doe"
              className="text-gray-600"
              icon={<FaUser className="text-gray-400" />}
              error={errors.name?.message}
              {...register("name", {
                required: "Name is required",
              })}
            />

            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              className="text-gray-600"
              icon={<FaEnvelope className="text-gray-400" />}
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />

            <div className="space-y-4">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="text-gray-600"
                icon={<FaLock className="text-gray-400" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                }
                error={errors.password?.message}
                {...register("password", {
                  validate: validatePassword,
                })}
              />

              {/* Password Requirements */}
              <div className="space-y-2">
                {passwordRequirements.map((req, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 text-sm
                      ${req.test(password) ? "text-green-600" : "text-gray-500"}
                    `}
                  >
                    {req.test(password) ? <FaCheck className="w-4 h-4" /> : <FaTimes className="w-4 h-4" />}
                    {req.label}
                  </div>
                ))}
              </div>
            </div>

            <Input
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              className="text-gray-600"
              icon={<FaLock className="text-gray-400" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              }
              error={errors.confirmPassword?.message}
              {...register("confirmPassword", {
                validate: (value) => value === password || "Passwords do not match",
              })}
            />

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Content */}
      <div className="hidden lg:block lg:flex-1 bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="h-full flex items-center justify-center p-12">
          <div className="max-w-md text-white">
            <h2 className="text-3xl font-bold mb-6">Start Your Learning Journey Today</h2>
            <ul className="space-y-4">
              {loginFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <FaCheck className="w-3 h-3" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

