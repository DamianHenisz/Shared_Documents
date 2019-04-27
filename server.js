const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const fs = require("fs");

const app = express();
const server = http.createServer(app);

const io = socketIo(server);
const router = express.Router();
const connections = [];

let datadocument = ""; //Global variable for all users

app.get("/", function(req, res, next) {
  res.sendFile(__dirname + "/client/public/index.html");
});

io.on("connection", function(socket) {
  socket.emit("get-document", datadocument);
  connections.push(socket);
  console.log("websocket connected ", socket.id);

  socket.on("update-document", document => {
    datadocument = document;
    io.sockets.emit("get-document", datadocument);
  });

  socket.on("disconnect", function() {
    connections.splice(connections.indexOf(socket), 1);
    console.log("datadocument server", datadocument);
  });
});

fs.writeFile("test.txt", "bla", err => {
  if (err) {
    console.error(err);
    return;
  }
  //file written successfully
});

server.listen(8080, function() {
  console.log("Listening on :8080 port");
});
