"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Header = () => {
  const router = useRouter()

  return (
    <div className='flex justify-between items-center px-12 py-4 bg-[#060b0f]'>
      <div
        onClick={() => router.push(`/`)}
        className='flex items-center gap-x-3 cursor-pointer'
      >
        <Image
          className='relative'
          src='/icon-valorant.svg'
          alt='Valorant Logo'
          width={50}
          height={50}
          priority
        />
        <h1 className='text-lg uppercase font-medium'>Valorant Wikir</h1>
      </div>
      <nav className='flex'>
        <Link href='/' className='flex flex-col group gap-1'>
          <p className='uppercase font-semibold px-3 py-1 rounded hover:bg-[#0f1923]'>agentes</p>
          <div className='group-hover:bg-[#ff4655] w-full h-[2px] rounded-sm' />
        </Link>
        <Link href='/mapas' className='flex flex-col group gap-1'>
          <p className='uppercase font-semibold px-3 py-1 rounded hover:bg-[#0f1923]'>mapas</p>
          <div className='group-hover:bg-[#ff4655] w-full h-[2px] rounded-sm' />
        </Link>
        <Link href='/armas' className='flex flex-col group gap-1'>
          <p className='uppercase font-semibold px-3 py-1 rounded hover:bg-[#0f1923]'>armas</p>
          <div className='group-hover:bg-[#ff4655] w-full h-[2px] rounded-sm' />
        </Link>
      </nav>
    </div>
  )
}

export default Header