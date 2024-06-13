export const useSocket = (request) => {
  const socket = new WebSocket('ws://127.0.0.1:8080')

  socket.onopen = () => {
    console.log('Conexão estabelecida!!')
    socket.send(JSON.stringify(request))
  }

  return socket
}