// Tipos e utilitários do Modo Turma — 100% local (localStorage), sem backend.
// Fluxo: o professor cria uma turma (código ECO-XXXX), o aluno entra com o código
// e gera um "código de progresso" (ECO1-...) que o professor importa para acompanhar.

export interface AlunoRegistro {
  nome: string
  pontos: number
  quizzes: number // quantidade de quizzes concluídos
  jogos: number // quantidade de jogos/atividades concluídos
  conquistas: number // quantidade de conquistas desbloqueadas
  streak: number
  atualizadoEm: string // ISO date
}

export interface Turma {
  codigo: string // ECO-XXXX
  nome: string
  criadoEm: string // ISO date
  alunos: AlunoRegistro[]
}

// Payload codificado no "código de progresso" do aluno
export interface ProgressoAlunoPayload extends AlunoRegistro {
  v: 1
  turma: string // código da turma
}

export const TURMAS_STORAGE_KEY = "ecoverso-turmas"
export const ALUNO_TURMA_STORAGE_KEY = "ecoverso-turma-aluno"

// Alfabeto sem caracteres ambíguos (0/O, 1/I/L) para facilitar a leitura em sala
const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"

export function gerarCodigoTurma(): string {
  const bytes = new Uint8Array(4)
  crypto.getRandomValues(bytes)
  let suffix = ""
  for (const b of bytes) suffix += CODE_ALPHABET[b % CODE_ALPHABET.length]
  return `ECO-${suffix}`
}

export function normalizarCodigoTurma(codigo: string): string {
  return codigo.trim().toUpperCase()
}

export function validarCodigoTurma(codigo: string): boolean {
  return /^ECO-[A-Z2-9]{4}$/.test(normalizarCodigoTurma(codigo))
}

// --- Codificação do progresso do aluno (base64url, seguro para Unicode) ---

function toBase64Url(text: string): string {
  const bytes = new TextEncoder().encode(text)
  let binary = ""
  bytes.forEach((b) => (binary += String.fromCharCode(b)))
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

function fromBase64Url(encoded: string): string {
  const b64 = encoded.replace(/-/g, "+").replace(/_/g, "/")
  const binary = atob(b64)
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

export function codificarProgressoAluno(payload: ProgressoAlunoPayload): string {
  return `ECO1-${toBase64Url(JSON.stringify(payload))}`
}

export function decodificarProgressoAluno(code: string): ProgressoAlunoPayload | null {
  try {
    const trimmed = code.trim()
    if (!trimmed.startsWith("ECO1-")) return null
    const data = JSON.parse(fromBase64Url(trimmed.slice(5)))
    const camposNumericos = ["pontos", "quizzes", "jogos", "conquistas", "streak"]
    if (
      data?.v !== 1 ||
      typeof data.nome !== "string" ||
      data.nome.trim().length === 0 ||
      typeof data.turma !== "string" ||
      !validarCodigoTurma(data.turma) ||
      typeof data.atualizadoEm !== "string" ||
      !camposNumericos.every((c) => typeof data[c] === "number" && data[c] >= 0)
    ) {
      return null
    }
    return data as ProgressoAlunoPayload
  } catch {
    return null
  }
}

// --- Persistência local das turmas do professor ---

export function carregarTurmas(): Turma[] {
  try {
    const raw = localStorage.getItem(TURMAS_STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Turma[]) : []
  } catch {
    return []
  }
}

export function salvarTurmas(turmas: Turma[]): void {
  localStorage.setItem(TURMAS_STORAGE_KEY, JSON.stringify(turmas))
}

// Exporta o relatório da turma em CSV (com BOM para abrir corretamente no Excel)
export function turmaParaCsv(turma: Turma): string {
  const header = "Nome;Pontos;Quizzes concluídos;Jogos concluídos;Conquistas;Streak (dias);Última atualização"
  const linhas = turma.alunos.map((a) =>
    [
      a.nome,
      a.pontos,
      a.quizzes,
      a.jogos,
      a.conquistas,
      a.streak,
      new Date(a.atualizadoEm).toLocaleString("pt-BR"),
    ].join(";"),
  )
  return "﻿" + [header, ...linhas].join("\r\n")
}
