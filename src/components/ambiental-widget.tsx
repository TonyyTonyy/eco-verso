"use client"

import { useEffect, useState } from "react"
import { Wind, Thermometer, Cloudy, CloudSun, CloudRain, Sun, MapPin } from "lucide-react"

interface DadosAmbientais {
  co2: number | null // ppm, dados de Mauna Loa via global-warming.org
  temperatura: number | null // °C
  qualidadeAr: number | null // índice europeu AQI
}

// Fallback: centro de Feira de Santana, BA (sem precisar de permissão de localização)
const FALLBACK_COORDS = { lat: -12.2664, lon: -38.9663 }

function classificarAqi(aqi: number | null): { texto: string; classe: string } {
  if (aqi === null) return { texto: "indisponível", classe: "text-gray-300" }
  if (aqi <= 20) return { texto: "boa", classe: "text-green-300" }
  if (aqi <= 40) return { texto: "razoável", classe: "text-lime-300" }
  if (aqi <= 60) return { texto: "moderada", classe: "text-yellow-300" }
  if (aqi <= 80) return { texto: "ruim", classe: "text-orange-300" }
  return { texto: "muito ruim", classe: "text-red-300" }
}

function IconeTempo(codigo: number | undefined) {
  // Códigos WMO (Open-Meteo): 0-1 limpo · 2-3 nublado · 45+ chuva/neblina
  if (codigo === undefined) return Cloudy
  if (codigo <= 1) return Sun
  if (codigo === 2) return CloudSun
  if (codigo <= 3) return Cloudy
  return CloudRain
}

export function AmbientalWidget() {
  const [dados, setDados] = useState<DadosAmbientais>({
    co2: null,
    temperatura: null,
    qualidadeAr: null,
  })
  const [local, setLocal] = useState("Feira de Santana")
  const [weatherCode, setWeatherCode] = useState<number | undefined>(undefined)

  useEffect(() => {
    let cancelado = false

    async function carregar(lat: number, lon: number, nomeLocal: string) {
      const [clima, ar, co2] = await Promise.allSettled([
        fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`,
        ).then((r) => r.json()),
        fetch(
          `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=european_aqi`,
        ).then((r) => r.json()),
        // Última leitura diária de CO₂ (ciclo) da série de Mauna Loa
        fetch("https://global-warming.org/api/co2-api")
          .then((r) => r.json())
          .then((json) => {
            const serie = json?.co2
            if (!Array.isArray(serie) || serie.length === 0) return null
            return Number.parseFloat(serie[serie.length - 1].cycle)
          }),
      ])

      if (cancelado) return
      setLocal(nomeLocal)
      setDados({
        temperatura:
          clima.status === "fulfilled" ? Math.round(clima.value?.current?.temperature_2m) : null,
        qualidadeAr:
          ar.status === "fulfilled" ? Math.round(ar.value?.current?.european_aqi) : null,
        co2: co2.status === "fulfilled" && !Number.isNaN(co2.value) ? co2.value : null,
      })
      if (clima.status === "fulfilled") {
        setWeatherCode(clima.value?.current?.weather_code)
      }
    }

    // Usa a geolocalização se disponível; caso contrário, cai no fallback
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => carregar(pos.coords.latitude, pos.coords.longitude, "sua região"),
        () => carregar(FALLBACK_COORDS.lat, FALLBACK_COORDS.lon, "Feira de Santana"),
        { timeout: 5000 },
      )
    } else {
      carregar(FALLBACK_COORDS.lat, FALLBACK_COORDS.lon, "Feira de Santana")
    }

    return () => {
      cancelado = true
    }
  }, [])

  const aqi = classificarAqi(dados.qualidadeAr)
  const Icone = IconeTempo(weatherCode)

  const itens = [
    {
      icon: Icone,
      rotulo: dados.temperatura !== null ? `${dados.temperatura}°C agora` : "--°C",
      detalhe: local,
    },
    {
      icon: Wind,
      rotulo: (
        <>
          Ar <span className={aqi.classe}>{aqi.texto}</span>
        </>
      ),
      detalhe: dados.qualidadeAr !== null ? `AQI ${dados.qualidadeAr}` : "carregando…",
    },
    {
      icon: Thermometer,
      rotulo: dados.co2 !== null ? `${dados.co2.toFixed(1)} ppm CO₂` : "--- ppm CO₂",
      detalhe: "atmosfera (Mauna Loa)",
    },
  ]

  return (
    <div className="inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-full bg-black/10 dark:bg-white/10 backdrop-blur-sm px-5 py-2.5 text-sm text-gray-800 dark:text-gray-100">
      {itens.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-1.5" title={item.detalhe}>
          <item.icon className="h-4 w-4 opacity-80" aria-hidden />
          <span className="font-medium">{item.rotulo}</span>
          {i === 0 && (
            <span className="hidden sm:inline-flex items-center gap-1 text-xs opacity-70">
              <MapPin className="h-3 w-3" aria-hidden />
              {local}
            </span>
          )}
        </span>
      ))}
      <span className="text-xs opacity-60 w-full sm:w-auto">dados ao vivo 🛰️</span>
    </div>
  )
}
