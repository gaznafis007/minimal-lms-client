"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FaPlus, FaSearch, FaEdit, FaEye } from "react-icons/fa"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import Image from "next/image"

const courses = [
  {
    id: "1",
    title: "Web Development Fundamentals",
    students: 156,
    modules: 8,
    progress: 75,
    status: "Published",
    image: "https://plus.unsplash.com/premium_vector-1734127305687-4440bad6d7a7?q=80&w=1625&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "2",
    title: "UI/UX Design Principles",
    students: 89,
    modules: 6,
    progress: 100,
    status: "Published",
    image: "https://images.unsplash.com/vector-1738220730338-6024c9501a14?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "3",
    title: "React.js for Beginners",
    students: 234,
    modules: 12,
    progress: 50,
    status: "Draft",
    image: "https://plus.unsplash.com/premium_vector-1733712607733-986d23ee4753?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
]

export default function CoursesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6 bg-gray-50 p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
        <Button onClick={() => router.push("/dashboard/courses/add")}>
          <FaPlus className="mr-2" />
          Add Course
        </Button>
      </div>

      {/* Search and Filters */}
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
        <select className="rounded-md border border-gray-300 px-4 py-2 text-slate-800">
          <option>All Status</option>
          <option>Published</option>
          <option>Draft</option>
        </select>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <Image src={course.image || "/placeholder.svg"} width={400} height={200} alt={course.title} className="w-full h-40 object-cover" />
            <div className="p-6">
              <h3 className="font-semibold text-gray-900">{course.title}</h3>

              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-500">Students</div>
                  <div className="font-medium text-slate-800">{course.students}</div>
                </div>
                <div>
                  <div className="text-gray-500">Modules</div>
                  <div className="font-medium text-slate-800">{course.modules}</div>
                </div>
                <div>
                  <div className="text-gray-500">Progress</div>
                  <div className="font-medium text-slate-800">{course.progress}%</div>
                </div>
                <div>
                  <div className="text-gray-500">Status</div>
                  <div className="font-medium text-slate-800">{course.status}</div>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-slate-800"
                  onClick={() => router.push(`/dashboard/courses/${course.id}/edit`)}
                >
                  <FaEdit className="mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-slate-800"
                  onClick={() => router.push(`/dashboard/courses/${course.id}/view`)}
                >
                  <FaEye className="mr-2" />
                  View
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

