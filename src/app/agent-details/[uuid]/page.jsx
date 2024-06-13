"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'

// Hooks
import { useSocket } from '@/app/hooks/useSocket'


const agentDetails = ({ params }) => {
  const [agent, setAgent] = useState(undefined)
  const [selectedSkill, setSelectedSkill] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const socket = useSocket(
      {
        type: 'agentes',
        uuid: params.uuid
      }
    )

    socket.onmessage = (event) => {
      console.log('Mensagem recebida!!')
      const response = JSON.parse(event.data).data
      setAgent(response)
      setLoading(false)
      socket.close()
      console.log('Conexão encerrada!!')
    }

  }, [])

  if (loading) return (
    <div className='absolute top-1/2 animate-pulse'>
      <Image src='/loading.svg' width={100} height={100} alt='Loading' />
    </div>
  )

  return (
    <>
      {agent && <div className='flex'>
        <div className='w-1/2 py-4'>
          <div className='flex flex-col justify-between'>
            <div className='flex flex-col gap-y-8'>
              <div className='gap-y-2'>
                <h1 className='uppercase font-bold italic text-[118px]'>{agent.displayName}</h1>
                <p>{agent.description}</p>
              </div>
              <div className='flex flex-col items-center justify-center text-center gap-y-4 px-12 py-6 rounded-2xl bg-[#080e13] w-fit shadow'>
                <div style={{
                  WebkitMaskImage: `url(${agent.role.displayIcon})`,
                  maskImage: `url(${agent.role.displayIcon})`,
                  width: '80px',
                  height: '80px',
                  maskSize: 'cover'
                }}>
                  <div className='w-full h-full bg-[#ff4655]' />
                </div>
                <div>
                  <h2 className='uppercase font-bold text-2xl block'>função</h2>
                  <p className='capitalize text-xl text-[#ff4655] block'>{agent.role.displayName}</p>
                </div>
              </div>
            </div>
            <div className='flex flex-col uppercase font-bold text-3xl items-center gap-y-4 h-full'>
              <h2>habilidades</h2>
              <div className='flex gap-x-6'>
                <button style={{
                  WebkitMaskImage: `url(${agent.abilities[0].displayIcon})`,
                  maskImage: `url(${agent.abilities[0].displayIcon})`,
                  width: '80px',
                  height: '80px',
                  maskSize: 'cover'
                }}
                  onClick={() => setSelectedSkill(0)}
                >
                  <div className={`w-full h-full ${selectedSkill === 0 ? 'bg-white' : 'bg-[#808080]'} `} />
                </button>
                <button style={{
                  WebkitMaskImage: `url(${agent.abilities[1].displayIcon})`,
                  maskImage: `url(${agent.abilities[1].displayIcon})`,
                  width: '80px',
                  height: '80px',
                  maskSize: 'cover'
                }}
                  onClick={() => setSelectedSkill(1)}
                >
                  <div className={`w-full h-full ${selectedSkill === 1 ? 'bg-white' : 'bg-[#808080]'} `} />
                </button>
                <button style={{
                  WebkitMaskImage: `url(${agent.abilities[2].displayIcon})`,
                  maskImage: `url(${agent.abilities[2].displayIcon})`,
                  width: '80px',
                  height: '80px',
                  maskSize: 'cover'
                }}
                  onClick={() => setSelectedSkill(2)}
                >
                  <div className={`w-full h-full ${selectedSkill === 2 ? 'bg-white' : 'bg-[#808080]'} `} />
                </button>
                <button style={{
                  WebkitMaskImage: `url(${agent.abilities[3].displayIcon})`,
                  maskImage: `url(${agent.abilities[3].displayIcon})`,
                  width: '80px',
                  height: '80px',
                  maskSize: 'cover'
                }}
                  onClick={() => setSelectedSkill(3)}
                >
                  <div className={`w-full h-full ${selectedSkill === 3 ? 'bg-white' : 'bg-[#808080]'} `} />
                </button>
              </div>
              <div className='flex flex-col items-center w-1/2 text-center'>
                <h2 className='uppercase font-semibold text-3xl'>{agent.abilities[selectedSkill].displayName}</h2>
                <p className='uppercase font-medium text-xs'>{agent.abilities[selectedSkill].description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className='w-1/2 overflow-hidden'>
          <img src={`${agent.fullPortrait}`} className='scale-[1.5] translate-y-32' />
        </div>
      </div>
      }
    </>
  )
}

export default agentDetails