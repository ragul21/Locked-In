import { Server } from "socket.io";

const rooms = {};

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

    socket.on("join-room", ({ roomId, username }) => {
      //
      socket.join(roomId); // internally creates array for that room id and store the socket id

      if (!rooms[roomId]) {
        // application level memory of who joined and there data
        rooms[roomId] = [];
      }

      const isAdmin = rooms[roomId].length === 0; // person creating the room will the admin as he is the first person

      rooms[roomId].push({
        id: socket.id,
        name: username, // now pushing the values in application level memory
        role: isAdmin ? "admin" : "member",
      });

      console.log(`${socket.id} joined room ${roomId}`);

      io.to(roomId).emit("room-members", rooms[roomId]); // to all the socket id in this particular room send the member list
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);

      for (const roomId in rooms) {
        const before = rooms[roomId].length;

        rooms[roomId] = rooms[roomId].filter(
          (member) => member.id !== socket.id
        );

        if (rooms[roomId].length !== before) {
          io.to(roomId).emit("room-members", rooms[roomId]);
        }
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
