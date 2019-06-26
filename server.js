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
// mongoose
//   .connect("mongodb://localhost:27017/sharedDocuments", { useNewUrlParser: true, useCreateIndex: true })
//   .then(() => console.log("Connected to MongoDB..."))
//   .catch(err => console.log(err));

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
  io.emit("list-documents", Object.keys(documents));
  connections.push(socket);
  console.log("websocket connected ", socket.id);

  const changeRooms = currentId => {
    socket.leave(previousId);
    socket.join(currentId, () => console.log(`Socket ${socket.id} joined room ${currentId}`));
    previousId = currentId;
  };

  //get-document it works only on the name, not on work object documents
  socket.on("get-document", documentName => {
    changeRooms(documentName);
    socket.emit("switch-document", documents[documentName]);
    console.log("switch-document", documents[documentName]);
  });

  socket.on("add-document", newDocument => {
    documents[newDocument.nameDocument] = newDocument;
    changeRooms(newDocument.nameDocument);
    io.emit("list-documents", Object.keys(documents));

    socket.emit("switch-document", newDocument);
    console.log("switch-document", newDocument);
  });

  socket.on("update-document", (docName, content) => {
    if (documents[docName]) {
      documents[docName].content = content;
    }
    socket.to(docName).emit("document-content", content);
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
