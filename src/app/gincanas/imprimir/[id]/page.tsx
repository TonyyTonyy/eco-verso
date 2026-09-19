import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ecoActivities } from "@/data/gincanas"
import { BotaoImprimir } from "@/components/botao-imprimir"
import { ArrowLeft, Clock, Users, GraduationCap } from "lucide-react"

export function generateStaticParams() {
  return ecoActivities.map((a) => ({ id: a.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const activity = ecoActivities.find((a) => a.id === id)
  return {
    title: activity ? `${activity.title} (impressão) - EcoVerso` : "Gincana - EcoVerso",
  }
}

export default async function ImprimirGincanaPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const activity = ecoActivities.find((a) => a.id === id)
  if (!activity) notFound()

  // Cores explícitas (sem tokens de tema): a impressão sai sempre clara,
  // mesmo com o site em modo escuro
  return (
    <div className="bg-white text-black min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="no-print flex items-center justify-between mb-8">
          <Link
            href="/gincanas"
            className="inline-flex items-center text-sm text-gray-600 hover:text-black"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Voltar às gincanas
          </Link>
          <BotaoImprimir />
        </div>

        {/* Cabeçalho da folha de atividade */}
        <header className="border-b-2 border-green-600 pb-4 mb-6">
          <p className="text-xs uppercase tracking-widest text-green-700 font-semibold mb-1">
            EcoVerso · Guia de Atividade
          </p>
          <h1 className="text-3xl font-bold">{activity.title}</h1>
          <p className="text-gray-700 mt-2">{activity.description}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-1 mt-3 text-sm text-gray-800">
            <span className="inline-flex items-center gap-1.5">
              <GraduationCap className="h-4 w-4" /> {activity.ageGroup}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-4 w-4" /> {activity.participants}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {activity.duration}
            </span>
          </div>
        </header>

        {/* Materiais com caixas de seleção para marcar no papel */}
        <section className="mb-6 break-inside-avoid">
          <h2 className="text-lg font-bold text-green-700 mb-2">1. Materiais necessários</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
            {activity.materials.map((material) => (
              <li key={material} className="flex items-start gap-2 text-sm">
                <span className="inline-block w-3.5 h-3.5 border border-gray-500 rounded-sm mt-0.5 shrink-0" />
                {material}
              </li>
            ))}
          </ul>
        </section>

        {/* Passo a passo */}
        <section className="mb-6">
          <h2 className="text-lg font-bold text-green-700 mb-2">2. Passo a passo</h2>
          <ol className="space-y-2">
            {activity.steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm break-inside-avoid">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-600 text-white text-xs font-bold">
                  {i + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Resultados de aprendizagem */}
        <section className="mb-6 break-inside-avoid">
          <h2 className="text-lg font-bold text-green-700 mb-2">3. O que os alunos vão aprender</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {activity.learningOutcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        </section>

        {/* Espaço para anotações do professor */}
        <section className="mb-8 break-inside-avoid">
          <h2 className="text-lg font-bold text-green-700 mb-2">4. Anotações</h2>
          <div className="space-y-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="border-b border-gray-400" />
            ))}
          </div>
        </section>

        <footer className="text-xs text-gray-500 border-t border-gray-300 pt-3 flex justify-between">
          <span>EcoVerso — Educação Ambiental Interativa</span>
          <span>Turma: ______________________ Data: ____/____/______</span>
        </footer>
      </div>
    </div>
  )
}
