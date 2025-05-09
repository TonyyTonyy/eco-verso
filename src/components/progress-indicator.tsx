"use client"

import { useProgress } from "@/components/progress-provider"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { Award } from "lucide-react"

export function ProgressIndicator() {
  const { progress, points } = useProgress()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Award className="h-5 w-5 text-primary" />
          {points > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              {points > 999 ? "999+" : points}
            </span>
          )}
          <span className="sr-only">View progress</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
         {/*  <div className="space-y-2">
            <h4 className="font-medium">Seu Progresso</h4>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Exploração do Site</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div> */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <h4 className="font-medium">Pontos Ganhos</h4>
              <span className="font-medium text-primary">{points}</span>
            </div>
            <p className="text-xs text-muted-foreground">Complete atividades e desafios para ganhar mais pontos!</p>
          </div>
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Medalhas</h4>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-full flex items-center justify-center ${
                    i < Math.floor(progress / 25)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Award className="h-5 w-5" />
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Desbloqueie medalhas conforme explora mais do EcoVerso!
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
