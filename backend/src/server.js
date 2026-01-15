import app from "./app.js";
import http from "http";
import { initSocket } from "./socket/index.js";

const PORT = 4000;
const server = http.createServer(app); //create a http server , if normal request comes in let app router handle
initSocket(server); // runs during server startup, pass our node js server to socket controller function which creates a socket controller class object and hooks into our actual server so it can listen to web socket request
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// internally this looks something liks  http.createServer(app(req,res))

//app(req,res) is a handler function  will walk its application middleware stack one by one , each of those middle ware stack calls next()

{
  /*{important}We create ONE HTTP server.
Express handles normal HTTP requests.
Socket.IO hooks into the same server to intercept WebSocket requests.
listen() starts everything. {important} */
}
