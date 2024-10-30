"use client"
import { useEffect, useState } from 'react'
import AxiosInstance from '@/utils/axiosInstance'

//Components
import MapCard from '@/app/components/MapCard'
import MapCardLoading from '@/app/components/MapCardLoading'


const Maps = () => {
  const [maps, setMaps] = useState(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    AxiosInstance.get("/mapas", { type: "agentes" }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setMaps(response.data)
        setLoading(false)
        console.log('Resposta:', response.data);
      })
      .catch(error => {
        if (error.response) {
          console.error('Erro:', error.response.data);
        } else {
          console.error('Erro na requisição:', error.message);
        }
      });
  }, [])

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