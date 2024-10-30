"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

// Components
import Carousel from "@/app/components/Carousel"

// Hooks
import useSocket from '@/app/hooks/useSocket'

const Maps = ({ params }) => {
  const [map, setMap] = useState(undefined)
  const [loading, setLoading] = useState(true)
  const [index, setSelectedIndex] = useState(0)

  const [imagesUrl, setImagesUrl] = useState([])

  const { ws, isOpen, send } = useSocket()

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        console.log('Mensagem recebida.')
        const response = JSON.parse(event.data).data
        setMap(response)
        setImagesUrl([response.splash, response.premierBackgroundImage, response.stylizedBackgroundImage, response.displayIcon])
        setLoading(false)
      }
    }
  }, [ws])

  useEffect(() => {
    if (isOpen) {
      send({
        type: "mapas",
        uuid: params.uuid
      })
    }
  }, [isOpen])


  if (loading) return (
    <div className='absolute top-1/2 animate-pulse'>
      <Image src='/loading.svg' width={100} height={100} alt='Loading' priority />
    </div>
  )

  return (
    <div className="flex flex-col w-full px-36 gap-8">
      <div>
        <h1 className='uppercase font-bold italic text-[50px]'>{map.displayName}</h1>
        <p>{map.coordinates}</p>
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        <div
          style={{ backgroundImage: `url(${imagesUrl[index]})` }}
          className={`w-full h-[75vh] rounded-md bg-contain bg-no-repeat bg-center`}
        />
        <Carousel slides={imagesUrl} options={{ align: 'start' }} setSelectedIndex={setSelectedIndex} />
      </div>
    </div>
  )
}

export default Maps