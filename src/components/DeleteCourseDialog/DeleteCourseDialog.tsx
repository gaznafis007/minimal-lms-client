"use client"

import { FaExclamationTriangle } from "react-icons/fa"
import { Button } from "@/components/ui/Button"


interface DeleteCourseDialogProps {
  course: {
    id: string
    title: string
    description: string
    thumbnail: string
    price: number
    totalModules: number
    totalStudents: number
    status: "draft" | "published"
    lastUpdated: string
  } | null
  onClose: () => void
  onConfirm: (course: {
    id: string
    title: string
    description: string
    thumbnail: string
    price: number
    totalModules: number
    totalStudents: number
    status: "draft" | "published"
    lastUpdated: string
  }) => void
}

export function DeleteCourseDialog({ course, onClose, onConfirm }: DeleteCourseDialogProps) {
  if (!course) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="flex items-center gap-4 text-red-600">
          <FaExclamationTriangle className="w-6 h-6" />
          <h2 className="text-lg font-semibold">Delete Course</h2>
        </div>

        <p className="mt-4 text-gray-600">
          Are you sure you want to delete <span className="font-medium">{course.title}</span>? This action cannot be
          undone and will remove all associated modules and lectures.
        </p>

        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => onConfirm(course)}>
            Delete Course
          </Button>
        </div>
      </div>
    </div>
  )
}

