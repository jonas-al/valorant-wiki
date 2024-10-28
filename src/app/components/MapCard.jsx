import { useState } from 'react'
import Image from 'next/image'

// Icons
import { Icon } from '@iconify/react'

// Hooks
import { useRouter } from 'next/navigation'

const MapCard = ({ map }) => {
  const router = useRouter()

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => router.push(`/maps/${map.uuid}`)}
      className='flex flex-col w-[700px] h-[432px] rounded group bg-transparent hover:bg-gradient-to-b from-transparent from-85% to-black bg-opacity-100 shadow mx-4 cursor-pointer'
    >
      <div className='flex justify-between items-center bg-[#ff4655] uppercase text-lg font-bold px-6 py-2 rounded-t'>
        <h2>{map.displayName}</h2>
      </div>
      <div className='w-full h-full flex relative justify-center items-center'>
        {isHovered && <Icon icon="heroicons:eye-16-solid" fontSize={60} className='absolute' />}
        <div
          style={{ backgroundImage: `url(${isHovered ? map.premierBackgroundImage : map.splash})` }}
          className={`w-full h-full relative bg-cover bg-center ${isHovered && 'transition ease-out delay-[350] blur-sm'} -z-50  `}
        />
      </div>
    </div>
  )
}

export default MapCard