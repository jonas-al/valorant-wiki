"use client"

import { useEffect, useState } from 'react'
import axios from 'axios';

// Components
import AgentCard from '@/app/components/AgentCard'
import AgentCardLoading from '@/app/components/AgentCardLoading'

const Home = () => {
  const [agents, setAgents] = useState(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get("http://localhost:5000/agentes", { type: "agentes" }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setAgents(response.data)
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