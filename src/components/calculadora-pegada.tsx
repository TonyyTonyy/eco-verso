"use client"

import { useEffect, useMemo, useState } from "react"
import { useProgress } from "@/components/progress-provider"
import {
  pegadaCategories,
  classificarPegada,
  PEGADA_REFERENCIAS,
  type PegadaCategory,
} from "@/data/pegada"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { ArrowLeft, ArrowRight, Award, Copy, Lightbulb, MessageCircle, RotateCcw, Share2, Twitter } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const CATEGORY_COLORS: Record<string, string> = {
  transporte: "#3b82f6",
  alimentacao: "#f97316",
  energia: "#eab308",
  consumo: "#8b5cf6",
}

const FIRST_COMPLETION_POINTS = 75

export function CalculadoraPegada() {
  const { addPoints, markGameCompleted } = useProgress()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [finished, setFinished] = useState(false)
  // Pontos atribuídos nesta sessão da calculadora (0 = já tinha sido concluída antes)
  const [awardedPoints, setAwardedPoints] = useState(0)

  // Recharts precisa de medidas do browser — só renderiza após a montagem
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const allQuestions = useMemo(
    () => pegadaCategories.flatMap((c) => c.questions.map((q) => ({ category: c, question: q }))),
    [],
  )
  const totalQuestions = allQuestions.length
  const current = allQuestions[step]
  const answeredCurrent = current ? answers[current.question.id] !== undefined : false

  const result = useMemo(() => {
    if (!finished) return null

    const categoryTotals = pegadaCategories.map((cat) => ({
      id: cat.id,
      title: cat.title,
      icon: cat.icon,
      total: cat.questions.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0),
      tips: cat.tips,
    }))
    const total = categoryTotals.reduce((sum, c) => sum + c.total, 0)
    // Dicas das 2 categorias com maior contribuição
    const topCategories = [...categoryTotals].sort((a, b) => b.total - a.total).slice(0, 2)

    return { categoryTotals, total, topCategories }
  }, [finished, answers])

  const handleSelect = (co2: number) => {
    setAnswers((prev) => ({ ...prev, [current.question.id]: co2 }))
  }

  const handleNext = () => {
    if (step < totalQuestions - 1) {
      setStep((s) => s + 1)
      return
    }
    setFinished(true)
    // Pontos e conquista apenas na primeira conclusão
    const isFirst = markGameCompleted("pegada-carbono")
    setAwardedPoints(isFirst ? FIRST_COMPLETION_POINTS : 0)
    if (isFirst) {
      addPoints(FIRST_COMPLETION_POINTS)
      toast.success(`+${FIRST_COMPLETION_POINTS} pontos!`, {
        description: "Obrigado por calcular a sua pegada de carbono. 🌍",
      })
    }
  }

  const handleRestart = () => {
    setAnswers({})
    setStep(0)
    setFinished(false)
  }

  const buildShareText = (total: number) =>
    `🌍 Calculei a minha pegada de carbono no EcoVerso: ${total.toFixed(1)} toneladas de CO₂ por ano! E a sua? Descubra aqui:`

  const handleShare = async (total: number) => {
    const url = typeof window !== "undefined" ? `${window.location.origin}/pegada` : ""
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "Pegada de Carbono", text: buildShareText(total), url })
        return
      } catch {
        return // compartilhamento cancelado
      }
    }
    await handleCopy(total)
  }

  const handleCopy = async (total: number) => {
    const url = typeof window !== "undefined" ? `${window.location.origin}/pegada` : ""
    try {
      await navigator.clipboard.writeText(`${buildShareText(total)} ${url}`)
      toast.success("Texto copiado!", { description: "Compartilhe a sua pegada onde quiser." })
    } catch {
      toast.error("Não foi possível copiar automaticamente.")
    }
  }

  // ---------- Tela de resultado ----------
  if (finished && result) {
    const { total, categoryTotals, topCategories } = result
    const classificacao = classificarPegada(total)
    const pieData = categoryTotals.map((c) => ({
      name: `${c.icon} ${c.title}`,
      value: Math.round(c.total * 100) / 100,
    }))
    const maxComparacao = Math.max(total, ...PEGADA_REFERENCIAS.map((r) => r.value))

    return (
      <div className="space-y-6">
        <Card className="border-green-200 dark:border-green-800">
          <CardHeader className="text-center">
            <CardDescription>Sua pegada de carbono estimada</CardDescription>
            <CardTitle className="text-5xl font-bold text-primary">
              {total.toFixed(1)} <span className="text-2xl font-normal">t CO₂/ano</span>
            </CardTitle>
            <p className="font-medium mt-2">{classificacao.titulo}</p>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">{classificacao.mensagem}</p>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Comparação com referências */}
            <div className="space-y-3 max-w-xl mx-auto">
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Sua pegada</span>
                  <span className="font-bold text-primary">{total.toFixed(1)} t</span>
                </div>
                <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${Math.max(2, (total / maxComparacao) * 100)}%` }}
                  />
                </div>
              </div>
              {PEGADA_REFERENCIAS.map((ref) => (
                <div key={ref.label} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{ref.label}</span>
                    <span className="text-muted-foreground">{ref.value.toFixed(1)} t</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-muted-foreground/40"
                      style={{ width: `${(ref.value / maxComparacao) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Gráfico por categoria */}
            <div className="h-64 w-full">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius="45%"
                      outerRadius="75%"
                      paddingAngle={3}
                      strokeWidth={0}
                    >
                      {pieData.map((entry, i) => (
                        <Cell key={entry.name} fill={CATEGORY_COLORS[categoryTotals[i].id]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value} t CO₂/ano`, ""]}
                      contentStyle={{
                        backgroundColor: "hsl(var(--popover))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        color: "hsl(var(--popover-foreground))",
                        fontSize: "13px",
                      }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: "12px" }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <Skeleton className="h-full w-full" />
              )}
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-4">
            <div className="flex flex-wrap justify-center gap-2">
              <Button onClick={() => handleShare(total)}>
                <Share2 className="h-4 w-4 mr-2" /> Compartilhar
              </Button>
              <Button variant="outline" onClick={() => handleCopy(total)}>
                <Copy className="h-4 w-4 mr-2" /> Copiar
              </Button>
              <Button variant="outline" asChild>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${buildShareText(total)} ${typeof window !== "undefined" ? `${window.location.origin}/pegada` : ""}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(buildShareText(total))}&url=${encodeURIComponent(typeof window !== "undefined" ? `${window.location.origin}/pegada` : "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-4 w-4 mr-2" /> X / Twitter
                </a>
              </Button>
            </div>
            <Button variant="ghost" size="sm" onClick={handleRestart}>
              <RotateCcw className="h-4 w-4 mr-2" /> Calcular novamente
            </Button>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-yellow-500" />
              {awardedPoints > 0
                ? `Você ganhou ${awardedPoints} pontos por calcular a sua pegada! 🎉`
                : "Os pontos desta atividade já foram creditados na primeira conclusão."}
            </p>
          </CardFooter>
        </Card>

        {/* Dicas personalizadas */}
        <div className="grid gap-4 md:grid-cols-2">
          {topCategories.map((cat) => (
            <Card key={cat.id}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <span aria-hidden>{cat.icon}</span> {cat.title}
                  <span className="text-sm font-normal text-muted-foreground ml-auto">
                    {cat.total.toFixed(1)} t
                  </span>
                </CardTitle>
                <CardDescription className="flex items-center gap-1.5">
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                  Sua {cat.id === topCategories[0].id ? "maior" : "segunda maior"} fonte de emissões
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {cat.tips.map((tip) => (
                    <li key={tip} className="text-sm flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // ---------- Assistente de perguntas ----------
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center gap-2">
          <CardTitle className="flex items-center gap-2">
            <span aria-hidden className="text-2xl">{current.category.icon}</span>
            {current.category.title}
          </CardTitle>
          <span className="text-sm text-muted-foreground">
            Pergunta {step + 1} de {totalQuestions}
          </span>
        </div>
        <CardDescription>{current.category.description}</CardDescription>
        <Progress value={((step + 1) / totalQuestions) * 100} className="h-2 mt-2" />
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={current.question.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <p className="font-medium text-lg">{current.question.title}</p>
            <RadioGroup
              value={answers[current.question.id]?.toString()}
              onValueChange={(v) => handleSelect(Number.parseFloat(v))}
              className="space-y-2"
            >
              {current.question.options.map((opt) => (
                <label
                  key={opt.label}
                  className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors hover:border-primary/60 ${
                    answers[current.question.id] === opt.co2
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                >
                  <RadioGroupItem value={opt.co2.toString()} id={`${current.question.id}-${opt.label}`} />
                  <span className="text-xl" aria-hidden>{opt.icon}</span>
                  <span className="text-sm flex-1">{opt.label}</span>
                </label>
              ))}
            </RadioGroup>
          </motion.div>
        </AnimatePresence>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setStep((s) => s - 1)} disabled={step === 0}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
        </Button>
        <Button onClick={handleNext} disabled={!answeredCurrent}>
          {step === totalQuestions - 1 ? "Ver resultado" : "Próxima"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
