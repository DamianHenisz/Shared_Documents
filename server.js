const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const fs = require("fs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const app = express();
const server = http.createServer(app);

const io = socketIo(server);
const connections = [];

let datadocument = ""; //Global variable for all users

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/sharedDocuments", { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.log(err));

app.get("/", function(req, res, next) {
  res.sendFile(__dirname + "/client/public/index.html");
});

//Use Passport middleware
app.use(passport.initialize());

//Passport Config
//Ask
require("./config/passport")(passport);

//Use Routes
app.use("/api/users", users);

//Use socketIO
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

// fs.writeFile("test.txt", "bla", err => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   //file written successfully
// });

server.listen(8080, function() {
  console.log("Listening on: 8080 port");
});
