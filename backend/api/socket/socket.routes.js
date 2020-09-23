
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {

        socket.on('chat topic', topic => {
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
            }
            socket.join(topic)
            socket.myTopic = topic;
        })
        socket.on('chat newMsg', msg => {
            // console.log(msg)
            // io.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            io.to(socket.myTopic).emit('chat addMsg', msg)
        })
        socket.on('user typing', data => {
            io.to(socket.myTopic).emit('isTyping', data)
            // socket.broadcast.emit('typing', data);
        });
        socket.on('stopTyping', data => {
            io.to(socket.myTopic).emit('notTyping', data)
            // socket.broadcast.emit('typing', data);
        });
        socket.on('tripToUpdate', trip => {
            io.to(socket.myTopic).emit('tripUpdated', trip)
            // socket.broadcast.emit('typing', data);
        });
    })
}