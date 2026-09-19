"use client"

import { useEffect, useState } from "react"
import { useProgress } from "@/components/progress-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Copy, Share2, MessageCircle, Twitter } from "lucide-react"

const NAME_KEY = "ecoverso-name"

export function Certificado() {
  const { points, streak } = useProgress()
  const [name, setName] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem(NAME_KEY)
    if (saved) setName(saved)
  }, [])

  const saveName = (value: string) => {
    setName(value)
    localStorage.setItem(NAME_KEY, value)
  }

  const today = new Date().toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const displayName = name.trim() || "Eco-Guerreiro(a)"
  const shareUrl = typeof window !== "undefined" ? window.location.origin : ""
  const shareText = `🎓 Acabei de concluir todos os quizzes do EcoVerso e recebi o certificado de Mestre do EcoVerso! 🌱 ${points} pontos acumulados. Aprenda você também sobre sustentabilidade:`

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "Certificado EcoVerso", text: shareText, url: shareUrl })
        return
      } catch {
        // Compartilhamento cancelado pelo usuário — não faz nada
        return
      }
    }
    await handleCopy()
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`)
      toast.success("Texto copiado!", { description: "Cole onde quiser para compartilhar o seu certificado." })
    } catch {
      toast.error("Não foi possível copiar automaticamente.")
    }
  }

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`

  return (
    <Card>
      <CardHeader>
        <CardTitle>O seu Certificado</CardTitle>
        <CardDescription>
          Escreva o seu nome (fica salvo apenas neste dispositivo) e compartilhe o feito com a
          escola ou nas redes sociais.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="max-w-sm">
          <label htmlFor="cert-name" className="text-sm font-medium block mb-1.5">
            Nome no certificado
          </label>
          <Input
            id="cert-name"
            value={name}
            onChange={(e) => saveName(e.target.value)}
            placeholder="O seu nome"
            maxLength={60}
          />
        </div>

        <div className="rounded-xl bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 p-1 shadow-lg">
          <div className="rounded-lg bg-background px-6 py-10 text-center space-y-4">
            <span className="text-5xl" aria-hidden>🎓</span>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
              Certificado de Conclusão
            </p>
            <p className="text-sm text-muted-foreground">Certificamos que</p>
            <p className="text-2xl font-bold text-primary break-words">{displayName}</p>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              concluiu com sucesso todos os quizzes do <strong>EcoVerso</strong>, demonstrando
              conhecimento em sustentabilidade, oceanos, clima, biodiversidade e energias
              renováveis.
            </p>
            <div className="flex items-center justify-center gap-6 pt-2 text-xs text-muted-foreground">
              <span>{today}</span>
              <span>·</span>
              <span>{points} pontos</span>
              <span>·</span>
              <span>{streak} {streak === 1 ? "dia" : "dias"} de streak</span>
            </div>
            <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
              Mestre do EcoVerso 🌱
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" /> Compartilhar
          </Button>
          <Button variant="outline" onClick={handleCopy}>
            <Copy className="h-4 w-4 mr-2" /> Copiar texto
          </Button>
          <Button variant="outline" asChild>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
              <Twitter className="h-4 w-4 mr-2" /> X / Twitter
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
