import type { Metadata } from "next"
import { ArtigosConteudo } from "./artigos-conteudo"

export const metadata: Metadata = {
  title: "Artigos - EcoVerso",
  description:
    "Artigos sobre temas ambientais, dicas de vida sustentável e esforços de conservação.",
}

export default function ArticlesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Artigos</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Mantenha-se informado com nossos artigos mais recentes sobre temas ambientais, dicas de
          vida sustentável e esforços de conservação.
        </p>
      </div>

      <ArtigosConteudo />
    </div>
  )
}
