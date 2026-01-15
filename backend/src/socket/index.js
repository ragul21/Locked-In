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

    socket.on("disconnect", () => {
      console.log(" Socket disconnected:", socket.id);
      {
        /* “When Socket.IO emits a disconnect event for this socket, run this.” */
      }
    });
  });
}
