"use client"

import { useState } from "react"
import Link from "next/link"
import { useProgress } from "@/components/progress-provider"
import { achievements } from "@/data/achievements"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Award, Flame, RotateCcw, User } from "lucide-react"

export function ProgressIndicator() {
  const { points, streak, unlockedAchievements, levelInfo, resetProgress } = useProgress()
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)

  const unlockedCount = unlockedAchievements.length

  return (
    <>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <Award className="h-5 w-5 text-primary" />
            {points > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-0.5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {points > 999 ? "999+" : points}
              </span>
            )}
            <span className="sr-only">View progress</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">
                  Nível {levelInfo.level} · {levelInfo.title}
                </h4>
                <span className="font-medium text-primary">{points} pts</span>
              </div>
              <Progress value={levelInfo.progressPercent} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {levelInfo.nextLevelPoints !== null
                  ? `Faltam ${levelInfo.nextLevelPoints - points} pontos para o próximo nível.`
                  : "Você atingiu o nível máximo. Lenda absoluta! 🌟"}
              </p>
              <p className="text-xs font-medium flex items-center gap-1">
                <Flame className="h-3.5 w-3.5 text-orange-500" />
                {streak} {streak === 1 ? "dia seguido" : "dias seguidos"} de atividade
              </p>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Conquistas</h4>
                <span className="text-xs text-muted-foreground">
                  {unlockedCount}/{achievements.length}
                </span>
              </div>
              <div className="grid grid-cols-6 gap-1.5">
                {achievements.map((a) => {
                  const unlocked = unlockedAchievements.includes(a.id)
                  return (
                    <div
                      key={a.id}
                      title={`${a.title} — ${a.description}`}
                      className={`aspect-square rounded-md flex items-center justify-center text-lg ${
                        unlocked
                          ? "bg-primary/15 ring-1 ring-primary/40"
                          : "bg-muted grayscale opacity-40"
                      }`}
                    >
                      <span aria-hidden>{a.icon}</span>
                      <span className="sr-only">
                        {a.title} {unlocked ? "(desbloqueada)" : "(bloqueada)"}
                      </span>
                    </div>
                  )
                })}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Passe o cursor sobre um ícone para ver como desbloquear.
              </p>
            </div>

            <div className="border-t pt-3 flex items-center justify-between gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/perfil" onClick={() => setPopoverOpen(false)}>
                  <User className="h-4 w-4 mr-1" /> Ver perfil
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={() => {
                  setPopoverOpen(false)
                  setConfirmReset(true)
                }}
              >
                <RotateCcw className="h-4 w-4 mr-1" /> Reiniciar
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <AlertDialog open={confirmReset} onOpenChange={setConfirmReset}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reiniciar todo o progresso?</AlertDialogTitle>
            <AlertDialogDescription>
              Isso apaga pontos, conquistas, streak, quizzes e jogos concluídos salvos neste
              dispositivo. Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={resetProgress}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Sim, reiniciar tudo
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
