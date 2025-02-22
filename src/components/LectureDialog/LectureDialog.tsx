"use client"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"


interface LectureDialogProps {
  lecture: {
    id: string
    title: string
    videoUrl: string
    duration: string
    isPublished: boolean
  }
  onClose: () => void
  onSave: (lecture: {
    id: string
    title: string
    videoUrl: string
    duration: string
    isPublished: boolean
  }) => void
}

export function LectureDialog({ lecture, onClose, onSave }: LectureDialogProps) {
  if (!lecture) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-lg font-semibold mb-4 text-slate-800">{lecture.id.startsWith("new-") ? "Add Lecture" : "Edit Lecture"}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            onSave({
              ...lecture,
              title: formData.get("title") as string,
              videoUrl: formData.get("videoUrl") as string,
              duration: formData.get("duration") as string,
              isPublished: formData.get("isPublished") === "true",
            })
          }}
          className="space-y-4"
        >
          <Input label="Lecture Title" className="text-slate-800" name="title" defaultValue={lecture.title} required />
          <Input
            label="YouTube Video URL"
            name="videoUrl"
            defaultValue={lecture.videoUrl}
            placeholder="https://youtube.com/watch?v=..."
            className="text-slate-800"
            required
          />
          <Input label="Duration" name="duration" defaultValue={lecture.duration} placeholder="HH:MM:SS" required />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isPublished"
              defaultChecked={lecture.isPublished}
              value="true"
              className="rounded border-gray-300"
            />
            <span className="text-sm text-slate-800">Publish this lecture</span>
          </label>
          <div className="flex justify-end gap-4">
            <Button type="button" variant="danger" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Lecture</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

