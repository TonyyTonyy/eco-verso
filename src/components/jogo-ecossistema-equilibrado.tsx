"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { useProgress } from "@/components/progress-provider"
import { Button } from "@/components/ui/button"
import { TreesIcon as Tree, Bug, Bird, Rabbit, RabbitIcon as Fox, Flower } from "lucide-react"

interface ElementoItem {
  id: string
  icon: React.ElementType
  label: string
  nivel: "produtor" | "consumidor-primario" | "consumidor-secundario" | "decompositor"
  color: string
}

interface NivelTrofico {
  id: string
  label: string
  items: ElementoItem[]
}

export function JogoEcossistemaEquilibrado() {
  const { addPoints, markGameCompleted } = useProgress()
  const [isDragging, setIsDragging] = useState(false)
  const [draggedItem, setDraggedItem] = useState<ElementoItem | null>(null)
  // Item selecionado por toque/clique (alternativa ao drag & drop em mobile)
  const [selectedItem, setSelectedItem] = useState<ElementoItem | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const dragConstraintsRef = useRef(null)

  const elementos: ElementoItem[] = [
    { id: "arvore", icon: Tree, label: "Árvore", nivel: "produtor", color: "#16a34a" },
    { id: "flor", icon: Flower, label: "Flor", nivel: "produtor", color: "#ec4899" },
    { id: "coelho", icon: Rabbit, label: "Coelho", nivel: "consumidor-primario", color: "#a1a1aa" },
    { id: "inseto", icon: Bug, label: "Inseto", nivel: "consumidor-primario", color: "#8b5cf6" },
    { id: "raposa", icon: Fox, label: "Raposa", nivel: "consumidor-secundario", color: "#f97316" },
    { id: "passaro", icon: Bird, label: "Pássaro", nivel: "consumidor-secundario", color: "#0ea5e9" },
    { id: "bacteria", icon: Bug, label: "Bactéria", nivel: "decompositor", color: "#64748b" },
  ]

  const [niveis, setNiveis] = useState<NivelTrofico[]>([
    { id: "produtor", label: "Produtores", items: [] },
    { id: "consumidor-primario", label: "Consumidores Primários", items: [] },
    { id: "consumidor-secundario", label: "Consumidores Secundários", items: [] },
    { id: "decompositor", label: "Decompositores", items: [] },
  ])

  const [availableItems, setAvailableItems] = useState<ElementoItem[]>(elementos)

  const handleDragStart = (item: ElementoItem) => {
    setIsDragging(true)
    setDraggedItem(item)
    setFeedback(null)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    setDraggedItem(null)
  }

  const handleDrop = (nivelId: string) => {
    const item = draggedItem ?? selectedItem
    if (!item) return

    const correctNivel = item.nivel === nivelId

    if (correctNivel) {
      // Atualiza níveis
      setNiveis(
        niveis.map((nivel) => (nivel.id === nivelId ? { ...nivel, items: [...nivel.items, item] } : nivel)),
      )

      // Remove dos itens disponíveis
      setAvailableItems(availableItems.filter((i) => i.id !== item.id))

      // Adiciona pontos
      addPoints(50)
      setFeedback("Correto! +50 pontos")

      // Verifica se o jogo está completo
      if (availableItems.length === 1) {
        setIsComplete(true)
        addPoints(100) // Pontos bônus por completar
        markGameCompleted("ecossistema") // Desbloqueia a conquista "Equilibrista Ecológico"
      }
    } else {
      setFeedback("Incorreto! Tente novamente.")
    }

    setSelectedItem(null)
  }

  // Alternativa ao drag & drop para telas de toque: tocar no item o seleciona
  const handleItemTap = (item: ElementoItem) => {
    if (isDragging) return
    setSelectedItem((prev) => (prev?.id === item.id ? null : item))
    setFeedback(null)
  }

  const resetGame = () => {
    setNiveis(niveis.map((nivel) => ({ ...nivel, items: [] })))
    setAvailableItems(elementos)
    setIsComplete(false)
    setFeedback(null)
    setSelectedItem(null)
  }

  return (
    <div className="relative" ref={dragConstraintsRef}>
      {isComplete && (
        <div className="absolute inset-0 bg-green-50/90 dark:bg-green-900/90 z-10 flex flex-col items-center justify-center rounded-lg p-4">
          <h3 className="text-xl font-bold mb-2">Ecossistema Completo!</h3>
          <p className="text-center mb-4">Você construiu com sucesso um ecossistema equilibrado.</p>
          <Button onClick={resetGame}>Jogar Novamente</Button>
        </div>
      )}

      {feedback && (
        <div
          className={`mb-4 p-3 rounded-md text-center ${
            feedback.includes("Correto")
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-100"
              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-100"
          }`}
        >
          {feedback}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {niveis.map((nivel) => (
          <div
            key={nivel.id}
            role="button"
            tabIndex={0}
            aria-label={`Colocar em ${nivel.label}`}
            className={`border-2 border-dashed rounded-lg p-4 min-h-[120px] flex flex-col items-center transition-colors cursor-pointer ${
              isDragging || selectedItem ? "border-primary bg-primary/5" : "border-muted"
            }`}
            onMouseUp={() => handleDrop(nivel.id)}
            onClick={() => selectedItem && handleDrop(nivel.id)}
            onKeyDown={(e) => e.key === "Enter" && selectedItem && handleDrop(nivel.id)}
          >
            <h3 className="font-medium mb-2">{nivel.label}</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {nivel.items.map((item) => (
                <div key={item.id} className="flex flex-col items-center p-2">
                  <item.icon className="h-8 w-8" style={{ color: item.color }} />
                  <span className="text-xs mt-1">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-muted p-4 rounded-lg">
        <h3 className="font-medium mb-2">Elementos Disponíveis</h3>
        <div className="flex flex-wrap gap-4 justify-center">
          {availableItems.map((item) => (
            <motion.div
              key={item.id}
              drag
              dragConstraints={dragConstraintsRef}
              onDragStart={() => handleDragStart(item)}
              onDragEnd={handleDragEnd}
              onTap={() => handleItemTap(item)}
              className={`flex flex-col items-center bg-background p-3 rounded-lg cursor-grab active:cursor-grabbing ring-offset-background ${
                selectedItem?.id === item.id ? "ring-2 ring-primary" : ""
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon className="h-8 w-8" style={{ color: item.color }} />
              <span className="text-xs mt-1">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-muted-foreground">
        Arraste cada elemento para o nível correto, ou toque no elemento e depois no nível
      </div>
    </div>
  )
}
