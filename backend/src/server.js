import app from "./app.js";
import http from "http";
import { initSocket } from "./socket/index.js";

const PORT = 4000;
const server = http.createServer(app); //create a http server , if normal request comes in let app router handle
initSocket(server); // hooks the socket io object manager to http server so it can intercept upgrade events (socket request to establish a persistent connection)
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`); // we are making the object to listen on this port
});

// internally this looks something liks  http.createServer(app(req,res))

//app(req,res) is a handler function  will walk its application middleware stack one by one , each of those middle ware stack calls next()

{
  /*{important}We create ONE HTTP server.
Express handles normal HTTP requests.
Socket.IO hooks into the same server to intercept WebSocket requests.
listen() starts everything. {important} */
}
