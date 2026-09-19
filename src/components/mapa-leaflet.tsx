"use client"

// Núcleo Leaflet do mapa — importado apenas no cliente via dynamic() (Leaflet usa `window`).
import { useEffect } from "react"
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet"
import { ecoLocais, categoryInfo, type CityCenter, type LocalCategory } from "@/data/locais"
import "leaflet/dist/leaflet.css"

interface MapaLeafletProps {
  center: CityCenter
  userPos: { lat: number; lng: number } | null
  activeFilters: Set<LocalCategory>
}

// Recentraliza o mapa suavemente quando o usuário muda de cidade ou se localiza
function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 0.8 })
  }, [center, zoom, map])
  return null
}

export default function MapaLeaflet({ center, userPos, activeFilters }: MapaLeafletProps) {
  const locaisCidade = ecoLocais.filter((l) => l.city === center.name)
  const locaisVisiveis = locaisCidade.filter((l) => activeFilters.has(l.category))

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={center.zoom}
      scrollWheelZoom
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ChangeView center={[center.lat, center.lng]} zoom={center.zoom} />

      {locaisVisiveis.map((local) => {
        const info = categoryInfo[local.category]
        return (
          <CircleMarker
            key={local.id}
            center={[local.lat, local.lng]}
            radius={9}
            pathOptions={{
              color: info.color,
              fillColor: info.color,
              fillOpacity: 0.85,
              weight: 2,
            }}
          >
            <Popup>
              <div className="min-w-44 space-y-1">
                <p className="font-semibold text-sm">
                  {info.icon} {local.name}
                </p>
                <p className="text-xs opacity-70">{info.label}</p>
                <p className="text-xs">{local.description}</p>
                <p className="text-xs opacity-80">📍 {local.address}</p>
                {local.hours && <p className="text-xs opacity-80">🕐 {local.hours}</p>}
                {local.date && <p className="text-xs opacity-80">📅 {local.date}</p>}
              </div>
            </Popup>
          </CircleMarker>
        )
      })}

      {userPos && (
        <CircleMarker
          center={[userPos.lat, userPos.lng]}
          radius={7}
          pathOptions={{ color: "#7c3aed", fillColor: "#7c3aed", fillOpacity: 0.9, weight: 2 }}
        >
          <Popup>
            <p className="text-sm font-medium">📌 Você está aqui</p>
          </Popup>
        </CircleMarker>
      )}
    </MapContainer>
  )
}
