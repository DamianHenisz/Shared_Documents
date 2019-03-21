const express = require('express');
const http = require('http');
const socketIo = require('socket.io'); 

const app = express();
const server = http.createServer(app);

const io = socketIo(server);
const router = express.Router();

router.get('/', function (req, res, next) {
    //res.sendFile(__dirname + '/client/public/index');
    const test = [
                {test: 'OK Connected backend'}
             ];
            res.json(test);
});

io.on('connection', function (socket) {
 console.log('websocket connected');
 
 socket.on('disconnect', function () {
     console.log('user disconnected');
 })
});

server.listen(8080, function () {
    console.log('Listening on :8080 port');
}
)