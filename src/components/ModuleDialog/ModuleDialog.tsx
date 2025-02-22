"use client"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"


interface ModuleDialogProps {
  module: {
    id: string
    title: string
    order: number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lectures: any[]
  }
  onClose: () => void
  onSave: (module: {
    id: string
    title: string
    order: number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lectures: any[]
  }) => void
}

export function ModuleDialog({ module, onClose, onSave }: ModuleDialogProps) {
  if (!module) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-lg text-slate-800 font-semibold mb-4">{module.id.startsWith("new-") ? "Add Module" : "Edit Module"}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            onSave({
              ...module,
              title: formData.get("title") as string,
            })
          }}
          className="space-y-4"
        >
          <Input label="Module Title" name="title" defaultValue={module.title} className="text-slate-800" required />
          <div className="flex justify-end gap-4">
            <Button type="button" variant="danger" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Module</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

