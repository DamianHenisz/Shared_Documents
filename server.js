// const express = require('express');
// const app = express();

// const io = require('socket.io')(app);
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/api', function (req, res, next) {
    const test = [
        {test: 'OK Connected backend'}
     ];
    res.json(test);
});

app.get('/websocket', function (req, res, next) {
    res.sendFile(__dirname + '/client/public/index.html');
});

io.on('connection', function (socket) {
 console.log('websocket connected');
 socket.on('disconnect', function(){
    console.log('user disconnected');
});
});


app.listen(8080, function () {
    console.log('Listening on :8080 port');
}
)