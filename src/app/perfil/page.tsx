"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { PerfilDashboard } from "@/components/perfil-dashboard"
import { ModoTurma } from "@/components/modo-turma"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

function PerfilTabs() {
  const searchParams = useSearchParams()
  const [tab, setTab] = useState(
    searchParams.get("tab") === "turmas" ? "turmas" : "progresso",
  )

  // Respeita links externos para a aba (ex.: /perfil?tab=turmas)
  useEffect(() => {
    if (searchParams.get("tab") === "turmas") setTab("turmas")
  }, [searchParams])

  return (
    <Tabs value={tab} onValueChange={setTab}>
      <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
        <TabsTrigger value="progresso">📊 Progresso</TabsTrigger>
        <TabsTrigger value="turmas">👩‍🏫 Turmas</TabsTrigger>
      </TabsList>
      <TabsContent value="progresso" className="pt-8">
        <PerfilDashboard />
      </TabsContent>
      <TabsContent value="turmas" className="pt-8">
        <ModoTurma />
      </TabsContent>
    </Tabs>
  )
}

export default function PerfilPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Meu Perfil</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Acompanhe a sua evolução, conquistas e streak no EcoVerso — ou gerencie as suas turmas.
          Tudo fica salvo apenas neste dispositivo.
        </p>
      </div>

      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <PerfilTabs />
      </Suspense>
    </div>
  )
}
