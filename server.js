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
const documents = {};
let previousId;

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/sharedDocuments", { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.log(err));

app.get("/", (req, res, next) => {
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
io.on("connection", socket => {
  io.emit("documents", Object.keys(documents));
  connections.push(socket);
  console.log("websocket connected ", socket.id);

  const safeJoin = currentId => {
    socket.leave(previousId);
    socket.join(currentId, () => console.log(`Socket ${socket.id} joined room ${currentId}`));
    previousId = currentId;
  };

  socket.on("get-document", documentName => {
    console.log("emit-get-doc", documentName);
    safeJoin(documentName);
    socket.emit("get-document", documents[documentName]);
  });

  socket.on("update-document", document => {
    //datadocument = document;
    io.sockets.emit("get-document1", document);
  });

  socket.on("disconnect", () => {
    connections.splice(connections.indexOf(socket), 1);
    console.log("websocket disconnected ", socket.id);
  });
});

// fs.writeFile("test.txt", "bla", err => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   //file written successfully
// });

server.listen(8080, () => {
  console.log("Listening on: 8080 port");
});
