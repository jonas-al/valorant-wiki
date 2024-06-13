"use client"

import { useEffect, useState } from 'react'

// Components
import AgentCard from '@/app/components/AgentCard'
import AgentCardLoading from '@/app/components/AgentCardLoading'

// Hooks
import { useSocket } from './hooks/useSocket'

const Home = () => {
  const [agents, setAgents] = useState(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const socket = useSocket({
      type: 'agentes',
      uuid: null
    })

    socket.onmessage = (event) => {
      console.log('Mensagem recebida!!')
      const response = JSON.parse(event.data).data
      setAgents(response)
      setLoading(false)
      socket.close()
      console.log('Conexão encerrada!!')
    }
  }, [])

  if (loading) return (
    <div className='flex flex-wrap items-center justify-center'>
    {[...Array(10)].map(() => (
      <AgentCardLoading />
    ))}
    </div>
  )

  return (
    <>
      {agents &&
        <div className='flex flex-wrap items-center justify-center'>
          {agents.map((agent) => (
            <AgentCard agent={agent} />
          ))}
        </div>
      }
    </>

  )
}

export default Home