// Importation des libs

var express = require('express');
var app = express();
var server = require('http').createServer(app);

//ROOTER

app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res) {
   res.render('index.ejs');
});

server.listen(4000, () => console.log("Server running on 4000"));

//IO

const io = require('socket.io')(server);

// TODO

io.on('connection', (socket) => {
    
   socket.on('pseudo', (pseudo) => {
        socket.pseudo = pseudo;
        socket.broadcast.emit('newUser', pseudo)
    });

    socket.on('newMessage', (message) => {
        socket.broadcast.emit('newMessageAll', {message: message, pseudo: socket.pseudo});
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('quitUser', socket.pseudo);
    });
});