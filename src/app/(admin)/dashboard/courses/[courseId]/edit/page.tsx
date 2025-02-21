/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FaArrowLeft, FaUpload } from "react-icons/fa"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import Image from "next/image"

interface CourseFormData {
  title: string
  description: string
  price: number
  thumbnail: File | null
  duration: string
  level: string
  status: "Draft" | "Published"
}

// This would typically come from your API
const mockCourse = {
  id: "1",
  title: "Web Development Fundamentals",
  description: "Learn the basics of web development with HTML, CSS, and JavaScript.",
  price: 99.99,
  thumbnail: "https://plus.unsplash.com/premium_vector-1734127305687-4440bad6d7a7?q=80&w=1625&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  duration: "6 weeks",
  level: "beginner",
  status: "Published" as const,
}

export default function EditCoursePage({ params }: { params: { courseId: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [thumbnailPreview, setThumbnailPreview] = useState<string>(mockCourse.thumbnail)
  const [formData, setFormData] = useState<CourseFormData>({
    title: mockCourse.title,
    description: mockCourse.description,
    price: mockCourse.price,
    thumbnail: null,
    duration: mockCourse.duration,
    level: mockCourse.level,
    status: mockCourse.status,
  })

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, thumbnail: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirect back to courses page after successful update
      router.push("/dashboard/courses")
      router.refresh()
    } catch (error) {
      console.error("Error updating course:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" className="text-gray-600" onClick={() => router.back()}>
          <FaArrowLeft className="mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-slate-800">Edit Course</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 text-gray-600 pb-6">
        {/* Thumbnail Upload */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Course Thumbnail</label>
          <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer">
            {thumbnailPreview ? (
              <div className="relative w-full h-full">
                <Image
                  src={thumbnailPreview || "/placeholder.svg"}
                  alt="Thumbnail preview"
                  width={300}
                  height={150}
                  className="w-full h-full object-cover rounded-lg"
                />
                <Button
                  type="button"
                  className="absolute bottom-4 right-4"
                  onClick={() => {
                    setThumbnailPreview(mockCourse.thumbnail)
                    setFormData((prev) => ({ ...prev, thumbnail: null }))
                  }}
                >
                  Reset Image
                </Button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                <FaUpload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Click to upload thumbnail</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleThumbnailChange} />
              </label>
            )}
          </div>
        </div>

        {/* Course Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Course Title"
            required
            value={formData.title}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
          />
          <Input
            label="Price ($)"
            type="number"
            min="0"
            step="0.01"
            required
            value={formData.price}
            onChange={(e) => setFormData((prev) => ({ ...prev, price: Number.parseFloat(e.target.value) }))}
          />
        </div>

        <Textarea
          label="Description"
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          required
          rows={5}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input
            label="Duration"
            placeholder="e.g., 6 weeks"
            value={formData.duration}
            onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
          />

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Level</label>
            <select
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={formData.level}
              onChange={(e) => setFormData((prev) => ({ ...prev, level: e.target.value }))}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={formData.status}
              onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as "Draft" | "Published" }))}
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}

