"use client"
import { useState, useEffect, useRef } from "react"
import { useProgress } from "@/components/progress-provider"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { DotPattern } from "./ui/dot-pattern"
import { cn } from "@/lib/utils"
import { BackgroundBeams } from "./background-beans"

export function InteractiveBanner() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isInteracting, setIsInteracting] = useState(false)
  const { addPoints } = useProgress()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleResize = () => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // subtle floating animation variants for icons
  const floatVariant = {
    animate: (i: number) => ({
      y: [0, -10, 0],
      x: [0, 5, 0],
      transition: {
        delay: i * 0.3,
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  }

  return (
    <div
      className="relative w-full h-[400px] md:h-[500px] bg-gradient-to-br from-green-200 to-blue-100 dark:from-green-950 dark:to-blue-950 rounded-2xl overflow-hidden"
    >
      <BackgroundBeams />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-4">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 dark:text-gray-100 leading-tight"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="block">Bem-vindo ao</span>
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            EcoVerso
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl max-w-2xl text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Explore a educação ambiental de forma interativa: jogos, desafios e recursos para consciencializar e inspirar
        </motion.p>

        <motion.div
          className="flex flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Button asChild size="lg" className="shadow-lg hover:shadow-xl">
            <Link href="/atividades">Começar a Explorar</Link>
          </Button>

          <Button variant="outline" size="lg" asChild className="border-green-500 text-green-600 hover:bg-green-100 dark:hover:bg-green-900">
            <Link href="/sobre">Saiba Mais</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
