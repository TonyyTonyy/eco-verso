import type { Metadata } from "next"
import { CalculadoraPegada } from "@/components/calculadora-pegada"

export const metadata: Metadata = {
  title: "Calculadora de Pegada de Carbono - EcoVerso",
  description:
    "Responda a algumas perguntas sobre seus hábitos de transporte, alimentação, energia e consumo, e descubra a sua pegada de carbono estimada com dicas personalizadas para reduzi-la.",
}

export default function PegadaPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">🌍 Calculadora de Pegada de Carbono</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Responda a 8 perguntas rápidas sobre os seus hábitos e descubra quantas toneladas de CO₂
          você emite por ano — com dicas personalizadas para reduzir o seu impacto.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <CalculadoraPegada />
      </div>

      <p className="text-xs text-muted-foreground text-center mt-8 max-w-xl mx-auto">
        * Estimativas educativas com base em fatores de emissão médios internacionais. Valores
        aproximados, pensados para aprendizagem e comparação — não substituem uma auditoria
        ambiental.
      </p>
    </div>
  )
}
