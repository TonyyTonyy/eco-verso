"use client"

import { useMemo, useState } from "react"
import dynamic from "next/dynamic"
import { cities, ecoLocais, categoryInfo, type LocalCategory, type CityCenter } from "@/data/locais"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { LocateFixed, Navigation } from "lucide-react"

// Leaflet depende de `window` — carrega só no cliente
const MapaLeaflet = dynamic(() => import("@/components/mapa-leaflet"), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full rounded-lg" />,
})

const ALL_CATEGORIES = Object.keys(categoryInfo) as LocalCategory[]

// Distância aproximada em km (fórmula de Haversine)
function distanciaKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function MapaAcaoLocal() {
  const [city, setCity] = useState<CityCenter>(cities[0])
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null)
  const [locating, setLocating] = useState(false)
  const [activeFilters, setActiveFilters] = useState<Set<LocalCategory>>(new Set(ALL_CATEGORIES))

  const toggleFilter = (cat: LocalCategory) => {
    setActiveFilters((prev) => {
      const next = new Set(prev)
      if (next.has(cat)) {
        if (next.size > 1) next.delete(cat)
      } else {
        next.add(cat)
      }
      return next
    })
  }

  const handleLocate = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocalização não suportada neste navegador.")
      return
    }
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude }
        setUserPos(coords)
        // Vai para a cidade com pontos cadastrados mais próxima do usuário
        const nearest = cities.reduce((best, c) =>
          distanciaKm(coords.lat, coords.lng, c.lat, c.lng) <
          distanciaKm(coords.lat, coords.lng, best.lat, best.lng)
            ? c
            : best,
        )
        setCity(nearest)
        setLocating(false)
        toast.success(`Mostrando ${nearest.name} – ${nearest.uf}`, {
          description: "Cidade com pontos cadastrados mais próxima de você.",
        })
      },
      () => {
        setLocating(false)
        toast.error("Não foi possível obter a sua localização.", {
          description: "Verifique a permissão de localização do navegador ou escolha uma cidade.",
        })
      },
      { timeout: 10000 },
    )
  }

  const locaisDaCidade = useMemo(
    () =>
      ecoLocais
        .filter((l) => l.city === city.name && activeFilters.has(l.category))
        .map((l) => ({
          ...l,
          distancia: userPos ? distanciaKm(userPos.lat, userPos.lng, l.lat, l.lng) : null,
        }))
        .sort((a, b) => (a.distancia ?? Infinity) - (b.distancia ?? Infinity)),
    [city, activeFilters, userPos],
  )

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
      {/* Painel lateral */}
      <div className="space-y-4">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex flex-wrap gap-2">
              {cities.map((c) => (
                <Button
                  key={`${c.name}-${c.uf}`}
                  size="sm"
                  variant={city.name === c.name ? "default" : "outline"}
                  onClick={() => setCity(c)}
                >
                  {c.name}
                </Button>
              ))}
            </div>
            <Button
              variant="secondary"
              className="w-full"
              onClick={handleLocate}
              disabled={locating}
            >
              <LocateFixed className="h-4 w-4 mr-2" />
              {locating ? "Localizando..." : "Usar minha localização"}
            </Button>
            <div className="flex flex-wrap gap-2 pt-1">
              {ALL_CATEGORIES.map((cat) => {
                const info = categoryInfo[cat]
                const active = activeFilters.has(cat)
                return (
                  <button
                    key={cat}
                    onClick={() => toggleFilter(cat)}
                    className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                      active
                        ? "border-transparent text-white"
                        : "border-border text-muted-foreground opacity-60"
                    }`}
                    style={active ? { backgroundColor: info.color } : undefined}
                  >
                    <span aria-hidden>{info.icon}</span> {info.label}
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3 lg:max-h-[420px] lg:overflow-y-auto lg:pr-1">
          {locaisDaCidade.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-6">
              Nenhum ponto encontrado com os filtros selecionados.
            </p>
          )}
          {locaisDaCidade.map((local) => {
            const info = categoryInfo[local.category]
            return (
              <Card key={local.id}>
                <CardContent className="pt-4 pb-4 space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-sm">
                      {info.icon} {local.name}
                    </p>
                    <Badge
                      variant="secondary"
                      className="shrink-0 text-white border-0"
                      style={{ backgroundColor: info.color }}
                    >
                      {info.label}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{local.description}</p>
                  <p className="text-xs text-muted-foreground">📍 {local.address}</p>
                  {local.hours && (
                    <p className="text-xs text-muted-foreground">🕐 {local.hours}</p>
                  )}
                  {local.date && <p className="text-xs text-muted-foreground">📅 {local.date}</p>}
                  <div className="flex items-center justify-between pt-1">
                    {local.distancia !== null ? (
                      <span className="text-xs font-medium text-primary">
                        ~{local.distancia.toFixed(1)} km de você
                      </span>
                    ) : (
                      <span />
                    )}
                    <Button variant="ghost" size="sm" className="h-7 text-xs" asChild>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${local.lat},${local.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Navigation className="h-3.5 w-3.5 mr-1" /> Como chegar
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Mapa */}
      <div className="h-[420px] lg:h-auto lg:min-h-[560px] rounded-lg overflow-hidden border">
        <MapaLeaflet center={city} userPos={userPos} activeFilters={activeFilters} />
      </div>
    </div>
  )
}
