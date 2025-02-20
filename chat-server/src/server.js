const {httpx} = require('ca-webutils');
const app = require("./app");
const socketIo = require("socket.io");
const setupChat = require("./chat");


httpx.runApp({
    requestHandler:app,
    initializer:async(httpServer)=>{
        const io=new socketIo.Server(httpServer,{
            cors: {
              origin: "*", // Allow all origins
              methods: ["GET", "POST"]
            }
          });
        setupChat(io);
    }
});

//const io = socketIo(server);

//setupChat(io);


// const server = http.createServer(app);
//const http = require("http");
//Setup chat WebSocket logic

