"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { FaPlay, FaLock, FaCheck, FaChevronDown, FaChevronRight } from "react-icons/fa"
import YouTube from "react-youtube"

interface Lecture {
  id: string
  title: string
  videoUrl: string
  duration: string
  isCompleted: boolean
  isLocked: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Module {
  id: string
  title: string
  order: number
  lectures: Lecture[]
}

const mockCourse = {
  id: "1",
  title: "Complete Web Development Bootcamp",
  modules: [
    {
      id: "1",
      title: "Getting Started",
      order: 1,
      lectures: [
        {
          id: "1-1",
          title: "Course Introduction",
          videoUrl: "https://www.youtube.com/watch?v=nu_pCVPKzTk",
          duration: "10:25",
          isCompleted: true,
          isLocked: false,
        },
        {
          id: "1-2",
          title: "Setting Up Your Environment",
          videoUrl: "https://www.youtube.com/watch?v=NkwFxeHARqc",
          duration: "15:30",
          isCompleted: false,
          isLocked: false,
        },
      ],
    },
    {
      id: "2",
      title: "Core Concepts",
      order: 2,
      lectures: [
        {
          id: "2-1",
          title: "Understanding the Basics",
          videoUrl: "https://www.youtube.com/watch?v=nu_pCVPKzTk",
          duration: "20:15",
          isCompleted: false,
          isLocked: true,
        },
      ],
    },
  ],
}

export default function CoursePage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter()
  const [expandedModules, setExpandedModules] = useState<string[]>([])
  const [currentLecture, setCurrentLecture] = useState<Lecture | null>(null)
  const [course, setCourse] = useState(mockCourse)

  useEffect(() => {
    // Find first incomplete lecture
    // eslint-disable-next-line @next/next/no-assign-module-variable
    for (const module of course.modules) {
      const incompleteLecture = module.lectures.find((lecture) => !lecture.isCompleted && !lecture.isLocked)
      if (incompleteLecture) {
        setCurrentLecture(incompleteLecture)
        setExpandedModules([module.id])
        break
      }
    }
  }, [course.modules])

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => (prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]))
  }

  const handleLectureComplete = (moduleId: string, lectureId: string) => {
    setCourse((prev) => ({
      ...prev,
      modules: prev.modules.map((module) => {
        if (module.id === moduleId) {
          return {
            ...module,
            lectures: module.lectures.map((lecture) => {
              if (lecture.id === lectureId) {
                return { ...lecture, isCompleted: true }
              }
              // Unlock next lecture
              const currentIndex = module.lectures.findIndex((l) => l.id === lectureId)
              if (lecture.id === module.lectures[currentIndex + 1]?.id) {
                return { ...lecture, isLocked: false }
              }
              return lecture
            }),
          }
        }
        // Unlock first lecture of next module if current module is completed
        const currentModuleIndex = prev.modules.findIndex((m) => m.id === moduleId)
        if (module.id === prev.modules[currentModuleIndex + 1]?.id && module.lectures[0]?.isLocked) {
          const allLecturesCompleted = prev.modules[currentModuleIndex].lectures.every((l) => l.isCompleted)
          if (allLecturesCompleted) {
            return {
              ...module,
              lectures: module.lectures.map((lecture, index) =>
                index === 0 ? { ...lecture, isLocked: false } : lecture,
              ),
            }
          }
        }
        return module
      }),
    }))
  }
  const getYouTubeVideoId = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    return match ? match[1] : null;
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Video Player Section */}
      <div className="bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {currentLecture ? (
            <div className="aspect-video">
              <YouTube
              className="w-full h-full"
              videoId={getYouTubeVideoId(currentLecture.videoUrl) || ""}
                opts={{
                  width: "100%",
                  height: "100%",
                  playerVars: {
                    autoplay: 1,
                  },
                }}
                onEnd={() => {
                  if (currentLecture) {
                    const moduleId = course.modules.find((module) =>
                      module.lectures.some((lecture) => lecture.id === currentLecture.id),
                    )?.id
                    if (moduleId) {
                      handleLectureComplete(moduleId, currentLecture.id)
                    }
                  }
                }}
              />
            </div>
          ) : (
            <div className="aspect-video bg-gray-900 flex items-center justify-center">
              <p className="text-red-500">Select a lecture to start learning</p>
            </div>
          )}
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Side - Course Progress */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h2 className="font-semibold mb-2 text-slate-800">Course Progress</h2>
              <div className="space-y-2">
                {course.modules.map((module) => {
                  const completedLectures = module.lectures.filter((l) => l.isCompleted).length
                  const progress = (completedLectures / module.lectures.length) * 100

                  return (
                    <div key={module.id} className="space-y-1">
                      <div className="text-sm text-gray-600">
                        Module {module.order}: {completedLectures}/{module.lectures.length}
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Side - Course Content */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <h2 className="font-semibold text-slate-800">Course Content</h2>
              </div>

              <div className="divide-y">
                {course.modules.map((module) => (
                  <div key={module.id}>
                    <button
                      className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
                      onClick={() => toggleModule(module.id)}
                    >
                      <div className="flex items-center text-slate-800 gap-2">
                        {expandedModules.includes(module.id) ? (
                          <FaChevronDown className="w-4 h-4" />
                        ) : (
                          <FaChevronRight className="w-4 h-4" />
                        )}
                        <span>
                          Module {module.order}: {module.title}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {module.lectures.filter((l) => l.isCompleted).length}/{module.lectures.length} completed
                      </div>
                    </button>

                    {expandedModules.includes(module.id) && (
                      <div className="px-4 py-2 space-y-1">
                        {module.lectures.map((lecture) => (
                          <button
                            key={lecture.id}
                            className={`
                              w-full px-4 py-2 rounded-lg flex items-center justify-between
                              ${lecture.isLocked ? "cursor-not-allowed opacity-50" : "hover:bg-gray-50"}
                              ${currentLecture?.id === lecture.id && "bg-blue-50"}
                            `}
                            onClick={() => {
                              if (!lecture.isLocked) {
                                setCurrentLecture(lecture)
                              }
                            }}
                            disabled={lecture.isLocked}
                          >
                            <div className="flex items-center gap-3">
                              {lecture.isCompleted ? (
                                <FaCheck className="w-4 h-4 text-green-500" />
                              ) : lecture.isLocked ? (
                                <FaLock className="w-4 h-4 text-gray-400" />
                              ) : (
                                <FaPlay className="w-4 h-4 text-blue-500" />
                              )}
                              <span className={lecture.isCompleted ? "text-gray-500" : "text-gray-400"}>{lecture.title}</span>
                            </div>
                            <span className="text-sm text-gray-500">{lecture.duration}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

