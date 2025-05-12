"use client";
import { Play } from "lucide-react";
import { useState } from "react";

export default function PitchSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const startVideo = () => {
    setIsPlaying(true);
  };

  return (
    <section className="py-16 mb-6 relative rounded-2xl overflow-hidden">
      {/* Background com efeito de gradiente que se adapta ao modo escuro */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-300 to-blue-300 dark:from-green-950/30 dark:to-blue-900/40 opacity-70"></div>
      
      {/* Padrão decorativo */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptLTEyLTJjLTcuNzMyIDAtMTQgNi4yNjgtMTQgMTRzNi4yNjggMTQgMTQgMTQgMTQtNi4yNjggMTQtMTQtNi4yNjgtMTQtMTQtMTR6IiBmaWxsPSIjMDAwIi8+PC9nPjwvc3ZnPg==')]"></div>
      </div>

      {/* Conteúdo */}
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">
            Nossa Visão para um Futuro Sustentável
          </h2>
          <p className="text-muted-foreground sm:flex hidden max-w-2xl mx-auto dark:text-gray-300">
            Descubra como estamos revolucionando a educação ambiental e promovendo mudanças reais para um planeta mais saudável.
          </p>
        </div>

        <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl bg-white dark:bg-gray-800 relative">
          {!isPlaying ? (
            <div className="relative aspect-video bg-gray-100 dark:bg-gray-700 group cursor-pointer" onClick={startVideo}>
              {/* Thumbnail do vídeo */}
              <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: "url('/api/placeholder/640/360')" }}></div>
              
              {/* Overlay com botão de play */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-all">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-green-600 flex items-center justify-center group-hover:bg-green-500 transform group-hover:scale-110 transition-all">
                  <Play className="h-8 w-8 text-white ml-1" />
                </div>
              </div>
              
              {/* Texto sobre o vídeo */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="font-medium text-lg md:text-xl">Conheça Nossa Iniciativa</div>
                <div className="text-sm opacity-80">Clique para assistir ao nosso pitch (2:45)</div>
              </div>
            </div>
          ) : (
            <div className="aspect-video">
              <iframe 
                className="w-full h-full"
                src="https://youtube.com/embed/XGXQIDZiic8?autoplay=1" 
                title="Pitch do Projeto" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
              </iframe>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Este vídeo apresenta nossa missão, visão e os impactos positivos que 
            estamos criando através da educação ambiental e soluções sustentáveis.
          </p>
        </div>
      </div>
    </section>
  );
}