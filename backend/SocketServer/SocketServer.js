const { Server } = require('socket.io')
const http = require('http')
const express = require("express")
// const { disconnect } = require('process')

const app = express()

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"]
    }
})

const getSocketResiver=(resiversID) =>{
    return usersockeMap[resiversID];
}
const usersockeMap = {}
io.on('connection', (socket) => {
    console.log('a user id connected ', socket.id);
    const userID = socket.handshake.query.userID
    if (usersockeMap != "undefined") usersockeMap[userID] = socket.id

    io.emit('getonline',Object.keys(usersockeMap))

    socket.on("disconnect", () => {
        console.log('a user disconnectd', socket.id);
        delete usersockeMap[userID]
    io.emit('getonline',Object.keys(usersockeMap))


    })
})



module.exports = { server, app, io,getSocketResiver }