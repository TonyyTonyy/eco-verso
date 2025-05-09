"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type ProgressContextType = {
  progress: number
  incrementProgress: (amount: number) => void
  points: number
  addPoints: (amount: number) => void
  visitedPages: string[]
  markPageVisited: (page: string) => void
}

const ProgressContext = createContext<ProgressContextType>({
  progress: 0,
  incrementProgress: () => {},
  points: 0,
  addPoints: () => {},
  visitedPages: [],
  markPageVisited: () => {},
})

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(0)
  const [points, setPoints] = useState(0)
  const [visitedPages, setVisitedPages] = useState<string[]>([])

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem("ecoverso-progress")
    const savedPoints = localStorage.getItem("ecoverso-points")
    const savedVisitedPages = localStorage.getItem("ecoverso-visited-pages")

    if (savedProgress) setProgress(Number.parseInt(savedProgress))
    if (savedPoints) setPoints(Number.parseInt(savedPoints))
    if (savedVisitedPages) setVisitedPages(JSON.parse(savedVisitedPages))
  }, [])

  // Save progress to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("ecoverso-progress", progress.toString())
    localStorage.setItem("ecoverso-points", points.toString())
    localStorage.setItem("ecoverso-visited-pages", JSON.stringify(visitedPages))
  }, [progress, points, visitedPages])

  const incrementProgress = (amount: number) => {
    setProgress((prev) => Math.min(100, prev + amount))
  }

  const addPoints = (amount: number) => {
    setPoints((prev) => prev + amount)
  }

  const markPageVisited = (page: string) => {
    if (!visitedPages.includes(page)) {
      setVisitedPages((prev) => [...prev, page])
      incrementProgress(14.2857142857) 
    }
  }

  // Mark current page as visited
  useEffect(() => {
    const currentPath = window.location.pathname
    markPageVisited(currentPath)
  }, [])

  return (
    <ProgressContext.Provider
      value={{
        progress,
        incrementProgress,
        points,
        addPoints,
        visitedPages,
        markPageVisited,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

export const useProgress = () => useContext(ProgressContext)
