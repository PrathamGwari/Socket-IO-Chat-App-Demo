const io = require('socket.io')(8000, {
    cors: {
        origin: ["http://localhost:3000"]
    }
})

io.on('connection', (socket)=>{
    console.log(socket.id)
    socket.emit('getMySocketId', socket.id)

    socket.on('sendMessage', (data)=>{
        console.log(`sending ${data.message} to ${data.toId}`)
        socket.to(data.toId).emit('getMessage', data.message)
    })

})