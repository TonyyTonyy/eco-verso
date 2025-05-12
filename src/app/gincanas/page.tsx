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
import { Clock, Users, Target } from "lucide-react";
import Image from "next/image";

export default function GincanasPage() {
  const ecoActivities = [
    {
      title: "Caça ao Tesouro da Biodiversidade",
      description:
        "Uma atividade ao ar livre onde os alunos identificam e documentam diferentes espécies em seu ambiente local.",
      image:
        "https://img.freepik.com/fotos-gratis/criancas-participando-de-uma-caca-ao-tesouro_23-2149042853.jpg?semt=ais_hybrid&w=740",
      ageGroup: "10-14 anos",
      participants: "Qualquer número",
      duration: "60 minutos",
      materials: [
        "Guias de identificação de espécies",
        "Cadernos",
        "Lápis",
        "Lupas",
        "Câmeras digitais (opcional)",
      ],
      steps: [
        "Prepare uma lista de espécies locais de plantas e animais para encontrar.",
        "Divida os alunos em pequenos grupos com guias de identificação.",
        "Estabeleça limites para a área de busca e regras de segurança.",
        "Os alunos documentam suas descobertas com notas e esboços ou fotos.",
        "Os grupos apresentam suas descobertas e discutem a importância de cada espécie.",
      ],
      learningOutcomes: [
        "Habilidades de identificação de espécies",
        "Compreensão dos ecossistemas locais",
        "Valorização da biodiversidade",
        "Técnicas de observação científica",
      ],
    },
    {
      title: "Oficina de Pelotas de Sementes",
      description:
        "Uma atividade prática em que os alunos preparam e espalham pelotas de sementes para restaurar áreas verdes locais.",
      image: "/cacaTesouro.jpg",
      ageGroup: "10-14 anos",
      participants: "Qualquer número",
      duration: "60 minutos",
      materials: [
        "Argila natural (sem aditivos químicos)",
        "Solo peneirado (terra de jardim)",
        "Sementes de plantas nativas ou flores silvestres",
        "Água em borrifador",
        "Bandejas ou recipientes rasos",
        "Luvas de jardinagem (opcional)",
      ],
      steps: [
        "Misture em um balde partes iguais de argila e solo peneirado.",
        "Adicione água aos poucos até formar uma massa maleável.",
        "Incorpore as sementes à massa de terra, garantindo distribuição uniforme.",
        "Modele pequenas pelotas (±2 cm de diâmetro) e deixe secar por 1–2 dias.",
        "Leve as pelotas até uma área degradada ou canteiro escolar e espalhe-as.",
        "Observe ao longo das semanas o germinar das sementes e faça registro fotográfico.",
      ],
      learningOutcomes: [
        "Entendimento dos ciclos de germinação e crescimento de plantas",
        "Conscientização sobre restauração ecológica e uso de plantas nativas",
        "Habilidades de trabalho colaborativo em atividades práticas",
        "Registro e monitoramento científico de mudanças no ambiente",
      ],
    },
    {
      title: "Competição de Reciclagem",
      description:
        "Uma competição divertida onde equipes coletam e separam materiais recicláveis, aprendendo sobre a importância da gestão adequada de resíduos.",
      image: "https://escolainfantilflorescer.com.br/site/wp-content/uploads/2019/10/grupo-de-criancas-colegas-aprendizagem-biologia-recicle-ambiente_53876-34451.jpg",
      ageGroup: "8-15 anos",
      participants: "Grupos de 4-6 alunos",
      duration: "90 minutos",
      materials: [
        "Luvas descartáveis",
        "Sacos de lixo coloridos (diferentes cores para cada tipo de material)",
        "Balança",
        "Cronômetro",
        "Placas de identificação (papel, plástico, metal, vidro, orgânico)",
        "Materiais recicláveis limpos para separação",
        "Pranchetas e fichas de pontuação",
      ],
      steps: [
        "Organize uma área com estações de coleta identificadas por tipo de material reciclável.",
        "Divida os alunos em equipes e explique as regras da competição e a pontuação.",
        "Na primeira fase, as equipes têm tempo determinado para coletar o máximo de materiais recicláveis pela escola/parque.",
        "Na segunda fase, as equipes devem separar corretamente os materiais nas estações correspondentes.",
        "Pontue pela quantidade coletada, precisão da separação e velocidade.",
        "Ao final, pese os materiais e calcule o impacto ambiental positivo da atividade.",
        "Discuta a importância da reciclagem e como incorporar essas práticas no dia a dia.",
      ],
      learningOutcomes: [
        "Conhecimento sobre tipos de materiais recicláveis e processos de reciclagem",
        "Desenvolvimento de habilidades de trabalho em equipe e organização",
        "Conscientização sobre a redução de resíduos e consumo responsável",
        "Compreensão do impacto ambiental da gestão de resíduos",
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Gincanas Ecológicas</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Instruções passo a passo para atividades ambientais interativas
          perfeitas para escolas, grupos comunitários e programas de educação
          ambiental.
        </p>
      </div>

      <section className="mb-16">
        <div className="grid grid-cols-1 gap-8">
          {ecoActivities.map((activity, index) => (
            <Card key={index}>
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
                    src={activity.image || "/placeholder.svg"}
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
              {/*  <CardFooter>
                <Button className="w-full sm:w-auto">
                  Baixar Guia de Atividade
                </Button>
              </CardFooter> */}
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

      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Compartilhe Sua Experiência</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Você já experimentou uma de nossas gincanas ecológicas? Adoraríamos
          ver fotos e ouvir sobre sua experiência!
        </p>
        <Button size="lg">Envie Sua História</Button>
      </section>
    </div>
  );
}
