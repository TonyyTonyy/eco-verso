import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Target, Printer, GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ecoActivities } from "@/data/gincanas";

// Conteúdo da página de Gincanas, extraído para ser reutilizado como seção/aba
export function GincanasConteudo() {
  return (
    <>
      <section className="mb-16">
        <div className="grid grid-cols-1 gap-8">
          {ecoActivities.map((activity) => (
            <Card key={activity.title}>
              <CardHeader>
                <CardTitle>{activity.title}</CardTitle>
                <CardDescription>{activity.description}</CardDescription>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Users className="h-3 w-3" /> {activity.participants}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {activity.duration}
                  </Badge>
                  <Badge variant="outline">{activity.ageGroup}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <Image
                    src={activity.image || "/PlaceholderImage.png"}
                    alt={activity.title}
                    width={600}
                    height={300}
                    className="rounded-md w-full object-cover"
                  />
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="materials">
                    <AccordionTrigger>Materiais Necessários</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-1">
                        {activity.materials.map((material, idx) => (
                          <li key={idx}>{material}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="steps">
                    <AccordionTrigger>
                      Instruções Passo a Passo
                    </AccordionTrigger>
                    <AccordionContent>
                      <ol className="list-decimal pl-5 space-y-2">
                        {activity.steps.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="outcomes">
                    <AccordionTrigger>
                      Resultados de Aprendizagem
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-1">
                        {activity.learningOutcomes.map((outcome, idx) => (
                          <li key={idx}>{outcome}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-2">
                <Button asChild className="w-full sm:w-auto">
                  <Link href={`/gincanas/imprimir/${activity.id}`}>
                    <Printer className="h-4 w-4 mr-2" /> Baixar PDF para imprimir
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-100 dark:border-green-900">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-6 w-6 mr-2" />
              Dicas para o Sucesso das Atividades
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-medium mb-2">A Preparação é Fundamental</h3>
                <p className="text-sm text-muted-foreground">
                  Teste as atividades você mesmo antes de implementá-las com um
                  grupo. Reúna todos os materiais com antecedência e tenha
                  extras à mão.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Adapte ao Seu Grupo</h3>
                <p className="text-sm text-muted-foreground">
                  Sinta-se à vontade para modificar as atividades com base na
                  faixa etária, espaço disponível e recursos. Os objetivos
                  principais de aprendizado podem permanecer os mesmos.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Tempo para Reflexão</h3>
                <p className="text-sm text-muted-foreground">
                  Sempre inclua tempo para discussão após as atividades.
                  Pergunte aos participantes o que aprenderam e como poderiam
                  aplicar esse conhecimento.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-16">
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="h-6 w-6 mr-2 text-primary" />
              É professor? Acompanhe a sua turma
            </CardTitle>
            <CardDescription>
              Crie uma turma com código, receba o progresso dos alunos e baixe
              relatórios de participação — sem cadastros.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild variant="outline">
              <Link href="/perfil?tab=turmas">Abrir o Modo Turma</Link>
            </Button>
          </CardFooter>
        </Card>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Compartilhe Sua Experiência</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Você já experimentou uma de nossas gincanas ecológicas? Adoraríamos
          ver fotos e ouvir sobre sua experiência!
        </p>
        <Button size="lg" asChild>
          <Link href="/contato">Envie Sua História</Link>
        </Button>
      </section>
    </>
  );
}
