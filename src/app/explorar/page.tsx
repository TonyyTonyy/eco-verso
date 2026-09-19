import type { Metadata } from "next"
import { SobreConteudo } from "@/app/sobre/sobre-conteudo"
import { ArtigosConteudo } from "@/app/artigos/artigos-conteudo"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Explorar - EcoVerso",
  description: "Conheça a missão do EcoVerso e explore os nossos artigos sobre sustentabilidade.",
}

export default function ExplorarPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Explorar o EcoVerso</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Conheça o projeto e aprofunde-se nos temas ambientais com os nossos artigos.
        </p>
      </div>

      <Tabs defaultValue="sobre">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="sobre">Sobre o Projeto</TabsTrigger>
          <TabsTrigger value="artigos">Artigos</TabsTrigger>
        </TabsList>
        <TabsContent value="sobre" className="pt-6">
          <SobreConteudo />
        </TabsContent>
        <TabsContent value="artigos" className="pt-6">
          <ArtigosConteudo />
        </TabsContent>
      </Tabs>
    </div>
  )
}
