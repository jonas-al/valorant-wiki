"use client"

import { useState, useRef, useEffect } from 'react'
import { TextInput } from 'flowbite-react'

// Components
import ChatBubble from '@/app/components/ChatBubble'

// Hooks
import useSocket from '@/app/hooks/useSocket'

// Icons
import { Icon } from '@iconify/react'

const Chat = () => {
  const [activeDropDown, setActiveDropDown] = useState(false)
  const [input, setInput] = useState("")
  const [listMsg, setListMsg] = useState([])
  const chatEndRef = useRef(null);

  const { ws, isOpen, send } = useSocket()

  ws.onmessage = (event) => {
    console.log('Mensagem recebida!!')
    const response = JSON.parse(event.data).data
    setListMsg([...listMsg, {
      text: response,
      owner: "bot"
    }])
  }

  const toggleActiveDropDown = () => {
    setActiveDropDown(!activeDropDown)
  }

  const sendMsg = () => {
    if (input === "") return

    ws.send({
      type: "chat",
      msg: input
    })

    setListMsg([...listMsg, {
      text: input,
      owner: "user"
    }])
    setInput("")
  }

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return
    sendMsg()
  }

  useEffect(() => {
    chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [listMsg])

  return (
    <div className='fixed bottom-0 right-0 pr-4 shadow-lg'>
      <div className='w-96'>
        <div
          onClick={toggleActiveDropDown}
          className='flex h-12 items-center justify-between px-4 bg-gradient-to-r from-[#FF3743] via-[#FF5C56] to-[#FF7260] rounded-t cursor-pointer'
        >
          <p className='font-semibold'>Max-bot</p>
          <Icon icon="fluent:chevron-up-16-filled" fontSize={24} />
        </div>
        <div className={`flex flex-col bg-gray-800 h-96 p-4 gap-4 overflow-y-scroll scroll-auto ${activeDropDown ? "" : "hidden"}`}>
          {listMsg.map((msg) => {
            return (
              <>
                <ChatBubble hour={`${new Date().getHours()}:${new Date().getMinutes()}`} msg={msg.text} status={"Entregue"} />
                <ChatBubble hour={`${new Date().getHours()}:${new Date().getMinutes()}`} msg={msg.text} status={"Entregue"} response />
              </>
            )
          })}
          <div ref={chatEndRef} />
        </div>
        <div className={`flex gap-8 p-2 justify-between bg-gray-900 shadow-lg border-t-2 border-slate-500 ${activeDropDown ? "" : "hidden"}`}>
          <TextInput value={input} onChange={(e) => setInput(e.target.value)} className='w-full' placeholder='Fale com o max-bot' onKeyDown={handleKeyDown} />
          <button
            onClick={sendMsg}
            className='w-fit text-sm font-semibold px-2 rounded bg-gradient-to-r from-[#FF3743] via-[#FF5C56] to-[#FF7260] hover:bg-gradient-to-l hover:outline hover:outline-2'
          >
            <p>Enviar</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat