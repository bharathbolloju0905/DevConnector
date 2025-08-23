const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});
const PORT = process.env.PORT || 3000;
const authentication = require('./Routes/Authentication');
const dotenv = require('dotenv');
const connectTODB = require('./DB/connect');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const upload = require('./Routes/uploads');
const posts = require('./Routes/posts');
const message = require('./Routes/message');
const connections = require('./Routes/connectinRoute');
const path = require('path');

app.use(cookieParser());
app.use(express.json());
dotenv.config();

app.use(cors({
  origin: ['http://localhost:5173', 'https://dev-connector-seven.vercel.app/'],
  credentials: true,
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api", authentication);
app.use("/api/uploads/", upload);
app.use("/api/posts", posts);
app.use("/api/messages", message);
app.use("/api/connections", connections);


module.exports = app ;
