"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { toast } from "sonner"
import { achievements, getLevelInfo, type LevelInfo } from "@/data/achievements"
import { toDateKey } from "@/lib/utils"

export type ActivityEntry = { date: string; points: number }
type StreakData = { count: number; lastActive: string }

type ProgressContextType = {
  progress: number
  incrementProgress: (amount: number) => void
  points: number
  addPoints: (amount: number) => void
  visitedPages: string[]
  markPageVisited: (page: string) => void
  completedQuizzes: string[]
  markQuizCompleted: (quizId: string) => boolean
  completedGames: string[]
  markGameCompleted: (gameId: string) => boolean
  streak: number
  activityLog: ActivityEntry[]
  unlockedAchievements: string[]
  levelInfo: LevelInfo
  hydrated: boolean
  resetProgress: () => void
}

const STORAGE_KEYS = {
  progress: "ecoverso-progress",
  points: "ecoverso-points",
  visitedPages: "ecoverso-visited-pages",
  completedQuizzes: "ecoverso-completed-quizzes",
  completedGames: "ecoverso-completed-games",
  streak: "ecoverso-streak",
  activityLog: "ecoverso-activity-log",
  achievements: "ecoverso-achievements",
} as const

const ProgressContext = createContext<ProgressContextType>({
  progress: 0,
  incrementProgress: () => {},
  points: 0,
  addPoints: () => {},
  visitedPages: [],
  markPageVisited: () => {},
  completedQuizzes: [],
  markQuizCompleted: () => false,
  completedGames: [],
  markGameCompleted: () => false,
  streak: 1,
  activityLog: [],
  unlockedAchievements: [],
  levelInfo: getLevelInfo(0),
  hydrated: false,
  resetProgress: () => {},
})

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(0)
  const [points, setPoints] = useState(0)
  const [visitedPages, setVisitedPages] = useState<string[]>([])
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([])
  const [completedGames, setCompletedGames] = useState<string[]>([])
  const [streak, setStreak] = useState<StreakData>({ count: 1, lastActive: "" })
  const [activityLog, setActivityLog] = useState<ActivityEntry[]>([])
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([])
  const [hydrated, setHydrated] = useState(false)

  // Ref sincronizada para evitar double-count em StrictMode (efeitos duplicados em dev)
  const visitedRef = useRef<string[]>([])
  useEffect(() => {
    visitedRef.current = visitedPages
  }, [visitedPages])

  // Carrega todo o progresso do localStorage e atualiza o streak diário
  useEffect(() => {
    const savedProgress = localStorage.getItem(STORAGE_KEYS.progress)
    const savedPoints = localStorage.getItem(STORAGE_KEYS.points)

    if (savedProgress) setProgress(Number.parseInt(savedProgress))
    if (savedPoints) setPoints(Number.parseInt(savedPoints))
    setVisitedPages(readJson<string[]>(STORAGE_KEYS.visitedPages, []))
    setCompletedQuizzes(readJson<string[]>(STORAGE_KEYS.completedQuizzes, []))
    setCompletedGames(readJson<string[]>(STORAGE_KEYS.completedGames, []))
    setActivityLog(readJson<ActivityEntry[]>(STORAGE_KEYS.activityLog, []))
    setUnlockedAchievements(readJson<string[]>(STORAGE_KEYS.achievements, []))

    // Streak: mesmo dia mantém, dia seguinte incrementa, caso contrário recomeça
    const today = toDateKey(new Date())
    const yesterday = toDateKey(new Date(Date.now() - 86400000))
    const savedStreak = readJson<StreakData | null>(STORAGE_KEYS.streak, null)
    let nextStreak: StreakData = { count: 1, lastActive: today }
    if (savedStreak?.lastActive === today) {
      nextStreak = savedStreak
    } else if (savedStreak?.lastActive === yesterday) {
      nextStreak = { count: savedStreak.count + 1, lastActive: today }
    }
    setStreak(nextStreak)

    setHydrated(true)
  }, [])

  // Persiste alterações apenas depois da hidratação (evita sobrescrever dados salvos)
  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(STORAGE_KEYS.progress, progress.toString())
    localStorage.setItem(STORAGE_KEYS.points, points.toString())
    localStorage.setItem(STORAGE_KEYS.visitedPages, JSON.stringify(visitedPages))
    localStorage.setItem(STORAGE_KEYS.completedQuizzes, JSON.stringify(completedQuizzes))
    localStorage.setItem(STORAGE_KEYS.completedGames, JSON.stringify(completedGames))
    localStorage.setItem(STORAGE_KEYS.streak, JSON.stringify(streak))
    localStorage.setItem(STORAGE_KEYS.activityLog, JSON.stringify(activityLog))
    localStorage.setItem(STORAGE_KEYS.achievements, JSON.stringify(unlockedAchievements))
  }, [hydrated, progress, points, visitedPages, completedQuizzes, completedGames, streak, activityLog, unlockedAchievements])

  // Avalia conquistas sempre que as estatísticas mudam e notifica novos desbloqueios
  useEffect(() => {
    if (!hydrated) return
    const stats = {
      points,
      completedQuizzes,
      completedGames,
      pagesVisited: visitedPages.length,
      visitedPages,
      streak: streak.count,
    }
    const fresh = achievements.filter(
      (a) => !unlockedAchievements.includes(a.id) && a.check(stats),
    )
    if (fresh.length === 0) return
    setUnlockedAchievements((prev) => [...prev, ...fresh.map((a) => a.id)])
    fresh.forEach((a) =>
      toast.success(`Conquista desbloqueada: ${a.title}`, {
        description: a.description,
        icon: a.icon,
        duration: 5000,
      }),
    )
  }, [hydrated, points, completedQuizzes, completedGames, visitedPages, streak, unlockedAchievements])

  const incrementProgress = (amount: number) => {
    setProgress((prev) => Math.min(100, prev + amount))
  }

  const addPoints = (amount: number) => {
    setPoints((prev) => prev + amount)
    const today = toDateKey(new Date())
    setActivityLog((prev) => {
      const idx = prev.findIndex((e) => e.date === today)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = { ...next[idx], points: next[idx].points + amount }
        return next
      }
      // Mantém no máximo os últimos 90 dias de histórico
      return [...prev, { date: today, points: amount }].slice(-90)
    })
  }

  const markPageVisited = (page: string) => {
    if (visitedRef.current.includes(page)) return
    visitedRef.current = [...visitedRef.current, page]
    setVisitedPages((prev) => (prev.includes(page) ? prev : [...prev, page]))
    incrementProgress(100 / 7)
  }

  // Marca um quiz como completado. Retorna true apenas na primeira vez,
  // permitindo que os jogos premiem pontos uma única vez por quiz.
  const markQuizCompleted = (quizId: string): boolean => {
    if (completedQuizzes.includes(quizId)) return false
    setCompletedQuizzes((prev) => (prev.includes(quizId) ? prev : [...prev, quizId]))
    return true
  }

  // Mesma lógica dos quizzes, mas para jogos/atividades (alimenta as conquistas)
  const markGameCompleted = (gameId: string): boolean => {
    if (completedGames.includes(gameId)) return false
    setCompletedGames((prev) => (prev.includes(gameId) ? prev : [...prev, gameId]))
    return true
  }

  // Registra a página visitada em cada navegação (SPA) e não apenas no carregamento inicial
  const pathname = usePathname()
  useEffect(() => {
    if (!hydrated || !pathname) return
    markPageVisited(pathname)
  }, [pathname, hydrated])

  const resetProgress = () => {
    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key))
    setProgress(0)
    setPoints(0)
    setVisitedPages([])
    setCompletedQuizzes([])
    setCompletedGames([])
    setActivityLog([])
    setUnlockedAchievements([])
    setStreak({ count: 1, lastActive: toDateKey(new Date()) })
    toast.info("Progresso reiniciado", {
      description: "Pontos, conquistas, streak e histórico foram apagados deste dispositivo.",
    })
  }

  const levelInfo = getLevelInfo(points)

  return (
    <ProgressContext.Provider
      value={{
        progress,
        incrementProgress,
        points,
        addPoints,
        visitedPages,
        markPageVisited,
        completedQuizzes,
        markQuizCompleted,
        completedGames,
        markGameCompleted,
        streak: streak.count,
        activityLog,
        unlockedAchievements,
        levelInfo,
        hydrated,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

export const useProgress = () => useContext(ProgressContext)
