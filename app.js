const express = require('express');
const http = require('http');
const path = require('path');
//const socketio = require('socket.io');

const app = express();

app.use(express.static(path.join(__dirname, 'dist/firepad')));
//app.use(express.static(path.join(__dirname, 'node_modules')));
//app.use('/js', express.static(path.join(__dirname, '/dist/editor')));
const allowedExt = [
    '.js',
    '.ico',
    '.css',
    '.png',
    '.jpg',
    '.woff2',
    '.woff',
    '.ttf',
    '.svg',
];

app.get('*', (req, res) => {
    if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
        res.sendFile(path.join(__dirname,`${req.url}`));
    } else {
        res.sendFile(path.join(__dirname, 'dist/firepad/index.html'));
    }
});

const port = process.env.PORT || '3010';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server is running on ` + port);
})

// const io = socketio.listen(server);

// io.sockets.on("connection", function (socket){
//     console.log("socket was connected");

//     socket.on('message',function(data){
//         console.log("message received "+ data.message)
//         socket.broadcast.emit('new message',{message:data.message});
//     })
   
// });

