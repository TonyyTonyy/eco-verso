import type { Metadata } from "next";
import { SobreConteudo } from "./sobre-conteudo";

export const metadata: Metadata = {
  title: "Sobre - EcoVerso",
  description: "Conheça a jornada, missão e a equipe por trás do EcoVerso.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Sobre o EcoVerso</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Conheça nossa jornada, missão e a equipe por trás da plataforma de
          educação ambiental interativa do EcoVerso.
        </p>
      </div>

      <SobreConteudo />
    </div>
  );
}
