// Node server for handle socket io connection 

const io = require("socket.io")(8000,{cors: {
  origin:'*',}});
const users = {};

io.on('connection', socket =>{
  // message for new user join
    socket.on('new-user-joined', username => {
        
        users[socket.id]= username;
        socket.broadcast.emit('user-joined', username);
    });

    socket.on('send', message =>{
          socket.broadcast.emit('recieve', {message: message, username: users[socket.id]})

    });

    socket.on('disconnect', data =>{
      socket.broadcast.emit('left', users[socket.id]);
      delete users[socket.id];
});


});
