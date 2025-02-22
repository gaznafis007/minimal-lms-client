"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  FaArrowLeft,
  FaPlus,
  FaEdit,
  FaTrash,
  FaYoutube,
  FaLock,
  FaUnlock,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa"
import { Button } from "@/components/ui/Button"
import { ModuleDialog } from "@/components/ModuleDialog/ModuleDialog"
import { LectureDialog } from "@/components/LectureDialog/LectureDialog"


interface Lecture {
  id: string
  title: string
  videoUrl: string
  duration: string
  isPublished: boolean
}

interface Module {
  id: string
  title: string
  order: number
  lectures: Lecture[]
}

// Mock data
const mockModules: Module[] = [
  {
    id: "1",
    title: "Getting Started",
    order: 1,
    lectures: [
      {
        id: "1-1",
        title: "Course Introduction",
        videoUrl: "https://www.youtube.com/watch?v=123",
        duration: "10:25",
        isPublished: true,
      },
      {
        id: "1-2",
        title: "Setting Up Your Environment",
        videoUrl: "https://www.youtube.com/watch?v=456",
        duration: "15:30",
        isPublished: true,
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
        videoUrl: "https://www.youtube.com/watch?v=789",
        duration: "20:15",
        isPublished: false,
      },
    ],
  },
]

export default function ModulesPage({ params }: { params: { courseId: string } }) {
  const router = useRouter()
  const [modules, setModules] = useState<Module[]>(mockModules)
  const [expandedModules, setExpandedModules] = useState<string[]>([])
  const [editingModule, setEditingModule] = useState<Module | null>(null)
  const [editingLecture, setEditingLecture] = useState<{
    moduleId: string
    lecture: Lecture
  } | null>()

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => (prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]))
  }

  const handleAddModule = () => {
    const newModule: Module = {
      id: `new-${Date.now()}`,
      title: "",
      order: modules.length + 1,
      lectures: [],
    }
    setEditingModule(newModule)
  }

  const handleSaveModule = (module: Module) => {
    if (module.id.startsWith("new-")) {
      setModules([...modules, { ...module, id: `module-${Date.now()}` }])
    } else {
      setModules(modules.map((m) => (m.id === module.id ? module : m)))
    }
    setEditingModule(null)
  }

  const handleDeleteModule = (moduleId: string) => {
    setModules(modules.filter((m) => m.id !== moduleId))
  }

  const handleAddLecture = (moduleId: string) => {
    setEditingLecture({
      moduleId,
      lecture: {
        id: `new-${Date.now()}`,
        title: "",
        videoUrl: "",
        duration: "",
        isPublished: false,
      },
    })
  }

  const handleSaveLecture = (moduleId: string, lecture: Lecture) => {
    setModules(
      modules.map((module) => {
        if (module.id === moduleId) {
          const lectures = lecture.id.startsWith("new-")
            ? [...module.lectures, { ...lecture, id: `lecture-${Date.now()}` }]
            : module.lectures.map((l) => (l.id === lecture.id ? lecture : l))
          return { ...module, lectures }
        }
        return module
      }),
    )
    setEditingLecture(null)
  }

  const handleDeleteLecture = (moduleId: string, lectureId: string) => {
    setModules(
      modules.map((module) => {
        if (module.id === moduleId) {
          return {
            ...module,
            lectures: module.lectures.filter((l) => l.id !== lectureId),
          }
        }
        return module
      }),
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-slate-800" onClick={() => router.back()}>
            <FaArrowLeft className="mr-2" />
            Back to Courses
          </Button>
          <h1 className="text-2xl font-bold text-slate-800">Course Modules</h1>
        </div>
        <Button onClick={handleAddModule}>
          <FaPlus className="mr-2" />
          Add Module
        </Button>
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        {modules.map((module) => (
          <div key={module.id} className="border rounded-lg bg-white overflow-hidden">
            {/* Module Header */}
            <div className="flex items-center justify-between p-4 bg-gray-50">
              <div className="flex items-center gap-4">
                <button onClick={() => toggleModule(module.id)} className="text-gray-500 hover:text-gray-700">
                  {expandedModules.includes(module.id) ? (
                    <FaChevronDown className="w-4 h-4" />
                  ) : (
                    <FaChevronRight className="w-4 h-4" />
                  )}
                </button>
                <div>
                  <div className="text-sm text-gray-500">Module {module.order}</div>
                  <div className="font-medium text-slate-800">{module.title}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => setEditingModule(module)}>
                  <FaEdit className="w-4 h-4 text-slate-800" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDeleteModule(module.id)}>
                  <FaTrash className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </div>

            {/* Lectures List */}
            {expandedModules.includes(module.id) && (
              <div className="p-4 space-y-4">
                <div className="flex justify-end">
                  <Button variant="outline" className="border-slate-800 text-slate-800" size="sm" onClick={() => handleAddLecture(module.id)}>
                    <FaPlus className="mr-2" />
                    Add Lecture
                  </Button>
                </div>

                <div className="space-y-3">
                  {module.lectures.map((lecture) => (
                    <div key={lecture.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FaYoutube className="w-4 h-4 text-red-500" />
                        <div>
                          <div className="font-medium text-slate-800">{lecture.title}</div>
                          <div className="text-sm text-gray-500">{lecture.duration}</div>
                        </div>
                        {lecture.isPublished ? (
                          <FaUnlock className="w-4 h-4 text-green-500" />
                        ) : (
                          <FaLock className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setEditingLecture({
                              moduleId: module.id,
                              lecture,
                            })
                          }
                        >
                          <FaEdit className="w-4 h-4 text-slate-800" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteLecture(module.id, lecture.id)}>
                          <FaTrash className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Module Dialog */}
      {editingModule && (
        <ModuleDialog module={editingModule} onClose={() => setEditingModule(null)} onSave={handleSaveModule} />
      )}

      {/* Lecture Dialog */}
      {editingLecture && (
        <LectureDialog
          lecture={editingLecture.lecture}
          onClose={() => setEditingLecture(null)}
          onSave={(lecture) => handleSaveLecture(editingLecture.moduleId, lecture)}
        />
      )}
    </div>
  )
}

