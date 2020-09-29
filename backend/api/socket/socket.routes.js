
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {

        socket.on('enter trip', topic => {
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
            }
            socket.join(topic)
            socket.myTopic = topic;
        })
        socket.on('chat newMsg', msg => {
          
            io.to(socket.myTopic).emit('chat addMsg', msg)
        })
        socket.on('user typing', data => {
            socket.broadcast.to(socket.myTopic).emit('isTyping', data)
        });
        socket.on('stopTyping', data => {
            io.to(socket.myTopic).emit('notTyping', data)
        });
        socket.on('tripToUpdate', trip => {
            socket.broadcast.to(socket.myTopic).emit('tripUpdated', trip)
        });

  
    })
}