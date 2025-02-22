"use client"

import { Button } from "@/components/ui/Button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FaPlay } from "react-icons/fa"

interface Course {
  id: string
  title: string
  thumbnail: string
  progress: number
  totalModules: number
  completedModules: number
}

const userCourses: Course[] = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    thumbnail: "https://plus.unsplash.com/premium_vector-1734127305687-4440bad6d7a7?q=80&w=1625&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    progress: 45,
    totalModules: 12,
    completedModules: 5,
  },
  {
    id: "2",
    title: "Advanced React Patterns",
    thumbnail: "https://images.unsplash.com/vector-1738220730338-6024c9501a14?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    progress: 75,
    totalModules: 8,
    completedModules: 6,
  },
]

export default function MyCoursesPage() {
  const router = useRouter()

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">My Courses</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {userCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-sm overflow-hidden border">
            <div className="relative">
              <Image
                src={course.thumbnail || "/placeholder.svg"}
                alt={course.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center  opacity-100 transition-opacity">
                <Button onClick={() => router.push(`/my-courses/${course.id}`)}>
                  <FaPlay className="mr-2" />
                  Continue Learning
                </Button>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <h3 className="font-semibold text-slate-800">{course.title}</h3>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${course.progress}%` }} />
                </div>
                <div className="text-sm text-gray-600">
                  {course.completedModules} of {course.totalModules} modules completed
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

