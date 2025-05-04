'use client'

import { useState, useEffect } from 'react'
import { formatDistanceToNow, Locale } from 'date-fns'
import { ca } from 'date-fns/locale/ca'
import { es } from 'date-fns/locale/es'
import { enGB } from 'date-fns/locale/en-GB'
import { fr } from 'date-fns/locale/fr'

// Definimos un tipo personalizado para nuestros idiomas soportados
type SupportedLocale = 'ca' | 'es' | 'en' | 'fr' | 'oc'

// Definimos el tipo para nuestros locales
type LocaleRecord = Record<SupportedLocale, Locale>

// Utilizamos fr para oc (occitano/aranés) ya que date-fns no tiene soporte para occitano
const locales: LocaleRecord = {
  ca,
  es,
  en: enGB,
  fr,
  oc: fr
}

type Vehicle = {
  id: string
  plate: string
  entryTime: string
  isActive: boolean
  exitTime?: string | null
  updatedAt: string
  createdAt: string
}

type DashboardViewProps = {
  dict: {
    plate_header: string
    time_header: string
    status_header: string
    active_status: string
    expired_status: string
    loading_text: string
    error_loading: string
  }
  lang: SupportedLocale
}

export default function DashboardView({ dict, lang }: DashboardViewProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('/api/vehicles')
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Error fetching vehicles')
        }
        const data = await response.json()
        setVehicles(data)
      } catch (err) {
        setError(dict.error_loading)
        console.error('Error fetching vehicles:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchVehicles()
    const interval = setInterval(fetchVehicles, 60000) // Actualizar cada minuto
    return () => clearInterval(interval)
  }, [dict.error_loading, lang]) // Añadimos lang como dependencia

  if (loading) return <div className="text-center">{dict.loading_text}</div>
  if (error) return <div className="text-red-600 text-center">{error}</div>

  const MAX_TIME = 72 * 60 * 60 * 1000 // 72 horas en milisegundos

  return (
    <div className="w-full">
      {/* Vista de tabla para desktop */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {dict.plate_header}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {dict.time_header}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {dict.status_header}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {vehicles.map((vehicle) => {
              const timeElapsed = formatDistanceToNow(new Date(vehicle.entryTime), {
                addSuffix: true,
                locale: locales[lang]
              })
              const isExpired = new Date(vehicle.entryTime).getTime() + MAX_TIME < Date.now()

              return (
                <tr 
                  key={vehicle.id} 
                  className={isExpired ? 'bg-red-50' : 'hover:bg-gray-50'}
                >
                      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{vehicle.plate}</td>
                      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{timeElapsed}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span 
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        isExpired ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {isExpired ? dict.expired_status : dict.active_status}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Vista de tarjetas para móvil */}
      <div className="grid grid-cols-1 gap-4 sm:hidden">
        {vehicles.map((vehicle) => {
          const timeElapsed = formatDistanceToNow(new Date(vehicle.entryTime), {
            addSuffix: true,
            locale: locales[lang]
          })
          const isExpired = new Date(vehicle.entryTime).getTime() + MAX_TIME < Date.now()

          return (
            <div
              key={vehicle.id}
              className={`bg-white p-4 rounded-lg shadow-md ${
                isExpired ? 'border-l-4 border-red-500' : 'border-l-4 border-green-500'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="text-lg font-semibold text-gray-500">{vehicle.plate}</div>
                <span 
                  className={`px-2 text-xs font-semibold rounded-full ${
                    isExpired ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}
                >
                  {isExpired ? dict.expired_status : dict.active_status}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">{dict.time_header}:</span> {timeElapsed}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}