"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FaPlus, FaSearch, FaEdit, FaVideo, FaTrash, FaEye } from "react-icons/fa"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { DeleteCourseDialog } from "@/components/DeleteCourseDialog/DeleteCourseDialog"
import Image from "next/image"


interface Course {
  id: string
  title: string
  description: string
  thumbnail: string
  price: number
  totalModules: number
  totalStudents: number
  status: "draft" | "published"
  lastUpdated: string
}

const courses: Course[] = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    description: "Learn web development from scratch to advanced concepts",
    thumbnail: "https://plus.unsplash.com/premium_vector-1734127305687-4440bad6d7a7?q=80&w=1625&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 99.99,
    totalModules: 12,
    totalStudents: 156,
    status: "published",
    lastUpdated: "2024-02-22",
  },
  {
    id: "2",
    title: "Advanced React Patterns",
    description: "Master React with advanced design patterns",
    thumbnail: "https://images.unsplash.com/vector-1738220730338-6024c9501a14?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 79.99,
    totalModules: 8,
    totalStudents: 89,
    status: "published",
    lastUpdated: "2024-02-21",
  },
  {
    id: "3",
    title: "Node.js Microservices",
    description: "Build scalable applications with microservices",
    thumbnail: "https://plus.unsplash.com/premium_vector-1733712607733-986d23ee4753?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 129.99,
    totalModules: 10,
    totalStudents: 45,
    status: "draft",
    lastUpdated: "2024-02-20",
  },
]

export default function CoursesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all")
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null)

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || course.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleDeleteCourse = async (course: Course) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Deleting course:", course.id)
      // In real app, refresh the courses list
      router.refresh()
    } catch (error) {
      console.error("Error deleting course:", error)
    }
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Course Management</h1>
        <Button onClick={() => router.push("/dashboard/courses/add")}>
          <FaPlus className="mr-2" />
          Create Course
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search courses..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="rounded-md border border-gray-300 px-4 py-2 text-slate-800"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as "all" | "published" | "draft")}
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* Course List */}
      <div className="grid gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-sm overflow-hidden border">
            <div className="flex flex-col md:flex-row">
              {/* Thumbnail */}
              <div className="md:w-64 h-48 md:h-auto">
                <Image
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-slate-800">{course.title}</h2>
                    <p className="text-gray-600">{course.description}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>${course.price}</span>
                      <span>•</span>
                      <span>{course.totalModules} modules</span>
                      <span>•</span>
                      <span>{course.totalStudents} students</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`
                        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${
                          course.status === "published"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      `}
                      >
                        {course.status === "published" ? "Published" : "Draft"}
                      </span>
                      <span className="text-sm text-gray-500">
                        Last updated: {new Date(course.lastUpdated).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" className="border-slate-800 text-slate-800" onClick={() => router.push(`/dashboard/courses/${course.id}/edit`)}>
                      <FaEdit className="mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" className="border-slate-800 text-slate-800" onClick={() => router.push(`/dashboard/courses/${course.id}/modules`)}>
                      <FaVideo className="mr-2" />
                      Modules
                    </Button>
                    <Button variant="outline" className="border-slate-800 text-slate-800" onClick={() => router.push(`/courses/${course.id}`)}>
                      <FaEye className="mr-2" />
                      Preview
                    </Button>
                    <Button variant="outline"  className="border-red-500" onClick={() => setCourseToDelete(course)}>
                      <FaTrash className="text-red-500" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <DeleteCourseDialog
        course={courseToDelete}
        onClose={() => setCourseToDelete(null)}
        onConfirm={(course) => {
          handleDeleteCourse(course)
          setCourseToDelete(null)
        }}
      />
    </div>
  )
}

