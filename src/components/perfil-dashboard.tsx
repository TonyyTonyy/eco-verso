"use client"

import { useEffect, useMemo, useState } from "react"
import { useProgress } from "@/components/progress-provider"
import { achievements } from "@/data/achievements"
import { quizzes } from "@/data/quizzes"
import { toDateKey } from "@/lib/utils"
import { Certificado } from "@/components/certificado"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Flame, Award, CheckCircle2, TrendingUp } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export function PerfilDashboard() {
  const {
    points,
    streak,
    activityLog,
    completedQuizzes,
    unlockedAchievements,
    levelInfo,
    hydrated,
  } = useProgress()

  // Recharts precisa de medidas do browser — só renderiza após a montagem
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Últimos 14 dias de atividade (dias sem pontos aparecem a zero)
  const chartData = useMemo(() => {
    const days: { label: string; pontos: number }[] = []
    for (let i = 13; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const key = toDateKey(d)
      const entry = activityLog.find((e) => e.date === key)
      days.push({
        label: `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`,
        pontos: entry?.points ?? 0,
      })
    }
    return days
  }, [activityLog])

  const allQuizzesDone = quizzes.every((q) => completedQuizzes.includes(q.id))
  const remainingQuizzes = quizzes.filter((q) => !completedQuizzes.includes(q.id))

  if (!hydrated) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
        <Skeleton className="h-72" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1.5">
              <Award className="h-4 w-4" /> Nível
            </CardDescription>
            <CardTitle className="text-2xl">
              {levelInfo.level} · {levelInfo.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={levelInfo.progressPercent} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {levelInfo.nextLevelPoints !== null
                ? `Faltam ${levelInfo.nextLevelPoints - points} pts para o nível ${levelInfo.level + 1}`
                : "Nível máximo alcançado!"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4" /> Pontos Totais
            </CardDescription>
            <CardTitle className="text-2xl">{points}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Ganhos em quizzes, jogos e desafios.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1.5">
              <Flame className="h-4 w-4 text-orange-500" /> Streak
            </CardDescription>
            <CardTitle className="text-2xl">
              {streak} {streak === 1 ? "dia" : "dias"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Volte amanhã para manter a chama acesa! 🔥
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" /> Quizzes
            </CardDescription>
            <CardTitle className="text-2xl">
              {completedQuizzes.length}/{quizzes.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={(completedQuizzes.length / quizzes.length) * 100} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {allQuizzesDone
                ? "Todos concluídos — certificado desbloqueado!"
                : `Faltam ${remainingQuizzes.length} para o certificado.`}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Evolução de Pontos</CardTitle>
          <CardDescription>Pontos ganhos por dia nos últimos 14 dias.</CardDescription>
        </CardHeader>
        <CardContent>
          {mounted ? (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 11 }}
                    className="text-muted-foreground"
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    className="text-muted-foreground"
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip
                    cursor={{ fill: "hsl(var(--muted))", opacity: 0.4 }}
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--popover-foreground))",
                      fontSize: "13px",
                    }}
                    formatter={(value) => [`${value} pts`, "Pontos"]}
                    labelFormatter={(label) => `Dia ${label}`}
                  />
                  <Bar dataKey="pontos" fill="#22c55e" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <Skeleton className="h-64 w-full" />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Conquistas</CardTitle>
              <CardDescription>
                Desbloqueie badges ao completar quizzes, jogos e desafios.
              </CardDescription>
            </div>
            <span className="text-sm font-medium text-primary">
              {unlockedAchievements.length}/{achievements.length}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((a) => {
              const unlocked = unlockedAchievements.includes(a.id)
              return (
                <div
                  key={a.id}
                  className={`flex items-start gap-3 rounded-lg border p-3 transition-colors ${
                    unlocked
                      ? "border-primary/40 bg-primary/5"
                      : "border-border opacity-60 grayscale"
                  }`}
                >
                  <span className="text-2xl" aria-hidden>
                    {a.icon}
                  </span>
                  <div>
                    <p className="font-medium text-sm flex items-center gap-1.5">
                      {a.title}
                      {unlocked && <CheckCircle2 className="h-3.5 w-3.5 text-primary" />}
                    </p>
                    <p className="text-xs text-muted-foreground">{a.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {allQuizzesDone ? (
        <Certificado />
      ) : (
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span aria-hidden>🎓</span> Certificado Bloqueado
            </CardTitle>
            <CardDescription>
              Complete todos os quizzes para desbloquear o seu certificado compartilhável de Mestre
              do EcoVerso.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">Ainda falta:</p>
            <ul className="space-y-1.5">
              {remainingQuizzes.map((q) => (
                <li key={q.id} className="text-sm flex items-center gap-2">
                  <span aria-hidden>{q.icon}</span> {q.title}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
