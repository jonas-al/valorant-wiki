"use client"
import { useEffect, useState } from 'react'

//Components
import MapCard from '@/app/components/MapCard'
import MapCardLoading from '@/app/components/MapCardLoading'

// Hooks
import useSocket from '@/app/hooks/useSocket'


const Maps = () => {
  const [maps, setMaps] = useState(undefined)
  const [loading, setLoading] = useState(true)

  const { ws, isOpen, send } = useSocket()

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        console.log('Mensagem recebida!!')
        const response = JSON.parse(event.data).data
        setMaps(response)
        setLoading(false)
      }
    }
  }, [ws])

  useEffect(() => {
    if (isOpen) {
      send({
        type: "mapas",
        uuid: null
      })
    }
  }, [isOpen])

  if (loading) return (
    <div className='flex flex-wrap items-center justify-center gap-16'>
      {[...Array(10)].map((i, j) => (
        <MapCardLoading key={j} />
      ))}
    </div>
  )

  return (
    <div className='flex flex-wrap items-center justify-center gap-16'>
      {maps && maps.map((map) => map.displayIcon && map.premierBackgroundImage && <MapCard map={map} key={map.uuid} />)}
    </div>
  )
}

export default Maps