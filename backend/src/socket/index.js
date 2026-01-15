import { Server } from "socket.io";

export function initSocket(server) {
  const io = new Server(server, {
    // socket io manager hooking it self to http server
    cors: {
      origin: "*", // frontend later
    },
  });

  io.on("connection", (socket) => {
    {
      /* when socket io emits connection call this call back, on listens to socket io*/
    }
    console.log(" Socket connected:", socket.id);

    socket.on("join-room", (roomId) => {
      //
      socket.join(roomId);
      console.log(`${socket.id} joined room ${roomId}`);
      socket.to(roomId).emit("user-joined", socket.id);
    });

    socket.on("disconnect", () => {
      console.log(" Socket disconnected:", socket.id);
      {
        /* “When Socket.IO emits a disconnect event for this socket, run this.” */
      }
    });
  });
}

{
  /* when http server receives the http request with upgrade it emits an upgrade event
    which is intercepted by socket io object manager that we attached , it then creates
    a socket object in server end and assigns a socket id and emits connection, then we have listener on this
    object ("on") which captures it and calls the callback which then registers the listeners on the socket object
    emit - means fire events 
    on - means listen to it 

    */
}
