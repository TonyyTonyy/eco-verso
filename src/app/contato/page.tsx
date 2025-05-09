import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Mail, MessageSquare, HelpCircle } from "lucide-react"

export default function ContactPage() {
  const faqs = [
    {
      question: "Como posso implementar as atividades do EcoVerso em minha sala de aula?",
      answer:
        "Nossas atividades são projetadas para serem facilmente integradas aos currículos existentes. Você pode baixar nossos guias para educadores na seção de Recursos Educacionais, que fornecem instruções detalhadas para implementação. Também oferecemos workshops virtuais para professores - entre em contato para mais informações.",
    },
    {
      question: "Vocês oferecem apresentações ou workshops para escolas?",
      answer:
        "Sim! Oferecemos workshops virtuais e presenciais para escolas, grupos comunitários e organizações. Por favor, preencha o formulário de contato com suas necessidades específicas e entraremos em contato com as opções.",
    },
    {
      question: "Como posso contribuir para o EcoVerso?",
      answer:
        "Recebemos contribuições de educadores, especialistas ambientais e criadores de conteúdo. Se você tem ideias para atividades, artigos ou recursos, entre em contato através do nosso formulário. Também aceitamos doações para apoiar nossa missão de fornecer educação ambiental gratuita.",
    },
    {
      question: "Seus recursos estão disponíveis em outros idiomas além do português?",
      answer:
        "Estamos trabalhando na tradução de nossos recursos principais para vários idiomas. Atualmente, alguns materiais estão disponíveis em inglês e espanhol. Estamos buscando voluntários para ajudar com traduções - entre em contato se estiver interessado em contribuir.",
    },
    {
      question: "Posso usar os materiais do EcoVerso para meus próprios fins educacionais?",
      answer:
        "Sim! Nossos recursos estão disponíveis sob uma licença Creative Commons, o que significa que você pode usá-los e adaptá-los para fins educacionais não comerciais com atribuição ao EcoVerso. Para uso comercial, entre em contato conosco diretamente.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contato & Feedback</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Tem perguntas, sugestões ou quer colaborar? Adoraríamos ouvir de você!
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 mb-16">
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

       {/*  <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="h-5 w-5 mr-2" />
                Perguntas Frequentes
              </CardTitle>
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
        </div> */}
      </div>

     {/*  <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Junte-se à Nossa Comunidade</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Conecte-se com outros educadores e entusiastas ambientais para compartilhar ideias e recursos.
        </p>
        <Button size="lg" variant="outline">
          Participe do Nosso Fórum
        </Button>
      </section> */}
    </div>
  )
}
