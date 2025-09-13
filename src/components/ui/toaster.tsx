"use client"

import { useState } from "react"

// Simple toast implementation without external dependencies
interface Toast {
  id: string
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (toast: Toast) => {
    setToasts((prev) => [...prev, { ...toast, id: Math.random().toString() }])
    setTimeout(() => {
      setToasts((prev) => prev.slice(1))
    }, 3000)
  }

  // Expose addToast globally
  if (typeof window !== "undefined") {
    ;(window as any).toast = addToast
  }

  return (
    <div className="fixed top-0 right-0 z-[100] flex flex-col gap-2 p-4 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto max-w-sm rounded-lg border p-4 shadow-lg transition-all ${
            toast.variant === "destructive"
              ? "bg-red-50 border-red-200 text-red-900"
              : "bg-white border-gray-200 text-gray-900"
          }`}
        >
          {toast.title && (
            <div className="font-semibold text-sm">{toast.title}</div>
          )}
          {toast.description && (
            <div className="text-sm opacity-90 mt-1">{toast.description}</div>
          )}
        </div>
      ))}
    </div>
  )
}

// Global toast function
export const toast = (props: Omit<Toast, "id">) => {
  if (typeof window !== "undefined" && (window as any).toast) {
    ;(window as any).toast(props)
  }
}