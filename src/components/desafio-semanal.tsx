"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useProgress } from "@/components/progress-provider"
import { Award, ArrowRight, ArrowLeft } from "lucide-react"

export function DesafioSemanal() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const { addPoints } = useProgress()

  const questions = [
    {
      question: "Qual é a principal causa das mudanças climáticas?",
      options: [
        "Emissões de gases de efeito estufa de atividades humanas",
        "Variações naturais na órbita da Terra",
        "Mudanças na atividade solar",
        "Erupções vulcânicas",
      ],
      correctAnswer: 0,
      explanation:
        "As atividades humanas são o principal motor das mudanças climáticas observadas, principalmente através das emissões de gases de efeito estufa.",
    },
    {
      question: "Qual das seguintes opções NÃO é uma fonte de energia renovável?",
      options: ["Energia solar", "Energia eólica", "Gás natural", "Energia hidrelétrica"],
      correctAnswer: 2,
      explanation:
        "O gás natural é um combustível fóssil não renovável, enquanto a energia solar, eólica e hidrelétrica são fontes renováveis.",
    },
    {
      question: "Aproximadamente quanto tempo leva para uma garrafa plástica se decompor no meio ambiente?",
      options: ["10-20 anos", "50-100 anos", "450-500 anos", "Mais de 1000 anos"],
      correctAnswer: 2,
      explanation:
        "As garrafas plásticas podem levar entre 450 e 500 anos para se decompor completamente no meio ambiente.",
    },
  ]

  const handleAnswerSelect = (index: number) => {
    if (isAnswered) return

    setSelectedAnswer(index)
    setIsAnswered(true)

    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
      addPoints(50)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
    }
  }

  const currentQ = questions[currentQuestion]

  return (
    <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-100 dark:border-green-900">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl">
            Pergunta {currentQuestion + 1} de {questions.length}
          </CardTitle>
          <Badge className="bg-primary text-primary-foreground">
            {score}/{questions.length} Acertos
          </Badge>
        </div>
        <CardDescription>Teste seus conhecimentos sobre sustentabilidade</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-4">
          <h3 className="font-medium mb-4">{currentQ.question}</h3>
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <Button
                key={index}
                variant={
                  selectedAnswer === null
                    ? "outline"
                    : selectedAnswer === index
                      ? index === currentQ.correctAnswer
                        ? "default"
                        : "destructive"
                      : index === currentQ.correctAnswer && isAnswered
                        ? "default"
                        : "outline"
                }
                className={`w-full justify-start whitespace-normal h-12 text-start dark:border-slate-600 dark:hover:border-green-600 ${
                  selectedAnswer === index
                    ? index === currentQ.correctAnswer
                      ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:hover:bg-green-800 dark:text-green-100"
                      : "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:hover:bg-red-800 dark:text-red-100"
                    : index === currentQ.correctAnswer && isAnswered
                      ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:hover:bg-green-800 dark:text-green-100"
                      : ""
                }`}
                onClick={() => handleAnswerSelect(index)}
              >
                {option}
              </Button>
            ))}
          </div>

          {isAnswered && (
            <div className="mt-4 p-3 bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 from-slate-200 to-slate-300 rounded-md">
              <p className="text-sm dark:text-white text-black">{currentQ.explanation}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handlePrevQuestion} disabled={currentQuestion === 0}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
        </Button>

        <div className="flex items-center">
          <Award className="h-5 w-5 text-yellow-500 mr-2 hidden md:block" />
          <span className="text-sm md:text-base">50 pontos por resposta correta</span>
        </div>

        <Button onClick={handleNextQuestion} disabled={currentQuestion === questions.length - 1 || !isAnswered}>
          Próxima <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
