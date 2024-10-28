"use client"

import { useEffect, useState } from 'react'

// Components
import AgentCard from '@/app/components/AgentCard'
import AgentCardLoading from '@/app/components/AgentCardLoading'

// Hooks
import useSocket from '@/app/hooks/useSocket'

const Home = () => {
  const [agents, setAgents] = useState(undefined)
  const [loading, setLoading] = useState(true)
  const { ws, isOpen, send } = useSocket()

  useEffect(() => {
    if (isOpen) {
      send({
        type: "agentes",
        uuid: null
      })
    }
  }, [isOpen])

  ws.onmessage = (event) => {
    console.log('Mensagem recebida.')
    const response = JSON.parse(event.data).data
    setAgents(response)
    setLoading(false)
  }

  if (loading) return (
    <div className='flex flex-wrap items-center justify-center gap-8'>
      {[...Array(10)].map((i, j) => (
        <AgentCardLoading key={j} />
      ))}
    </div>
  )

  return (
    <>
      {agents &&
        <div className='flex flex-wrap items-center justify-center gap-8'>
          {agents.map((agent) => (
            <AgentCard agent={agent} key={agent.uuid} />
          ))}
        </div>
      }
    </>

  )
}

export default Home