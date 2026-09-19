"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useProgress } from "@/components/progress-provider"
import { desafioQuestions } from "@/data/desafio-semanal"
import { Award, ArrowRight, ArrowLeft, RotateCcw } from "lucide-react"

const POINTS_PER_CORRECT = 50

export function DesafioSemanal() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  // Respostas dadas por pergunta: impede re-responder (farming de pontos)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const { addPoints, markGameCompleted } = useProgress()

  const questions = desafioQuestions
  const currentQ = questions[currentQuestion]
  const selectedAnswer = answers[currentQuestion] ?? null
  const isAnswered = selectedAnswer !== null
  const isLastQuestion = currentQuestion === questions.length - 1

  const handleAnswerSelect = (index: number) => {
    if (isAnswered) return

    setAnswers((prev) => ({ ...prev, [currentQuestion]: index }))

    if (index === currentQ.correctAnswer) {
      setScore((s) => s + 1)
      addPoints(POINTS_PER_CORRECT)
    }
  }

  const handleNextQuestion = () => {
    if (!isLastQuestion) {
      setCurrentQuestion((q) => q + 1)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((q) => q - 1)
    }
  }

  const handleRestart = () => {
    setAnswers({})
    setScore(0)
    setCurrentQuestion(0)
    setShowResult(false)
  }

  if (showResult) {
    return (
      <Card className="border-green-100 dark:border-green-900">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Desafio Concluído!</CardTitle>
          <CardDescription>Você respondeu todas as perguntas do desafio semanal.</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <Badge className="bg-primary text-primary-foreground text-lg px-4 py-1">
            {score}/{questions.length} Acertos
          </Badge>
          <p className="text-muted-foreground">
            {score === questions.length
              ? "Perfeito! Você domina os temas de sustentabilidade."
              : "Bom trabalho! Reveja as explicações e tente novamente para melhorar."}
          </p>
        </CardContent>
        <CardFooter className="justify-center">
          <Button variant="outline" onClick={handleRestart}>
            <RotateCcw className="mr-2 h-4 w-4" /> Refazer Desafio
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="border-green-100 dark:border-green-900">
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
        <div className="p-4 bg-card rounded-lg border mb-4">
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
            <div className="mt-4 p-3 bg-muted rounded-md">
              <p className="text-sm">{currentQ.explanation}</p>
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
          <span className="text-sm md:text-base">{POINTS_PER_CORRECT} pontos por resposta correta</span>
        </div>

        {isLastQuestion ? (
          <Button
            onClick={() => {
              setShowResult(true)
              markGameCompleted("desafio-semanal") // Desbloqueia a conquista "Desafiante Semanal"
            }}
            disabled={!isAnswered}
          >
            Ver Resultado <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleNextQuestion} disabled={!isAnswered}>
            Próxima <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
