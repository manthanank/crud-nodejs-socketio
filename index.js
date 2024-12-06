const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const itemRoutes = require('./routes/itemRoutes');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.set('io', io);
app.use(express.json());
app.use('/api', itemRoutes);
app.get('/', (req, res) => {
  res.send('API is running...');
});

let users = {};

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  users[socket.id] = socket;

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    delete users[socket.id];
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});