"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import axios from "axios"

// Components
import Carousel from "@/app/components/Carousel"

const Maps = ({ params }) => {
  const [map, setMap] = useState(undefined)
  const [loading, setLoading] = useState(true)
  const [index, setSelectedIndex] = useState(0)

  const [imagesUrl, setImagesUrl] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:5000/mapas?uuid=${params.uuid}`, { type: "agentes" }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setMap(response.data)
        console.log(response.splash)
        setImagesUrl([response.data.splash, response.data.premierBackgroundImage, response.data.stylizedBackgroundImage, response.data.displayIcon])
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