"use client"

import { useState, useRef, useEffect } from 'react'
import { TextInput } from 'flowbite-react'
import { format } from "date-fns";
import axios from 'axios';

// Components
import ChatBubble from '@/app/components/ChatBubble'

// Icons
import { Icon } from '@iconify/react'

const Chat = () => {
  const [activeDropDown, setActiveDropDown] = useState(false)
  const [input, setInput] = useState("")
  const [listMsg, setListMsg] = useState([])
  const [loading, setLoading] = useState(false)
  const chatEndRef = useRef(null);

  const toggleActiveDropDown = () => {
    setActiveDropDown(!activeDropDown)
  }

  const sendMsg = () => {
    if (input === "") return

    setListMsg((prevList) => [
      ...prevList,
      { text: input, owner: "user", created_at: new Date() }
    ])

    setLoading(true)
    setInput("")

    axios.post("http://localhost:5000/chat", { msg: input }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setListMsg((prevList) => [
          ...prevList,
          { text: response.data, owner: "bot", created_at: new Date() }
        ])
        setLoading(false)
      })
      .catch(error => {
        if (error.response) {
          console.error('Erro:', error.response.data);
        } else {
          console.error('Erro na requisição:', error.message);
        }
      });
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
              <ChatBubble hour={format(msg.created_at, "HH:mm")} msg={msg.text} status={"Entregue"} isResponse={msg.owner === "bot"} key={index} />
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