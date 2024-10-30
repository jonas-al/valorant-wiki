"use client"

import { useState, useRef, useEffect } from 'react'
import { TextInput } from 'flowbite-react'
import { format } from "date-fns";

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
  const [loading, setLoading] = useState(false)
  const chatEndRef = useRef(null);

  const { ws, isOpen, send } = useSocket()

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        setLoading(false)
        console.log('Mensagem recebida!!')
        const response = JSON.parse(event.data)
        setListMsg([...listMsg, {
          text: response,
          owner: "bot",
          created_at: new Date()
        }])
      }
    }
  }, [ws])

  const toggleActiveDropDown = () => {
    setActiveDropDown(!activeDropDown)
  }

  const sendMsg = () => {
    if (isOpen && input === "") return

    send({
      type: "chat",
      msg: input
    })

    setLoading(true)
    setListMsg([...listMsg, {
      text: input,
      owner: "user",
      created_at: new Date()
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
        <div className={`flex flex-col bg-gray-800 h-96 p-4 gap-4 overflow-y-scroll ${activeDropDown ? "" : "hidden"}`}>
          {!listMsg.length && <p className='bg-white p-4 rounded text-sm font-normal py-2.5 text-gray-900 dark:text-white'>Envie uma mensagem para iniciar a conversa.</p>}
          {listMsg.map((msg, index) => {
            return (
              <ChatBubble hour={format(msg.created_at, "H:m")} msg={msg.text} status={"Entregue"} isResponse={msg.owner === "bot"} key={index} />
            )
          })}
          {loading && <ChatBubble hour={`${new Date().getHours()}:${new Date().getMinutes()}`} msg={"Carregando"} status={"Entregue"} isLoading />}
          <div ref={chatEndRef} />
        </div>
        <div className={`flex gap-8 p-2 justify-between bg-gray-900 shadow-lg border-t-2 border-slate-500 ${activeDropDown ? "" : "hidden"}`}>
          <TextInput value={input} onChange={(e) => setInput(e.target.value)} className='w-full' placeholder='Fale com o Max-bot' onKeyDown={handleKeyDown} />
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