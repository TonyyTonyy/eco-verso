"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useProgress } from "@/components/progress-provider"
import { quizQuestions } from "@/data/quiz-questions"
import { Award, Clock, CheckCircle2 } from "lucide-react"

interface QuizTematicoProps {
  id: string
  title: string
  description: string
  difficulty: string
  points: number
  icon: string
}

const difficultyColor: Record<string, string> = {
  Fácil: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  Médio: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  Difícil: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
}

export function QuizTematico({ id, title, description, difficulty, points, icon }: QuizTematicoProps) {
  const [isStarted, setIsStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [earnedPoints, setEarnedPoints] = useState(0)
  const { addPoints, completedQuizzes, markQuizCompleted } = useProgress()

  const questions = quizQuestions[id]

  const handleStartQuiz = () => {
    setIsStarted(true)
    setCurrentQuestion(0)
    setScore(0)
    setIsCompleted(false)
    setEarnedPoints(0)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (!questions) return

    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer
    const newScore = isCorrect ? score + 1 : score
    setScore(newScore)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setIsCompleted(true)
      // Pontos só são creditados na primeira conclusão do quiz (anti-farming)
      const isFirstCompletion = markQuizCompleted(id)
      const earned = isFirstCompletion
        ? Math.round((newScore / questions.length) * points)
        : 0
      setEarnedPoints(earned)
      if (earned > 0) addPoints(earned)
    }
  }

  // Quiz sem perguntas configuradas não deve quebrar a página
  if (!questions) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <span className="mr-2 text-2xl">{icon}</span>
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Este quiz estará disponível em breve.</p>
        </CardContent>
      </Card>
    )
  }

  const alreadyCompleted = completedQuizzes.includes(id)

  return (
    <Card className={isCompleted ? "border-green-200 dark:border-green-800" : ""}>
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="flex items-center">
            <span className="mr-2 text-2xl">{icon}</span>
            {title}
          </CardTitle>
          <Badge className={difficultyColor[difficulty] ?? ""}>{difficulty}</Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {!isStarted && !isCompleted && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Award className="h-5 w-5 text-yellow-500 mr-2" />
              <span>{points} pontos</span>
            </div>
            <div className="flex items-center gap-3">
              {alreadyCompleted && (
                <span className="flex items-center text-xs text-green-600 dark:text-green-400">
                  <CheckCircle2 className="h-4 w-4 mr-1" /> Completado
                </span>
              )}
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-muted-foreground mr-2" />
                <span className="text-sm text-muted-foreground">{questions.length} perguntas</span>
              </div>
            </div>
          </div>
        )}

        {isStarted && !isCompleted && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">
                Pergunta {currentQuestion + 1} de {questions.length}
              </span>
              <span className="text-sm text-muted-foreground">
                Pontuação: {score}/{currentQuestion}
              </span>
            </div>

            <p className="font-medium">{questions[currentQuestion].question}</p>
            <div className="space-y-2">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left h-auto min-h-12 whitespace-normal"
                  onClick={() => handleAnswerSelect(index)}
                >
                  <span className="p-1">{option}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {isCompleted && (
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md">
            <p className="font-medium text-green-800 dark:text-green-100 mb-2">
              Quiz completo! Você acertou {score}/{questions.length} perguntas.
            </p>
            <p className="text-sm text-muted-foreground">
              {earnedPoints > 0
                ? `Você ganhou ${earnedPoints} pontos. Continue aprendendo com outros quizzes e atividades!`
                : "Você já completou este quiz anteriormente — os pontos já foram creditados. Explore outros quizzes!"}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!isStarted && !isCompleted && (
          <Button onClick={handleStartQuiz} className="w-full">
            Iniciar Quiz
          </Button>
        )}
        {isCompleted && (
          <Button variant="outline" onClick={handleStartQuiz} className="w-full">
            Tentar Novamente
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
