import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JogoSeparacaoResiduos } from "@/components/jogo-separacao-residuos"
import { JogoEcossistemaEquilibrado } from "@/components/jogo-ecossistema-equilibrado"
import { QuizTematico } from "@/components/quiz-tematico"
import { ProgressSummary } from "@/components/progress-summary"
import { CalculadoraPegada } from "@/components/calculadora-pegada"
import { MapaAcaoLocal } from "@/components/mapa-acao-local"
import Link from "next/link"
import { ArrowRight, Award, Brain } from "lucide-react"
import { quizzes } from "@/data/quizzes"

export const metadata: Metadata = {
  title: "Atividades - EcoVerso",
  description: "Quizzes e jogos interativos sobre sustentabilidade e meio ambiente.",
}

export default function SustainableActivitiesPage() {

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Atividades Sustentáveis</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Participe de desafios e jogos interativos que tornam o aprendizado sobre sustentabilidade divertido e
          gratificante.
        </p>
      </div>

      <Tabs defaultValue="quizzes" className="mb-16">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          <TabsTrigger value="jogos">Missões</TabsTrigger>
          <TabsTrigger value="ferramentas">Ferramentas</TabsTrigger>
          <TabsTrigger value="acao">Ação Local</TabsTrigger>
        </TabsList>
        <TabsContent value="quizzes" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quizzes.map((quiz) => (
              <QuizTematico
                key={quiz.id}
                id={quiz.id}
                title={quiz.title}
                description={quiz.description}
                difficulty={quiz.difficulty}
                points={quiz.points}
                icon={quiz.icon}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="jogos" className="pt-6">
          <div className="mb-8">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Separação de Resíduos</CardTitle>
                <CardDescription>
                  Aprenda a separar corretamente diferentes tipos de resíduos para reciclagem, compostagem e descarte
                  adequado.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <JogoSeparacaoResiduos />
              </CardContent>
              <CardFooter>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-yellow-500 mr-2" />
                    <span>Quanto melhor o tempo, mais pontos!</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Ecossistema Equilibrado</CardTitle>
                <CardDescription>
                  Organize os elementos da natureza nos níveis tróficos corretos e construa um ecossistema
                  equilibrado.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <JogoEcossistemaEquilibrado />
              </CardContent>
              <CardFooter>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-yellow-500 mr-2" />
                    <span>50 pontos por acerto + 100 de bônus ao completar!</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="ferramentas" className="pt-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">🌍 Calculadora de Pegada de Carbono</h2>
              <p className="text-muted-foreground">
                Responda 8 perguntas rápidas, descubra as suas emissões anuais e ganhe 75 pontos na
                primeira conclusão.
              </p>
            </div>
            <CalculadoraPegada />
          </div>
        </TabsContent>
        <TabsContent value="acao" className="pt-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">🗺️ Mapa de Ação Local</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ecopontos, reciclagem, hortas comunitárias e eventos ambientais perto de você.
            </p>
          </div>
          <MapaAcaoLocal />
        </TabsContent>
      </Tabs>

      <section className="mb-16">
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-100 dark:border-green-900">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-6 w-6 mr-2" />
              Seu Progresso
            </CardTitle>
            <CardDescription>
              Acompanhe sua jornada de aprendizado e ganhe medalhas conforme completa atividades.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProgressSummary />
          </CardContent>
        </Card>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Quer Mais?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Confira nossos recursos educacionais para materiais de aprendizado mais aprofundados.
        </p>
        <Link href="/recursos">
          <Button size="lg">
            Explorar Recursos Educacionais <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </section>
    </div>
  )
}
