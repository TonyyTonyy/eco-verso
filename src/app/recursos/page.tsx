import type { Metadata } from "next";
import { RecursosConteudo } from "@/components/recursos-conteudo";
import { GincanasConteudo } from "@/components/gincanas-conteudo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Recursos Educacionais - EcoVerso",
  description: "Vídeos, infográficos e gincanas para aprender e ensinar sustentabilidade.",
};

export default function EducationalResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Recursos Educacionais</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Vídeos, infográficos e gincanas prontas para imprimir — tudo para
          tornar a educação ambiental envolvente e acessível.
        </p>
      </div>

      <Tabs defaultValue="materiais">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="materiais">Materiais</TabsTrigger>
          <TabsTrigger value="gincanas">Gincanas</TabsTrigger>
        </TabsList>
        <TabsContent value="materiais" className="pt-6">
          <RecursosConteudo />
        </TabsContent>
        <TabsContent value="gincanas" className="pt-6">
          <GincanasConteudo />
        </TabsContent>
      </Tabs>
    </div>
  );
}
