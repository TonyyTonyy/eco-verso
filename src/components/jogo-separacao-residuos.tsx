"use client"

import { useState, useEffect } from "react"
import { useProgress } from "@/components/progress-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Recycle, Apple, Leaf, BoxIcon as Bottle, Package, Battery, Coffee } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const residuos = [
  { id: "garrafa-plastica", icon: Bottle, label: "Garrafa PET", tipo: "reciclavel", color: "#3b82f6" },
  { id: "casca-fruta", icon: Apple, label: "Casca de Fruta", tipo: "organico", color: "#65a30d" },
  { id: "embalagem", icon: Package, label: "Embalagem", tipo: "reciclavel", color: "#3b82f6" },
  { id: "folhas", icon: Leaf, label: "Folhas Secas", tipo: "organico", color: "#65a30d" },
  { id: "pilha", icon: Battery, label: "Pilha", tipo: "perigoso", color: "#f59e0b" },
  { id: "copo-cafe", icon: Coffee, label: "Copo de Café", tipo: "reciclavel", color: "#8b5cf6" },
]

const lixeiras = [
  { id: "reciclavel", label: "Reciclável", icon: Recycle },
  { id: "organico", label: "Orgânico", icon: Leaf },
  { id: "perigoso", label: "Perigoso", icon: Battery },
]

export function JogoSeparacaoResiduos() {
  const { addPoints } = useProgress()
  const [score, setScore] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [gameOver, setGameOver] = useState(false)
  const [timeLeft, setTimeLeft] = useState(10)
  const [items, setItems] = useState(() => shuffleArray(residuos))

  // O timer pausa quando já há uma resposta selecionada (evita avanço duplo de rodada)
  useEffect(() => {
    if (gameOver || selected) return
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000)
      return () => clearTimeout(timer)
    }
    handleTimeout()
  }, [timeLeft, gameOver, selected])

  function shuffleArray<T>(arr: T[]): T[] {
    return [...arr].sort(() => Math.random() - 0.5)
  }

  function tipoLabel(tipo: string) {
    return lixeiras.find((l) => l.id === tipo)?.label ?? tipo
  }

  function handleTimeout() {
    setFeedback(`Tempo esgotado! Era ${tipoLabel(items[currentIndex].tipo)}.`)
    setSelected("__timeout__")
    setTimeout(nextRound, 1500)
  }

  function handleSelect(tipo: string) {
    if (selected || gameOver) return
    setSelected(tipo)
    const correct = items[currentIndex].tipo === tipo
    const pts = correct ? 50 + timeLeft * 5 : 0
    if (correct) {
      addPoints(pts)
      setScore((s) => s + pts)
      setFeedback(`+${pts} pontos!`)
    } else {
      setFeedback(`Errado! Era ${tipoLabel(items[currentIndex].tipo)}.`)
    }
    setTimeout(nextRound, 1500)
  }

  function nextRound() {
    const next = currentIndex + 1
    if (next >= items.length) {
      setGameOver(true)
      return
    }
    setCurrentIndex(next)
    setSelected(null)
    setFeedback(null)
    setTimeLeft(10)
  }

  function reset() {
    setItems(shuffleArray(residuos))
    setCurrentIndex(0)
    setScore(0)
    setSelected(null)
    setFeedback(null)
    setGameOver(false)
    setTimeLeft(10)
  }

  const current = items[currentIndex]
  const Icon = current.icon

  return (
    <div className="max-w-lg mx-auto space-y-6">

      <div className="flex justify-between items-center">
        <Badge variant="secondary">Pontos: {score}</Badge>
        <Badge variant="secondary">Rodada: {Math.min(currentIndex + 1, items.length)}/{items.length}</Badge>
      </div>

      {!gameOver ? (
        <>
          <Progress value={(timeLeft / 10) * 100} className="h-2" />

          <Card className="p-6">
            <CardContent className="flex flex-col items-center">
              <motion.div
                key={current.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Icon size={72} color={current.color} />
              </motion.div>
              <h2 className="text-2xl font-semibold mt-4">{current.label}</h2>
              <p className="text-sm mt-2 text-muted-foreground">Selecione a lixeira correta</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {lixeiras.map((lix) => (
              <Button
                key={lix.id}
                variant={selected === lix.id ? "default" : "outline"}
                onClick={() => handleSelect(lix.id)}
                disabled={!!selected}
                className="flex flex-row items-center gap-2 py-4"
              >
                <lix.icon size={32} />
                {lix.label}
              </Button>
            ))}
          </div>

          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={`mt-4 p-4 rounded-lg text-center ${
                  feedback.startsWith("+")
                    ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200"
                    : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200"
                }`}
              >
                {feedback}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <Card className="p-6 border-green-200 dark:border-green-800">
          <CardContent className="flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-4">Fim de Jogo!</h2>
            <p className="text-lg mb-6">Você fez {score} pontos.</p>
            <Button onClick={reset}>Jogar Novamente</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
