import { useState, useEffect } from "react";

const useSocket = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    try {
      const socket = new WebSocket("ws://127.0.0.1:8080");

      socket.onopen = () => {
        console.log("WebSocket conectado.");
        setWs(socket);
        setIsOpen(true);
      };
    } catch (error) {
      console.error("Erro ao tentar se conectar ao WebSocket:", error);
    }
  }, []);

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
