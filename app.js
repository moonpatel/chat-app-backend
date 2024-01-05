const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http");
require("dotenv").config();

const app = express();

const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.on("message", (msg) => {
    console.log("message: " + msg);
    socket.emit("message", "Message received");
  });
});

app.get("/health-check", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
