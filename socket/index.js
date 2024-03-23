// const { Socket } = require('socket.io')

const io = require('socket.io')(2100,{
    cors:{
        origin: "http://localhost:5173",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        Credential: true,
    }
})
io.on ('connected',(socket)=>{
    console.log("a user is connected");
})