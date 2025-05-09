"use client";
import { useState, useEffect } from "react";
import {
  PieChart,
  Leaf,
  Users,
  Building,
  AlertTriangle,
  Trophy,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

export default function JogoQuizEcologico() {
  const [gameState, setGameState] = useState({
    ano: 1,
    populacao: 500,
    economiaPontos: 50,
    ambientePontos: 80,
    socialPontos: 70,
    sustentabilidade: 66,
    gameOver: false,
    vitoria: false,
    eventoAtual: null,
    decisoesTomadas: [] as { evento: string; decisao: string }[],
    mensagemFinal: "",
  });

  const [showDecisao, setShowDecisao] = useState(false);
  const [decisaoAtual, setDecisaoAtual] = useState<{ titulo: string; descricao: string; opcoes: { texto: string; resultados: { economiaPontos: number; ambientePontos: number; socialPontos: number; populacao: number; }; }[]; } | null>(null);
  const [instrucoes, setInstrucoes] = useState(true);
  
  const eventos = [
    {
      titulo: "Demanda por Energia",
      descricao:
        "A demanda por energia na cidade aumentou significativamente. O que você fará?",
      opcoes: [
        {
          texto: "Construir uma usina termoelétrica",
          resultados: {
            economiaPontos: +20,
            ambientePontos: -15,
            socialPontos: +5,
            populacao: +50,
          },
        },
        {
          texto: "Investir em energia solar e eólica",
          resultados: {
            economiaPontos: -10,
            ambientePontos: +20,
            socialPontos: +5,
            populacao: +20,
          },
        },
        {
          texto: "Implementar programa de eficiência energética",
          resultados: {
            economiaPontos: +5,
            ambientePontos: +10,
            socialPontos: +5,
            populacao: +10,
          },
        },
      ],
    },
    {
      titulo: "Gestão de Resíduos",
      descricao: "O volume de resíduos sólidos está aumentando. Como resolver?",
      opcoes: [
        {
          texto: "Construir um novo aterro sanitário",
          resultados: {
            economiaPontos: -5,
            ambientePontos: -10,
            socialPontos: -5,
            populacao: +20,
          },
        },
        {
          texto: "Implementar programa de coleta seletiva e reciclagem",
          resultados: {
            economiaPontos: +5,
            ambientePontos: +15,
            socialPontos: +10,
            populacao: +30,
          },
        },
        {
          texto: "Construir usina de compostagem comunitária",
          resultados: {
            economiaPontos: 0,
            ambientePontos: +20,
            socialPontos: +15,
            populacao: +15,
          },
        },
      ],
    },
    {
      titulo: "Mobilidade Urbana",
      descricao:
        "O trânsito está congestionado e a poluição do ar aumentando. O que fazer?",
      opcoes: [
        {
          texto: "Construir mais vias para carros",
          resultados: {
            economiaPontos: +10,
            ambientePontos: -15,
            socialPontos: -5,
            populacao: +40,
          },
        },
        {
          texto: "Investir em transporte público sustentável",
          resultados: {
            economiaPontos: -5,
            ambientePontos: +15,
            socialPontos: +15,
            populacao: +25,
          },
        },
        {
          texto: "Criar ciclovias e áreas para pedestres",
          resultados: {
            economiaPontos: +5,
            ambientePontos: +10,
            socialPontos: +20,
            populacao: +15,
          },
        },
      ],
    },
    {
      titulo: "Uso do Solo",
      descricao: "A cidade precisa expandir. Como planejar o crescimento?",
      opcoes: [
        {
          texto: "Permitir expansão horizontal da cidade",
          resultados: {
            economiaPontos: +15,
            ambientePontos: -20,
            socialPontos: -5,
            populacao: +60,
          },
        },
        {
          texto: "Focar em densidade urbana e desenvolvimento vertical",
          resultados: {
            economiaPontos: +10,
            ambientePontos: +10,
            socialPontos: +5,
            populacao: +30,
          },
        },
        {
          texto: "Implementar cinturão verde e limitar crescimento",
          resultados: {
            economiaPontos: -10,
            ambientePontos: +25,
            socialPontos: +10,
            populacao: +10,
          },
        },
      ],
    },
    {
      titulo: "Indústria Local",
      descricao: "Empresas querem se instalar na cidade. Como proceder?",
      opcoes: [
        {
          texto: "Atrair grandes indústrias com incentivos fiscais",
          resultados: {
            economiaPontos: +25,
            ambientePontos: -20,
            socialPontos: +5,
            populacao: +70,
          },
        },
        {
          texto: "Incentivar pequenos negócios sustentáveis",
          resultados: {
            economiaPontos: +5,
            ambientePontos: +10,
            socialPontos: +15,
            populacao: +20,
          },
        },
        {
          texto: "Criar um parque industrial com regras ambientais rígidas",
          resultados: {
            economiaPontos: +15,
            ambientePontos: +5,
            socialPontos: +10,
            populacao: +40,
          },
        },
      ],
    },
    {
      titulo: "Recursos Hídricos",
      descricao:
        "A cidade está enfrentando problemas com o abastecimento de água. Como lidar com isso?",
      opcoes: [
        {
          texto: "Construir uma nova barragem no rio próximo",
          resultados: {
            economiaPontos: +10,
            ambientePontos: -20,
            socialPontos: +5,
            populacao: +30,
          },
        },
        {
          texto: "Implementar sistema de captação de água da chuva",
          resultados: {
            economiaPontos: -5,
            ambientePontos: +15,
            socialPontos: +10,
            populacao: +15,
          },
        },
        {
          texto: "Criar programa de conscientização e redução do consumo",
          resultados: {
            economiaPontos: 0,
            ambientePontos: +10,
            socialPontos: +5,
            populacao: +5,
          },
        },
      ],
    },
    {
      titulo: "Educação Ambiental",
      descricao:
        "As escolas da cidade solicitam uma abordagem sobre sustentabilidade. O que implementar?",
      opcoes: [
        {
          texto: "Criar um centro de educação ambiental",
          resultados: {
            economiaPontos: -10,
            ambientePontos: +15,
            socialPontos: +20,
            populacao: +15,
          },
        },
        {
          texto: "Integrar sustentabilidade no currículo escolar",
          resultados: {
            economiaPontos: -5,
            ambientePontos: +10,
            socialPontos: +15,
            populacao: +10,
          },
        },
        {
          texto: "Promover visitas guiadas a áreas naturais protegidas",
          resultados: {
            economiaPontos: +5,
            ambientePontos: +15,
            socialPontos: +10,
            populacao: +5,
          },
        },
      ],
    },
    {
      titulo: "Segurança Alimentar",
      descricao:
        "A cidade precisa melhorar seu abastecimento de alimentos. Qual abordagem seguir?",
      opcoes: [
        {
          texto: "Atrair grandes redes de supermercados",
          resultados: {
            economiaPontos: +15,
            ambientePontos: -10,
            socialPontos: +5,
            populacao: +40,
          },
        },
        {
          texto: "Criar hortas comunitárias e feiras livres",
          resultados: {
            economiaPontos: +5,
            ambientePontos: +15,
            socialPontos: +20,
            populacao: +20,
          },
        },
        {
          texto: "Estimular agricultura urbana nos telhados verdes",
          resultados: {
            economiaPontos: -5,
            ambientePontos: +20,
            socialPontos: +15,
            populacao: +10,
          },
        },
      ],
    },
    {
      titulo: "Saúde Pública",
      descricao:
        "A infraestrutura de saúde da cidade precisa de melhorias. O que priorizar?",
      opcoes: [
        {
          texto: "Construir um grande hospital central",
          resultados: {
            economiaPontos: -15,
            ambientePontos: -5,
            socialPontos: +25,
            populacao: +60,
          },
        },
        {
          texto: "Implementar rede de clínicas de saúde preventiva",
          resultados: {
            economiaPontos: -10,
            ambientePontos: +5,
            socialPontos: +20,
            populacao: +40,
          },
        },
        {
          texto: "Criar programa de saúde baseado em plantas medicinais",
          resultados: {
            economiaPontos: +5,
            ambientePontos: +15,
            socialPontos: +10,
            populacao: +15,
          },
        },
      ],
    },
    {
      titulo: "Áreas Verdes",
      descricao:
        "A cidade tem poucos espaços verdes. Como resolver essa questão?",
      opcoes: [
        {
          texto: "Criar um grande parque central",
          resultados: {
            economiaPontos: -10,
            ambientePontos: +25,
            socialPontos: +15,
            populacao: +25,
          },
        },
        {
          texto: "Distribuir pequenas praças pelos bairros",
          resultados: {
            economiaPontos: -5,
            ambientePontos: +15,
            socialPontos: +20,
            populacao: +20,
          },
        },
        {
          texto: "Implementar corredores verdes conectando áreas naturais",
          resultados: {
            economiaPontos: -15,
            ambientePontos: +30,
            socialPontos: +10,
            populacao: +15,
          },
        },
      ],
    },
    {
      titulo: "Turismo Sustentável",
      descricao:
        "Existe potencial para desenvolver o turismo na cidade. Qual abordagem seguir?",
      opcoes: [
        {
          texto: "Construir grandes resorts e atrações",
          resultados: {
            economiaPontos: +25,
            ambientePontos: -20,
            socialPontos: +10,
            populacao: +50,
          },
        },
        {
          texto: "Desenvolver ecoturismo e turismo comunitário",
          resultados: {
            economiaPontos: +15,
            ambientePontos: +10,
            socialPontos: +15,
            populacao: +25,
          },
        },
        {
          texto: "Promover turismo cultural e gastronômico local",
          resultados: {
            economiaPontos: +10,
            ambientePontos: +5,
            socialPontos: +20,
            populacao: +20,
          },
        },
      ],
    },
    {
      titulo: "Tecnologia Verde",
      descricao:
        "Uma empresa de tecnologia quer se estabelecer na cidade. Que tipo de projeto apoiar?",
      opcoes: [
        {
          texto: "Centro de data centers de grande escala",
          resultados: {
            economiaPontos: +30,
            ambientePontos: -15,
            socialPontos: +10,
            populacao: +35,
          },
        },
        {
          texto: "Hub de startups focadas em tecnologias verdes",
          resultados: {
            economiaPontos: +15,
            ambientePontos: +10,
            socialPontos: +15,
            populacao: +25,
          },
        },
        {
          texto: "Centro de pesquisa em energias renováveis",
          resultados: {
            economiaPontos: +5,
            ambientePontos: +20,
            socialPontos: +10,
            populacao: +15,
          },
        },
      ],
    },
    {
      titulo: "Habitação",
      descricao:
        "Há uma crescente demanda por moradias na cidade. Como atender essa necessidade?",
      opcoes: [
        {
          texto: "Construir grandes conjuntos habitacionais na periferia",
          resultados: {
            economiaPontos: +10,
            ambientePontos: -15,
            socialPontos: +5,
            populacao: +70,
          },
        },
        {
          texto: "Revitalizar áreas centrais com habitações de uso misto",
          resultados: {
            economiaPontos: -5,
            ambientePontos: +10,
            socialPontos: +20,
            populacao: +40,
          },
        },
        {
          texto: "Implementar programa de ecovilas sustentáveis",
          resultados: {
            economiaPontos: -10,
            ambientePontos: +25,
            socialPontos: +15,
            populacao: +25,
          },
        },
      ],
    },
    {
      titulo: "Mudanças Climáticas",
      descricao:
        "A cidade está sentindo os efeitos das mudanças climáticas. Como se preparar?",
      opcoes: [
        {
          texto: "Construir grandes obras de infraestrutura contra enchentes",
          resultados: {
            economiaPontos: -20,
            ambientePontos: -5,
            socialPontos: +15,
            populacao: +10,
          },
        },
        {
          texto: "Implementar soluções baseadas na natureza",
          resultados: {
            economiaPontos: -5,
            ambientePontos: +25,
            socialPontos: +10,
            populacao: +15,
          },
        },
        {
          texto: "Criar plano de redução de emissões de carbono",
          resultados: {
            economiaPontos: -10,
            ambientePontos: +20,
            socialPontos: +5,
            populacao: +5,
          },
        },
      ],
    },
    {
      titulo: "Gestão de Crises",
      descricao:
        "Uma crise ambiental atingiu a região. Como a cidade deve responder?",
      opcoes: [
        {
          texto: "Investir em medidas emergenciais de contenção",
          resultados: {
            economiaPontos: -15,
            ambientePontos: +5,
            socialPontos: +10,
            populacao: -10,
          },
        },
        {
          texto: "Criar sistema integrado de prevenção e alerta",
          resultados: {
            economiaPontos: -10,
            ambientePontos: +15,
            socialPontos: +15,
            populacao: +5,
          },
        },
        {
          texto: "Estabelecer fundo de recuperação ambiental",
          resultados: {
            economiaPontos: -20,
            ambientePontos: +25,
            socialPontos: +5,
            populacao: 0,
          },
        },
      ],
    },
  ];

  useEffect(() => {
    if (
      !instrucoes &&
      !showDecisao &&
      !gameState.gameOver &&
      !gameState.vitoria
    ) {
      const indiceAleatorio = Math.floor(Math.random() * eventos.length);
      setDecisaoAtual(eventos[indiceAleatorio]);
      setShowDecisao(true);
    }
  }, [instrucoes, showDecisao, gameState.gameOver, gameState.vitoria]);

  useEffect(() => {
    // Verificar condições de fim de jogo
    if (
      gameState.ambientePontos <= 0 ||
      gameState.economiaPontos <= 0 ||
      gameState.socialPontos <= 0
    ) {
      setGameState({
        ...gameState,
        gameOver: true,
        mensagemFinal: definirMensagemDerrota(),
      });
    } else if (gameState.ano > 10) {
      const sustentabilidade = calcularSustentabilidade(gameState);
      setGameState({
        ...gameState,
        vitoria: true,
        sustentabilidade: sustentabilidade,
        mensagemFinal: definirMensagemVitoria(sustentabilidade),
      });
    }
  }, [
    gameState.ano,
    gameState.ambientePontos,
    gameState.economiaPontos,
    gameState.socialPontos,
  ]);

  function calcularSustentabilidade(state: any) {
    return Math.floor(
      (state.ambientePontos + state.economiaPontos + state.socialPontos) / 3
    );
  }

  function definirMensagemDerrota() {
    if (gameState.ambientePontos <= 0) {
      return "Sua cidade sofreu um colapso ambiental. Os recursos naturais se esgotaram e a qualidade de vida despencou.";
    } else if (gameState.economiaPontos <= 0) {
      return "A economia da cidade entrou em falência. Muitos moradores abandonaram a região em busca de oportunidades.";
    } else {
      return "O bem-estar social atingiu níveis críticos. Protestos e abandono tornaram a cidade insustentável.";
    }
  }

  function definirMensagemVitoria(sustentabilidade:any) {
    if (sustentabilidade >= 90) {
      return "Parabéns! Você criou uma das cidades mais sustentáveis do mundo, equilibrando perfeitamente economia, ambiente e sociedade.";
    } else if (sustentabilidade >= 70) {
      return "Sua cidade prosperou de forma sustentável! Há um bom equilíbrio entre os pilares do desenvolvimento sustentável.";
    } else {
      return "Sua cidade sobreviveu, mas ainda há muito a melhorar no equilíbrio entre economia, ambiente e sociedade.";
    }
  }

  function tomarDecisao(opcao:any) {
    const novosValores = {
      ...gameState,
      ano: gameState.ano + 1,
      economiaPontos: Math.max(
        0,
        Math.min(
          100,
          gameState.economiaPontos + opcao.resultados.economiaPontos
        )
      ),
      ambientePontos: Math.max(
        0,
        Math.min(
          100,
          gameState.ambientePontos + opcao.resultados.ambientePontos
        )
      ),
      socialPontos: Math.max(
        0,
        Math.min(100, gameState.socialPontos + opcao.resultados.socialPontos)
      ),
      populacao: gameState.populacao + opcao.resultados.populacao,
      decisoesTomadas: [
        ...gameState.decisoesTomadas,
        { evento: decisaoAtual?.titulo || '', decisao: opcao.texto },
      ],
    };

    novosValores.sustentabilidade = calcularSustentabilidade(novosValores);

    setGameState(novosValores);
    setShowDecisao(false);
  }

  function reiniciarJogo() {
    setGameState({
      ano: 1,
      populacao: 500,
      economiaPontos: 50,
      ambientePontos: 80,
      socialPontos: 70,
      sustentabilidade: 66,
      gameOver: false,
      vitoria: false,
      eventoAtual: null,
      decisoesTomadas: [],
      mensagemFinal: "",
    });
    setShowDecisao(false);
    setInstrucoes(true);
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 w-full max-w-3xl mx-auto">
      {instrucoes ? (
        <div className="text-center mb-6 mx-12">
          <h2 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-300">
            Cidade Sustentável
          </h2>
          <p className="mb-4 text-gray-800 dark:text-gray-200">
            Seu desafio é desenvolver uma cidade sustentável equilibrando os
            três pilares da sustentabilidade:
            <span className="font-semibold text-blue-600 dark:text-blue-400"> economia</span>,
            <span className="font-semibold text-green-600 dark:text-green-400"> ambiente</span> e
            <span className="font-semibold text-purple-600 dark:text-purple-400"> sociedade</span>.
          </p>
          <p className="mb-4 text-gray-800 dark:text-gray-200">
            A cada ano, você enfrentará um desafio e deverá tomar uma decisão.
            Suas escolhas afetarão os três pilares e a população da cidade.
          </p>
          <p className="mb-4 font-semibold text-gray-800 dark:text-gray-200">
            Objetivo: Sobreviver por 10 anos mantendo todos os indicadores acima
            de zero e alcançar o maior índice de sustentabilidade possível.
          </p>
          <button
            onClick={() => setInstrucoes(false)}
            className="mt-4 bg-green-600 dark:bg-green-500 text-white py-2 px-6 rounded-full flex items-center justify-center mx-auto hover:bg-green-700 dark:hover:bg-green-600"
          >
            Começar <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      ) : gameState.gameOver ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">
            Fim de Jogo - Ano {gameState.ano}
          </h2>
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900 rounded-lg border border-red-200 dark:border-red-700">
            <AlertTriangle className="h-8 w-8 text-red-500 dark:text-red-300 mx-auto mb-2" />
            <p className="text-lg text-gray-800 dark:text-gray-200">{gameState.mensagemFinal}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-800 dark:text-gray-200">População final</p>
              <p className="text-xl text-gray-900 dark:text-gray-100">{gameState.populacao} habitantes</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-800 dark:text-gray-200">Índice de Sustentabilidade</p>
              <p className="text-xl text-gray-900 dark:text-gray-100">{gameState.sustentabilidade}/100</p>
            </div>
          </div>
          <button
            onClick={reiniciarJogo}
            className="bg-blue-600 dark:bg-blue-500 text-white py-2 px-6 rounded-full flex items-center justify-center mx-auto hover:bg-blue-700 dark:hover:bg-blue-600"
          >
            Tentar Novamente <RotateCcw className="ml-2 h-4 w-4" />
          </button>
        </div>
      ) : gameState.vitoria ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-300">
            Cidade Desenvolvida! - 10 Anos Completos
          </h2>
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900 rounded-lg border border-green-200 dark:border-green-700">
            <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-lg text-gray-800 dark:text-gray-200">{gameState.mensagemFinal}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-800 dark:text-gray-200">População final</p>
              <p className="text-xl text-gray-900 dark:text-gray-100">{gameState.populacao} habitantes</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-800 dark:text-gray-200">Índice de Sustentabilidade</p>
              <p className="text-xl text-gray-900 dark:text-gray-100">{gameState.sustentabilidade}/100</p>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Decisões tomadas:</h3>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-left">
              <ul className="list-disc pl-5 text-gray-800 dark:text-gray-200">
                {gameState.decisoesTomadas.map((item, index) => (
                  <li key={index} className="mb-1">
                    <span className="font-medium dark:text-gray-100">{item.evento}:</span> {item.decisao}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button
            onClick={reiniciarJogo}
            className="bg-blue-600 dark:bg-blue-500 text-white py-2 px-6 rounded-full flex items-center justify-center mx-auto hover:bg-blue-700 dark:hover:bg-blue-600"
          >
            Jogar Novamente <RotateCcw className="ml-2 h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="min-h-[646px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Cidade Sustentável - Ano {gameState.ano}
            </h2>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-1" />
              <span className="text-gray-800 dark:text-gray-200">{gameState.populacao} habitantes</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <Building className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                <h3 className="font-semibold text-blue-600 dark:text-blue-400">Economia</h3>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${gameState.economiaPontos}%` }}
                ></div>
              </div>
              <p className="text-right mt-1 text-gray-800 dark:text-gray-200">{gameState.economiaPontos}/100</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <Leaf className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                <h3 className="font-semibold text-green-600 dark:text-green-400">Ambiente</h3>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-green-600 h-2.5 rounded-full"
                  style={{ width: `${gameState.ambientePontos}%` }}
                ></div>
              </div>
              <p className="text-right mt-1 text-gray-800 dark:text-gray-200">{gameState.ambientePontos}/100</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <Users className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
                <h3 className="font-semibold text-purple-600 dark:text-purple-400">Social</h3>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-purple-600 h-2.5 rounded-full"
                  style={{ width: `${gameState.socialPontos}%` }}
                ></div>
              </div>
              <p className="text-right mt-1 text-gray-800 dark:text-gray-200">{gameState.socialPontos}/100</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-6">
            <div className="flex items-center mb-2">
              <PieChart className="h-5 w-5 text-green-700 dark:text-green-400 mr-2" />
              <h3 className="font-semibold text-green-700 dark:text-green-400">
                Índice de Sustentabilidade
              </h3>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
              <div
                className={`h-4 rounded-full ${
                  gameState.sustentabilidade >= 75
                    ? 'bg-green-600'
                    : gameState.sustentabilidade >= 50
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`} style={{ width: `${gameState.sustentabilidade}%` }}
              ></div>
            </div>
            <p className="text-right mt-1 font-medium text-gray-800 dark:text-gray-200">
              {gameState.sustentabilidade}/100
            </p>
          </div>

          {showDecisao && decisaoAtual && (
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border-l-4 border-blue-500 dark:border-blue-400">
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">{decisaoAtual.titulo}</h3>
              <p className="mb-4 text-gray-800 dark:text-gray-200">{decisaoAtual.descricao}</p>
              <div className="space-y-3">
                {decisaoAtual.opcoes.map((opcao, index) => (
                  <button
                    key={index}
                    onClick={() => tomarDecisao(opcao)}
                    className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-600"
                  >
                    {opcao.texto}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
