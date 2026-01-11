import app from "./app.js";

const PORT = 4000; // creates server starts it and listens , whenever it gets a request it calls the app() function which is a function object that will start to runs its own middleware stack

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// internally this looks something liks  http.createServer(app(req,res))

//app(req,res) is a handler function  will walk its application middleware stack one by one , each of those middle ware stack calls next()
