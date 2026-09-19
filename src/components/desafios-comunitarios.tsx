"use client"

import { useEffect, useState } from "react"
import { useProgress } from "@/components/progress-provider"
import {
  desafiosComunitarios,
  progressoComunidade,
  carregarContribuicoes,
  salvarContribuicoes,
  carregarContribuicoesDia,
  salvarContribuicoesDia,
  dataLocalHoje,
  formatarQuantidade,
  type DesafioComunitario,
} from "@/data/desafios-comunitarios"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import { CheckCircle2, Users } from "lucide-react"
import { motion } from "framer-motion"

export function DesafiosComunitarios() {
  const { addPoints, markGameCompleted } = useProgress()
  const [contribuicoes, setContribuicoes] = useState<Record<string, number>>({})
  const [ultimosDias, setUltimosDias] = useState<Record<string, string>>({})
  const [carregado, setCarregado] = useState(false)

  useEffect(() => {
    setContribuicoes(carregarContribuicoes())
    setUltimosDias(carregarContribuicoesDia())
    setCarregado(true)
  }, [])

  const contribuir = (desafio: DesafioComunitario, quantidade: number) => {
    const hoje = dataLocalHoje()
    if (ultimosDias[desafio.id] === hoje) {
      toast.error("Você já contribuiu neste desafio hoje.", {
        description: "Volte amanhã para registrar uma nova contribuição! 🌱",
      })
      return
    }
    const novas = {
      ...contribuicoes,
      [desafio.id]: (contribuicoes[desafio.id] ?? 0) + quantidade,
    }
    const novosDias = { ...ultimosDias, [desafio.id]: hoje }
    setContribuicoes(novas)
    salvarContribuicoes(novas)
    setUltimosDias(novosDias)
    salvarContribuicoesDia(novosDias)
    addPoints(desafio.pontosPorContribuicao)
    markGameCompleted("desafio-comunitario")
    toast.success(`+${quantidade} ${desafio.unidade} registrados! 🎉`, {
      description: `Você ganhou ${desafio.pontosPorContribuicao} pontos. Obrigado por contribuir!`,
    })
  }

  if (!carregado) return null

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {desafiosComunitarios.map((d, i) => {
        const minhas = contribuicoes[d.id] ?? 0
        const total = Math.min(d.meta, progressoComunidade(d) + minhas)
        const percentual = Math.min(100, (total / d.meta) * 100)
        const completo = total >= d.meta
        const jaContribuiuHoje = ultimosDias[d.id] === dataLocalHoje()

        return (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Card className={completo ? "border-green-400 dark:border-green-600" : ""}>
              <CardHeader>
                <CardTitle className="text-lg flex items-start gap-2">
                  <span className="text-2xl" aria-hidden>{d.icon}</span>
                  <span className="flex-1">{d.titulo}</span>
                  {completo && <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />}
                </CardTitle>
                <CardDescription>{d.descricao}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-primary">
                      {formatarQuantidade(total)} {d.unidade}
                    </span>
                    <span className="text-muted-foreground">
                      meta: {formatarQuantidade(d.meta)}
                    </span>
                  </div>
                  <Progress value={percentual} className="h-3" />
                  <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {completo
                      ? "Meta alcançada pela comunidade! 🎉"
                      : `${Math.round(percentual)}% da meta coletiva alcançada`}
                  </p>
                </div>

                <div className="border-t pt-3 space-y-2">
                  <p className="text-xs text-muted-foreground">
                    {jaContribuiuHoje
                      ? "Contribuição de hoje registrada. Volte amanhã! 🌱"
                      : minhas > 0
                        ? `Você já contribuiu com ${formatarQuantidade(minhas)} ${d.unidade}. 💚`
                        : "Contribua e ganhe pontos:"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {d.opcoesContribuicao.map((qtd) => (
                      <Button
                        key={qtd}
                        size="sm"
                        variant={minhas > 0 ? "outline" : "default"}
                        onClick={() => contribuir(d, qtd)}
                        disabled={jaContribuiuHoje}
                      >
                        +{qtd} {d.unidade}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}
