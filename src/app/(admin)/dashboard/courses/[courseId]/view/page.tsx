"use client"
import { useRouter } from "next/navigation"
import { FaArrowLeft, FaEdit, FaGraduationCap, FaClock, FaChartLine } from "react-icons/fa"
import { Button } from "@/components/ui/Button"
import Image from "next/image"

// This would typically come from your API
const mockCourse = {
  id: "1",
  title: "Web Development Fundamentals",
  description:
    "Learn the basics of web development with HTML, CSS, and JavaScript. This comprehensive course will take you from zero to hero in web development. You'll learn everything you need to know to build modern, responsive websites.",
  thumbnail: "https://plus.unsplash.com/premium_vector-1734127305687-4440bad6d7a7?q=80&w=1625&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  price: 99.99,
  duration: "6 weeks",
  level: "Beginner",
  status: "Published",
  students: 156,
  modules: 8,
  progress: 75,
  lastUpdated: "2024-02-20",
  topics: [
    "HTML5 & Semantic Markup",
    "CSS3 & Modern Layouts",
    "JavaScript Fundamentals",
    "DOM Manipulation",
    "Responsive Design",
    "Basic Web Accessibility",
  ],
}
const stats = [
    { icon: FaGraduationCap, label: "Enrolled Students", value: mockCourse.students },
    { icon: FaClock, label: "Course Duration", value: mockCourse.duration },
    { icon: FaChartLine, label: "Completion Rate", value: `${mockCourse.progress}%` },
  ]

export default function ViewCoursePage({ params }: { params: { courseId: string } }) {
  const router = useRouter()

  return (
    <div className="max-w-4xl mx-auto pt-6">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" className="text-gray-400" onClick={() => router.back()}>
          <FaArrowLeft className="mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold flex-1 text-slate-800">Course Details</h1>
        <Button onClick={() => router.push(`/dashboard/courses/${params.courseId}/edit`)}>
          <FaEdit className="mr-2" />
          Edit Course
        </Button>
      </div>

      <div className="grid gap-8">
        {/* Course Header */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <Image
            src={mockCourse.thumbnail || "/placeholder.svg"}
            alt={mockCourse.title}
            width={720}
            height={360}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">{mockCourse.title}</h2>
                <p className="mt-2 text-gray-600">{mockCourse.description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-slate-800">${mockCourse.price}</div>
                <div className="text-sm text-gray-500">per student</div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <stat.icon className="w-8 h-8 text-blue-500" />
                <div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                  <div className="text-xl font-bold text-slate-800">{stat.value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Course Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-slate-800">Course Information</h3>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm text-gray-500">Level</dt>
                <dd className="mt-1 text-sm font-medium text-slate-800">{mockCourse.level}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Status</dt>
                <dd className="mt-1">
                  <span
                    className={`
                    inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${
                      mockCourse.status === "Published"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }
                  `}
                  >
                    {mockCourse.status}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Last Updated</dt>
                <dd className="mt-1 text-sm font-medium text-slate-800">{mockCourse.lastUpdated}</dd>
              </div>
            </dl>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-slate-800">Topics Covered</h3>
            <ul className="space-y-2">
              {mockCourse.topics.map((topic, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-slate-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

