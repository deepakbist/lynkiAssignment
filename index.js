const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require("http");
const socketIo = require("socket.io");

require('./models/User');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/lynkit',{useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


io.on("connection", (socket) => {
    console.log("New client connected");

    interval = setInterval(() => getApiAndEmit(socket), 1000);
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

app.use(bodyParser.json());


require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app);



const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});
