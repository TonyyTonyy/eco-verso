import type { Metadata } from "next"
import { MapaAcaoLocal } from "@/components/mapa-acao-local"

export const metadata: Metadata = {
  title: "Mapa de Ação Local - EcoVerso",
  description:
    "Encontre ecopontos, pontos de reciclagem, hortas comunitárias e eventos ambientais perto de você. Deixe de apenas ler sobre sustentabilidade — aja agora.",
}

export default function MapaPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">🗺️ Mapa de Ação Local</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Encontre ecopontos, pontos de reciclagem, hortas comunitárias e eventos ambientais
          perto de você. Hora de transformar conhecimento em ação!
        </p>
      </div>

      <MapaAcaoLocal />

      <p className="text-xs text-muted-foreground text-center mt-8 max-w-xl mx-auto">
        * Dados de exemplo nas cidades de Feira de Santana, Salvador, Vitória da Conquista
        e Camaçari (BA). Confirme endereços e horários antes de visitar. Quer cadastrar um
        ponto na sua cidade? Fale conosco na página de contato.
      </p>
    </div>
  )
}
