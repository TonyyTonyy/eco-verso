import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { MessageSquare, HelpCircle } from "lucide-react"
import { faqs } from "@/data/faqs"

export const metadata: Metadata = {
  title: "Contato - EcoVerso",
  description: "Tem perguntas, sugestões ou quer colaborar com o EcoVerso? Entre em contato.",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contato & Feedback</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Tem perguntas, sugestões ou quer colaborar? Adoraríamos ouvir de você!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-start">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Entre em Contato
            </CardTitle>
            <CardDescription>
              Preencha o formulário abaixo e entraremos em contato o mais breve possível.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" placeholder="Seu nome" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Seu email" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Eu sou:</Label>
                <RadioGroup defaultValue="educator">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="educator" id="educator" />
                      <Label htmlFor="educator">Educador</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="student" id="student" />
                      <Label htmlFor="student">Estudante</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="parent" id="parent" />
                      <Label htmlFor="parent">Pai/Mãe</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="organization" id="organization" />
                      <Label htmlFor="organization">Organização</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Outro</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Assunto</Label>
                <Input id="subject" placeholder="Sobre o que é isso?" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensagem</Label>
                <Textarea id="message" placeholder="Sua mensagem" rows={5} />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Enviar Mensagem</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="h-5 w-5 mr-2" />
              Perguntas Frequentes
            </CardTitle>
            <CardDescription>Respostas para as dúvidas mais comuns sobre o EcoVerso.</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
