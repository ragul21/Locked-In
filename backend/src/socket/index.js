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

    socket.on("join-room", ({ roomId, username, endTime }) => {
      //
      socket.join(roomId); // internally creates array for that room id and store the socket id

      if (!rooms[roomId]) {
        // application level memory of who joined and there data
        rooms[roomId] = {
          members: [],
          messages: [],
          startTime: null,
          endTime: null,
          status: "ACTIVE",
        };
      }

      {
        /* rooms[roomId] = {
      members: [ { member }, { member } ],
      messages: [ { message }, { message } ]
} */
      }

      const isAdmin = rooms[roomId].members.length === 0; // person creating the room will the admin as he is the first person

      if (isAdmin && !rooms[roomId].startTime && endTime) {
        // after end time emit all members room ended
        rooms[roomId].startTime = Date.now();
        rooms[roomId].endTime = endTime;

        const delay = endTime - Date.now();

        setTimeout(() => {
          if (rooms[roomId]?.status === "ACTIVE") {
            rooms[roomId].status = "ENDED";
            io.to(roomId).emit("room-ended");
          }
        }, delay);
      }

      rooms[roomId].members.push({
        //push into memmbers
        id: socket.id,
        name: username,
        role: isAdmin ? "admin" : "member",
      });

      socket.emit("room-time", {
        endTime: rooms[roomId].endTime,
      });

      console.log(`${socket.id} joined room ${roomId}`);

      io.to(roomId).emit("room-members", rooms[roomId].members); // to all the socket id in this particular room send the member list
      socket.emit("chat-history", rooms[roomId].messages); //one time display of chat history for new member who joined the room
    });

    {
      /* when user client sends the text to server , i will send that text and who sent it to all the sockets (clients) in this room */
    }

    socket.on("chat-message", ({ roomId, username, text }) => {
      console.log("Message received:", text);

      const message = { text, from: username };

      rooms[roomId].messages.push(message);

      io.to(roomId).emit("chat-message", message);
    });

    {
      /* when user client sends the text to server , i will send that text and who sent it to all the sockets (clients) in this room */
    }

    //-----------when someone sends a webrtc offer send this offer to other people in the room-------------------//

    socket.on("webrtc-offer", ({ roomId, offer }) => {
      //socket.to(emit) - except me send to other
      //io.to(emit) - send to everyone including me
      socket.to(roomId).emit("webrtc-offer", {
        from: socket.id,
        offer,
      });
    });

    //----------------------replying to the answer , send this to client who sent the offer --------------------------------------------//

    socket.on("webrtc-answer", ({ to, answer }) => {
      // Send answer ONLY to the original offerer
      io.to(to).emit("webrtc-answer", {
        from: socket.id,
        answer,
      });
    });

    //--------------------- handling the ice candidates received from the clients and forwarding it to others except the sender---------------------------------------------//

    socket.on("webrtc-ice-candidate", ({ roomId, candidate }) => {
      socket.to(roomId).emit("webrtc-ice-candidate", {
        from: socket.id,
        candidate,
      });
    });

    {
      /*-------------------------- disconnect logic ------------------------------- */
    }
    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);

      for (const roomId in rooms) {
        const before = rooms[roomId].members.length;

        rooms[roomId].members = rooms[roomId].members.filter(
          (member) => member.id !== socket.id,
        );

        if (rooms[roomId].members.length !== before) {
          io.to(roomId).emit("room-members", rooms[roomId].members);
        }
      }
    });
    {
      /*-------------------------- disconnect logic ------------------------------- */
    }
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
