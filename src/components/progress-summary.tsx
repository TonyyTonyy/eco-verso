"use client"

import { useProgress } from "@/components/progress-provider"
import { quizzes } from "@/data/quizzes"

export function ProgressSummary() {
  const { points, completedQuizzes } = useProgress()

  const completedCount = quizzes.filter((q) => completedQuizzes.includes(q.id)).length
  const quizPercent = quizzes.length > 0 ? (completedCount / quizzes.length) * 100 : 0

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Quizzes Completados</span>
          <span className="text-sm font-medium">
            {completedCount}/{quizzes.length}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2.5">
          <div
            className="bg-green-500 h-2.5 rounded-full transition-all"
            style={{ width: `${quizPercent}%` }}
          ></div>
        </div>
      </div>
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Total de Pontos Ganhos</span>
          <span className="text-sm font-medium">{points}</span>
        </div>
      </div>
    </div>
  )
}
