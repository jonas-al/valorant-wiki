import { useState, useEffect } from "react";

const useSocket = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ws, setWs] = useState(new WebSocket("ws://127.0.0.1:8080"));

  ws.onopen = () => {
    console.log("WebSocket conectado.");
    setIsOpen(true);
  };

  const send = (request) => {
    if (isOpen) {
      ws.send(JSON.stringify(request));
      console.log("Mensagem enviada.");
    } else {
      console.log("WebSocket não está conectado.");
    }
  };

  return {
    ws,
    isOpen,
    send,
  };
};

export default useSocket;
