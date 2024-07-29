import  express  from "express";
import { Server as SocketServer } from "socket.io";
import http from 'http'

const app = express();
const server = http.createServer(app) //1ro tenemos que iniciar un server htttp
const io = new SocketServer(server)//Luego inicializamos un server de Socket.io


io.on('connection', socket => {
    console.log('Client connected');
    socket.on('message',(body) => {//aqui nos comunicamos con el frontend
        console.log(body);
        socket.broadcast.emit('sendMessage', {
            body,
            from: socket.id.slice(6)
        })
    })
})

server.listen(3000)
console.log("Using port ",3000);