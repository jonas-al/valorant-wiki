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
        <div className='flex flex-wrap items-center justify-center'>
          {agents.map((agent) => (
            <AgentCard agent={agent} />
          ))}
        </div>
        :
        <div className='flex gap-y-16 gap-x-4 flex-wrap items-center justify-center animate-pulse pt-5'>
          {[...Array(10)].map(() => (
            <div>
              <div className='w-[318px] h-[432px] rounded-t bg-slate-800 p-4'>
                <div className=' w-full h-full bg-slate-700 rounded'></div>
              </div>
              <div className='flex w-[318px] justify-between items-center bg-slate-700 uppercase text-lg font-bold px-6 py-5 rounded-b' />
            </div>
          ))}
        </div>
      }
    </>

  )
}

export default Home