// Desafios comunitários — metas coletivas da comunidade EcoVerso.
// Sem backend: o total é baseline + crescimento simulado da comunidade ao longo do tempo
// (determinístico) + as contribuições locais de cada visitante (localStorage).
// Se um dia houver backend, basta trocar `calcularTotal` por um fetch.

export interface DesafioComunitario {
  id: string
  titulo: string
  descricao: string
  icon: string
  unidade: string // ex.: "árvores", "kg"
  meta: number
  baseline: number // valor no início da campanha
  inicioEm: string // ISO date — começo da campanha
  taxaPorDia: number // crescimento simulado da comunidade por dia
  opcoesContribuicao: number[] // botões de contribuição rápida
  pontosPorContribuicao: number // pontos de gamificação por contribuição registrada
}

export const desafiosComunitarios: DesafioComunitario[] = [
  {
    id: "arvores",
    titulo: "Juntos plantamos 5.000 árvores",
    descricao: "Cada muda plantada conta: no quintal, na escola ou em mutirões de reflorestamento.",
    icon: "🌳",
    unidade: "árvores",
    meta: 5000,
    baseline: 2340,
    inicioEm: "2026-08-01T00:00:00.000Z",
    taxaPorDia: 42,
    opcoesContribuicao: [1, 5, 10],
    pontosPorContribuicao: 10,
  },
  {
    id: "residuos",
    titulo: "10.000 kg de resíduos reciclados",
    descricao: "Registre o que você separou para reciclagem esta semana e some à meta coletiva.",
    icon: "♻️",
    unidade: "kg",
    meta: 10000,
    baseline: 4780,
    inicioEm: "2026-08-01T00:00:00.000Z",
    taxaPorDia: 95,
    opcoesContribuicao: [1, 5, 20],
    pontosPorContribuicao: 10,
  },
  {
    id: "praias",
    titulo: "150 mutirões de limpeza",
    descricao: "Praia, praça ou parque: cada mutirão de limpeza organizado aproxima a comunidade da meta.",
    icon: "🏖️",
    unidade: "mutirões",
    meta: 150,
    baseline: 61,
    inicioEm: "2026-08-01T00:00:00.000Z",
    taxaPorDia: 1.6,
    opcoesContribuicao: [1],
    pontosPorContribuicao: 25,
  },
]

const CONTRIBUICOES_KEY = "ecoverso-contribuicoes"
const CONTRIBUICOES_DIA_KEY = "ecoverso-contribuicoes-dia"

// Progresso simulado da comunidade: cresce de forma determinística desde o início da campanha
export function progressoComunidade(d: DesafioComunitario, agora = new Date()): number {
  const dias = Math.max(0, (agora.getTime() - new Date(d.inicioEm).getTime()) / 86400000)
  return Math.round(d.baseline + dias * d.taxaPorDia)
}

export function carregarContribuicoes(): Record<string, number> {
  try {
    const raw = localStorage.getItem(CONTRIBUICOES_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function salvarContribuicoes(c: Record<string, number>): void {
  localStorage.setItem(CONTRIBUICOES_KEY, JSON.stringify(c))
}

// Data local de hoje no formato AAAA-MM-DD (limite de 1 contribuição por desafio/dia)
export function dataLocalHoje(agora = new Date()): string {
  const mes = String(agora.getMonth() + 1).padStart(2, "0")
  const dia = String(agora.getDate()).padStart(2, "0")
  return `${agora.getFullYear()}-${mes}-${dia}`
}

// Mapa desafioId -> data local da última contribuição (AAAA-MM-DD)
export function carregarContribuicoesDia(): Record<string, string> {
  try {
    const raw = localStorage.getItem(CONTRIBUICOES_DIA_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function salvarContribuicoesDia(c: Record<string, string>): void {
  localStorage.setItem(CONTRIBUICOES_DIA_KEY, JSON.stringify(c))
}

export function formatarQuantidade(valor: number): string {
  return valor.toLocaleString("pt-BR")
}
