"use client"

import { useEffect, useState } from 'react'

// Components
import AgentCard from './components/AgentCard'

const Home = () => {
  const [agents, setAgents] = useState()

  useEffect(() => {
    const socket = new WebSocket('ws://127.0.0.1:8080')

    socket.onopen = () => {
      console.log('Conexão estabelecida!!')

      const request = {
        type: 'agentes',
        uuid: null
      }

      socket.send(JSON.stringify(request))
    }

    socket.onmessage = (event) => {
      console.log('Mensagem recebida!!')

      const response = JSON.parse(event.data)
      setAgents(response.data)
    }
  }, [])

  return (
    <>
      {agents ?
        <div className='flex gap-y-16 gap-x-4 flex-wrap items-center justify-center'>
          {agents.map((agent) => (
            <AgentCard agent={agent} />
          ))}
        </div>
        :
        <p>Carregando...</p>}
    </>

  )
}

export default Home