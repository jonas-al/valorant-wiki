import { useState } from 'react'
import Image from 'next/image'

// Hooks
import { useRouter } from 'next/navigation'

const AgentCard = ({ agent }) => {
  const router = useRouter()

  const [isHovered, setIsHovered] = useState(false);

  const hover = {
    background: `linear-gradient(to bottom, #${agent.backgroundGradientColors[0]}, #${agent.backgroundGradientColors[1]}, #${agent.backgroundGradientColors[2]})`
  }

  const normal = {
    background: 'white'
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => router.push(`/agent-details/${agent.uuid}`)}
      className='w-[318px] h-[432px] rounded group bg-transparent hover:bg-gradient-to-b from-transparent from-85% to-black bg-opacity-100 shadow mx-4 cursor-pointer'
    >
      <div className='absolute' style={{
        WebkitMaskImage: `url(${agent.background})`,
        maskImage: `url(${agent.background})`,
        width: '318px',
        height: '432px',
        maskSize: 'cover'
      }}>
        <div
          style={isHovered ? { ...normal, ...hover } : normal}
          className='w-full h-full'
        />
      </div>

      <div style={{ backgroundImage: `url(${agent.fullPortrait})` }} className={`relative bg-cover bg-center w-full h-full ${isHovered && 'transition ease-out delay-[350] scale-x-[-1]'} `} />
      <div className='flex justify-between items-center bg-[#ff4655] uppercase text-lg font-bold px-6 py-2 rounded-b'>
        <h2>{agent.displayName}</h2>
        <Image src={`${agent.role.displayIcon}`} width={19} height={19} className='h-[19px] hidden group-hover:block' alt='Icone da role do agente' priority />
      </div>
    </div>
  )
}

export default AgentCard