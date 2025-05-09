import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JogoSeparacaoResiduos } from "@/components/jogo-separacao-residuos"
import { QuizTematico } from "@/components/quiz-tematico"
import Link from "next/link"
import { ArrowRight, Award, Brain } from "lucide-react"
import JogoQuizEcologico from "@/components/jogo-quiz-ecologico"

export default function SustainableActivitiesPage() {
  const quizzes = [
    
    {
      id: "oitoRs",
      title: "Os 8 Rs da Sustentabilidade",
      description: "Descubra o quanto você conhece sobre os princípios dos 8 Rs da sustentabilidade.",
      difficulty: "Médio",
      points: 150,
      icon: "♻️",
    },
    {
      id: "cidadesSustentaveis",
      title: "Cidades Sustentáveis",
      description: "Teste seu conhecimento sobre práticas e conceitos de cidades sustentáveis.",
      difficulty: "Difícil",
      points: 200,
      icon: "🏙️",
    },
    {
      id: "clima",
      title: "Mudanças Climáticas",
      description: "Teste seus conhecimentos sobre causas e soluções para as mudanças climáticas.",
      difficulty: "Médio",
      points: 150,
      icon: "🌡️",
    },
    {
      id: "biodiversidade",
      title: "Biodiversidade",
      description: "Quanto você sabe sobre a incrível biodiversidade da Terra?",
      difficulty: "Fácil",
      points: 100,
      icon: "🦋",
    },
    {
      id: "energia",
      title: "Energia Renovável",
      description: "Desafie-se com perguntas sobre fontes de energia renovável.",
      difficulty: "Difícil",
      points: 200,
      icon: "⚡",
    },
    {
      id: "oceanos",
      title: "Conservação dos Oceanos",
      description: "Mergulhe fundo no conhecimento sobre conservação dos oceanos.",
      difficulty: "Médio",
      points: 150,
      icon: "🌊",
    },
  ]

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
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="quizzes">Quizzes Temáticos</TabsTrigger>
          <TabsTrigger value="jogos">Missões Interativas</TabsTrigger>
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
                <CardTitle>Quiz Ecológico Interativo</CardTitle>
                <CardDescription>
                  Teste seus conhecimentos sobre meio ambiente e sustentabilidade neste quiz interativo com diferentes
                  níveis de dificuldade.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <JogoQuizEcologico />
              </CardContent>
              <CardFooter>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-yellow-500 mr-2" />
                    <span>Quanto maior a sustentabilidade, mais pontos!</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
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
          </div>
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
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Quizzes Completados</span>
                  <span className="text-sm font-medium">2/6</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "20%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Missões Interativas Completadas</span>
                  <span className="text-sm font-medium">1/2</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "50%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Total de Pontos Ganhos</span>
                  <span className="text-sm font-medium">250</span>
                </div>
              </div>
            </div>
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
