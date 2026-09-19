"use client"

import { useEffect, useState } from "react"
import { useProgress } from "@/components/progress-provider"
import {
  carregarTurmas,
  salvarTurmas,
  gerarCodigoTurma,
  normalizarCodigoTurma,
  validarCodigoTurma,
  codificarProgressoAluno,
  decodificarProgressoAluno,
  turmaParaCsv,
  ALUNO_TURMA_STORAGE_KEY,
  type Turma,
} from "@/data/turmas"
import { quizzes } from "@/data/quizzes"
import { achievements } from "@/data/achievements"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import {
  Award,
  Copy,
  Download,
  Flame,
  GraduationCap,
  LogOut,
  Plus,
  Trash2,
  Upload,
  Users,
  BookOpen,
  Gamepad2,
} from "lucide-react"

interface VinculoAluno {
  codigo: string
  nome: string
}

export function ModoTurma() {
  return (
    <Tabs defaultValue="aluno" className="w-full">
      <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
        <TabsTrigger value="aluno">🎒 Sou Aluno</TabsTrigger>
        <TabsTrigger value="professor">👩‍🏫 Sou Professor</TabsTrigger>
      </TabsList>
      <TabsContent value="aluno" className="pt-6">
        <AlunoTab />
      </TabsContent>
      <TabsContent value="professor" className="pt-6">
        <ProfessorTab />
      </TabsContent>
    </Tabs>
  )
}

// ============================== ALUNO ==============================

function AlunoTab() {
  const { points, completedQuizzes, completedGames, unlockedAchievements, streak, hydrated } =
    useProgress()
  const [vinculo, setVinculo] = useState<VinculoAluno | null>(null)
  const [codigoInput, setCodigoInput] = useState("")
  const [nomeInput, setNomeInput] = useState("")
  const [codigoProgresso, setCodigoProgresso] = useState("")

  useEffect(() => {
    try {
      const raw = localStorage.getItem(ALUNO_TURMA_STORAGE_KEY)
      if (raw) setVinculo(JSON.parse(raw))
    } catch {
      // vínculo corrompido — ignora
    }
  }, [])

  const entrarNaTurma = () => {
    const codigo = normalizarCodigoTurma(codigoInput)
    if (!validarCodigoTurma(codigo)) {
      toast.error("Código inválido", {
        description: "O código da turma tem o formato ECO-XXXX. Confira com o seu professor.",
      })
      return
    }
    if (nomeInput.trim().length < 2) {
      toast.error("Informe o seu nome", { description: "Ele aparece no relatório do professor." })
      return
    }
    const novo = { codigo, nome: nomeInput.trim() }
    localStorage.setItem(ALUNO_TURMA_STORAGE_KEY, JSON.stringify(novo))
    setVinculo(novo)
    setCodigoProgresso("")
    toast.success(`Você entrou na turma ${codigo}! 🎉`)
  }

  const sairDaTurma = () => {
    localStorage.removeItem(ALUNO_TURMA_STORAGE_KEY)
    setVinculo(null)
    setCodigoProgresso("")
    setCodigoInput("")
    setNomeInput("")
    toast.info("Você saiu da turma.")
  }

  const gerarCodigo = () => {
    if (!vinculo) return
    const codigo = codificarProgressoAluno({
      v: 1,
      turma: vinculo.codigo,
      nome: vinculo.nome,
      pontos: points,
      quizzes: completedQuizzes.length,
      jogos: completedGames.length,
      conquistas: unlockedAchievements.length,
      streak,
      atualizadoEm: new Date().toISOString(),
    })
    setCodigoProgresso(codigo)
  }

  const copiarCodigo = async () => {
    try {
      await navigator.clipboard.writeText(codigoProgresso)
      toast.success("Código copiado!", { description: "Envie para o seu professor." })
    } catch {
      toast.error("Não foi possível copiar automaticamente.")
    }
  }

  if (!hydrated) return null

  if (!vinculo) {
    return (
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" /> Entrar em uma turma
          </CardTitle>
          <CardDescription>
            Peça o código da turma ao seu professor (formato ECO-XXXX). Depois de entrar, você
            poderá gerar o seu código de progresso para enviar a ele.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="turma-codigo" className="text-sm font-medium">
              Código da turma
            </label>
            <Input
              id="turma-codigo"
              placeholder="ECO-XXXX"
              value={codigoInput}
              onChange={(e) => setCodigoInput(e.target.value)}
              maxLength={8}
              className="uppercase font-mono tracking-widest"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="aluno-nome" className="text-sm font-medium">
              O seu nome
            </label>
            <Input
              id="aluno-nome"
              placeholder="Como você quer aparecer no relatório"
              value={nomeInput}
              onChange={(e) => setNomeInput(e.target.value)}
              maxLength={40}
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col items-stretch gap-3">
          <Button onClick={entrarNaTurma}>Entrar na turma</Button>
          <p className="text-xs text-muted-foreground text-center">
            Sem contas nem senhas: tudo fica salvo apenas neste dispositivo.
          </p>
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="max-w-lg mx-auto space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" /> {vinculo.nome}
          </CardTitle>
          <CardDescription>
            Turma <span className="font-mono font-medium">{vinculo.codigo}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg border p-3 text-center">
              <p className="text-2xl font-bold text-primary">{points}</p>
              <p className="text-muted-foreground">pontos</p>
            </div>
            <div className="rounded-lg border p-3 text-center">
              <p className="text-2xl font-bold text-primary">
                {completedQuizzes.length}/{quizzes.length}
              </p>
              <p className="text-muted-foreground">quizzes</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Gere um novo código sempre que quiser atualizar o seu professor — ele mostra o seu
            progresso atual (pontos, quizzes, jogos, conquistas e streak).
          </p>
          {codigoProgresso && (
            <Textarea
              readOnly
              value={codigoProgresso}
              className="font-mono text-xs h-24 break-all"
              onFocus={(e) => e.target.select()}
            />
          )}
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2">
          {!codigoProgresso ? (
            <Button onClick={gerarCodigo} className="flex-1">
              <Upload className="h-4 w-4 mr-2" /> Gerar meu código de progresso
            </Button>
          ) : (
            <Button onClick={copiarCodigo} className="flex-1">
              <Copy className="h-4 w-4 mr-2" /> Copiar código
            </Button>
          )}
          <Button variant="ghost" size="sm" className="text-destructive" onClick={sairDaTurma}>
            <LogOut className="h-4 w-4 mr-1" /> Sair da turma
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

// ============================= PROFESSOR =============================

function ProfessorTab() {
  const [turmas, setTurmas] = useState<Turma[]>([])
  const [nomeNovaTurma, setNomeNovaTurma] = useState("")
  const [importTexto, setImportTexto] = useState<Record<string, string>>({})
  const [excluindo, setExcluindo] = useState<Turma | null>(null)
  const [carregado, setCarregado] = useState(false)

  useEffect(() => {
    setTurmas(carregarTurmas())
    setCarregado(true)
  }, [])

  const persistir = (novas: Turma[]) => {
    setTurmas(novas)
    salvarTurmas(novas)
  }

  const criarTurma = () => {
    const nome = nomeNovaTurma.trim()
    if (nome.length < 2) {
      toast.error("Dê um nome à turma", { description: "Ex.: 7º Ano B — Ciências" })
      return
    }
    let codigo = gerarCodigoTurma()
    while (turmas.some((t) => t.codigo === codigo)) codigo = gerarCodigoTurma()
    persistir([...turmas, { codigo, nome, criadoEm: new Date().toISOString(), alunos: [] }])
    setNomeNovaTurma("")
    toast.success(`Turma criada! Código: ${codigo}`, {
      description: "Compartilhe o código com os alunos.",
    })
  }

  const excluirTurma = () => {
    if (!excluindo) return
    persistir(turmas.filter((t) => t.codigo !== excluindo.codigo))
    toast.info(`Turma "${excluindo.nome}" excluída.`)
    setExcluindo(null)
  }

  const copiarCodigoTurma = async (codigo: string) => {
    try {
      await navigator.clipboard.writeText(codigo)
      toast.success("Código da turma copiado!")
    } catch {
      toast.error("Não foi possível copiar automaticamente.")
    }
  }

  const importarCodigos = (turma: Turma) => {
    const texto = (importTexto[turma.codigo] ?? "").trim()
    if (!texto) return

    const linhas = texto.split(/\s+/).filter(Boolean)
    let alunos = [...turma.alunos]
    let adicionados = 0
    let atualizados = 0
    let erros = 0

    for (const linha of linhas) {
      const payload = decodificarProgressoAluno(linha)
      if (!payload) {
        erros++
        continue
      }
      if (normalizarCodigoTurma(payload.turma) !== turma.codigo) {
        erros++
        continue
      }
      const registro = {
        nome: payload.nome,
        pontos: payload.pontos,
        quizzes: payload.quizzes,
        jogos: payload.jogos,
        conquistas: payload.conquistas,
        streak: payload.streak,
        atualizadoEm: payload.atualizadoEm,
      }
      const idx = alunos.findIndex((a) => a.nome.toLowerCase() === payload.nome.toLowerCase())
      if (idx >= 0) {
        alunos[idx] = registro
        atualizados++
      } else {
        alunos = [...alunos, registro]
        adicionados++
      }
    }

    persistir(
      turmas.map((t) =>
        t.codigo === turma.codigo
          ? { ...t, alunos: [...alunos].sort((a, b) => b.pontos - a.pontos) }
          : t,
      ),
    )
    setImportTexto((prev) => ({ ...prev, [turma.codigo]: "" }))

    if (adicionados + atualizados > 0) {
      toast.success("Relatório atualizado!", {
        description: `${adicionados} aluno(s) adicionado(s), ${atualizados} atualizado(s).`,
      })
    }
    if (erros > 0) {
      toast.error(`${erros} código(s) inválido(s)`, {
        description: "Verifique se o código é desta turma e está completo.",
      })
    }
  }

  const removerAluno = (turmaCodigo: string, nome: string) => {
    persistir(
      turmas.map((t) =>
        t.codigo === turmaCodigo
          ? { ...t, alunos: t.alunos.filter((a) => a.nome !== nome) }
          : t,
      ),
    )
  }

  const baixarCsv = (turma: Turma) => {
    const blob = new Blob([turmaParaCsv(turma)], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `relatorio-${turma.codigo.toLowerCase()}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!carregado) return null

  return (
    <div className="space-y-6">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" /> Criar nova turma
          </CardTitle>
          <CardDescription>
            Você recebe um código para compartilhar com os alunos. Eles entram na turma e te enviam
            o código de progresso — sem cadastros nem senhas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Nome da turma (ex.: 7º Ano B)"
              value={nomeNovaTurma}
              onChange={(e) => setNomeNovaTurma(e.target.value)}
              maxLength={40}
              onKeyDown={(e) => e.key === "Enter" && criarTurma()}
            />
            <Button onClick={criarTurma}>Criar</Button>
          </div>
        </CardContent>
      </Card>

      {turmas.length === 0 && (
        <p className="text-center text-sm text-muted-foreground">
          Nenhuma turma criada ainda. Crie a primeira acima! 👆
        </p>
      )}

      {turmas.map((turma) => {
        const ativos = turma.alunos.filter(
          (a) => Date.now() - new Date(a.atualizadoEm).getTime() < 7 * 86400000,
        ).length
        const mediaPontos =
          turma.alunos.length > 0
            ? Math.round(turma.alunos.reduce((s, a) => s + a.pontos, 0) / turma.alunos.length)
            : 0
        const mediaQuizzes =
          turma.alunos.length > 0
            ? (turma.alunos.reduce((s, a) => s + a.quizzes, 0) / turma.alunos.length).toFixed(1)
            : "0"

        return (
          <Card key={turma.codigo}>
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <CardTitle>{turma.nome}</CardTitle>
                  <CardDescription>
                    Criada em {new Date(turma.criadoEm).toLocaleDateString("pt-BR")}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copiarCodigoTurma(turma.codigo)}
                    className="font-mono text-lg font-bold tracking-widest bg-primary/10 text-primary px-3 py-1 rounded-md hover:bg-primary/20 transition-colors"
                    title="Clique para copiar"
                  >
                    {turma.codigo}
                  </button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    onClick={() => setExcluindo(turma)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Excluir turma</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Relatório de participação */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="rounded-lg border p-3 text-center">
                  <Users className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-xl font-bold">{turma.alunos.length}</p>
                  <p className="text-xs text-muted-foreground">alunos</p>
                </div>
                <div className="rounded-lg border p-3 text-center">
                  <Flame className="h-4 w-4 mx-auto mb-1 text-orange-500" />
                  <p className="text-xl font-bold">{ativos}</p>
                  <p className="text-xs text-muted-foreground">ativos (7 dias)</p>
                </div>
                <div className="rounded-lg border p-3 text-center">
                  <Award className="h-4 w-4 mx-auto mb-1 text-yellow-500" />
                  <p className="text-xl font-bold">{mediaPontos}</p>
                  <p className="text-xs text-muted-foreground">média de pontos</p>
                </div>
                <div className="rounded-lg border p-3 text-center">
                  <BookOpen className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-xl font-bold">
                    {mediaQuizzes}/{quizzes.length}
                  </p>
                  <p className="text-xs text-muted-foreground">quizzes (média)</p>
                </div>
              </div>

              {/* Importar códigos dos alunos */}
              <div className="space-y-2">
                <label htmlFor={`import-${turma.codigo}`} className="text-sm font-medium">
                  Importar códigos de progresso dos alunos
                </label>
                <Textarea
                  id={`import-${turma.codigo}`}
                  placeholder="Cole aqui um ou mais códigos ECO1-... enviados pelos alunos"
                  value={importTexto[turma.codigo] ?? ""}
                  onChange={(e) =>
                    setImportTexto((prev) => ({ ...prev, [turma.codigo]: e.target.value }))
                  }
                  className="font-mono text-xs h-20"
                />
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" onClick={() => importarCodigos(turma)}>
                    <Upload className="h-4 w-4 mr-2" /> Importar
                  </Button>
                  {turma.alunos.length > 0 && (
                    <Button size="sm" variant="outline" onClick={() => baixarCsv(turma)}>
                      <Download className="h-4 w-4 mr-2" /> Baixar relatório (CSV)
                    </Button>
                  )}
                </div>
              </div>

              {/* Lista de alunos */}
              {turma.alunos.length > 0 ? (
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Aluno</TableHead>
                        <TableHead className="text-right">Pontos</TableHead>
                        <TableHead className="text-right">Quizzes</TableHead>
                        <TableHead className="text-right">Jogos</TableHead>
                        <TableHead className="text-right">Conquistas</TableHead>
                        <TableHead className="text-right">Streak</TableHead>
                        <TableHead className="text-right">Atualizado</TableHead>
                        <TableHead />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {turma.alunos.map((aluno) => (
                        <TableRow key={aluno.nome}>
                          <TableCell className="font-medium">{aluno.nome}</TableCell>
                          <TableCell className="text-right">{aluno.pontos}</TableCell>
                          <TableCell className="text-right">
                            {aluno.quizzes}/{quizzes.length}
                          </TableCell>
                          <TableCell className="text-right">
                            <span className="inline-flex items-center gap-1">
                              <Gamepad2 className="h-3 w-3 text-muted-foreground" />
                              {aluno.jogos}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            {aluno.conquistas}/{achievements.length}
                          </TableCell>
                          <TableCell className="text-right">{aluno.streak}d</TableCell>
                          <TableCell className="text-right text-muted-foreground">
                            {new Date(aluno.atualizadoEm).toLocaleDateString("pt-BR")}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-destructive"
                              onClick={() => removerAluno(turma.codigo, aluno.nome)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              <span className="sr-only">Remover {aluno.nome}</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-2">
                  Nenhum aluno ainda. Compartilhe o código{" "}
                  <span className="font-mono font-medium">{turma.codigo}</span> com a turma e
                  importe os códigos de progresso acima.
                </p>
              )}
            </CardContent>
          </Card>
        )
      })}

      <AlertDialog open={!!excluindo} onOpenChange={(open) => !open && setExcluindo(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir a turma &quot;{excluindo?.nome}&quot;?</AlertDialogTitle>
            <AlertDialogDescription>
              O código {excluindo?.codigo} e o relatório com {excluindo?.alunos.length ?? 0}{" "}
              aluno(s) serão apagados deste dispositivo. Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={excluirTurma}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Sim, excluir turma
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
