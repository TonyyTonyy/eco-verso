import type { Metadata } from "next";
import { GincanasConteudo } from "@/components/gincanas-conteudo";

export const metadata: Metadata = {
  title: "Gincanas Ecológicas - EcoVerso",
  description:
    "Instruções passo a passo para atividades ambientais interativas para escolas e comunidades.",
};

export default function GincanasPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Gincanas Ecológicas</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Instruções passo a passo para atividades ambientais interativas
          perfeitas para escolas, grupos comunitários e programas de educação
          ambiental.
        </p>
      </div>

      <GincanasConteudo />
    </div>
  );
}
