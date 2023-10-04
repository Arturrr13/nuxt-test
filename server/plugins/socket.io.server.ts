import { Server } from 'socket.io'
import { SocketEvent } from '../utils/SocketEvent'

export default defineNitroPlugin(() => {
    const socketServer = new Server(
        useRuntimeConfig().public.socketPort, {
        serveClient: false,
        cors: {
            origin: '*'
        }
    })

    socketServer.on('connection', (socket) => {
        console.log(socket.id)
        socket.emit(SocketEvent.new_count, {
            id: socket.id
        })

        socket.on(SocketEvent.up, (data: { value: string, type: string }) => { 
            if(data.type === 'message'){
                socketServer.emit(SocketEvent.new_count, 
                    {
                        message: data.value,
                        id: socket.id,
                    }
                )   
            } else {
                socketServer.emit(SocketEvent.new_count, 
                    {
                        image: data.value,
                        id: socket.id,
                    }
                )   
            }
        })

        socket.on(SocketEvent.down, (data: { value: number, color: string }) => {
            socketServer.emit(SocketEvent.new_value,
                {
                    value: data.value,
                    color: data.color
                }
            )
        })
    })
})