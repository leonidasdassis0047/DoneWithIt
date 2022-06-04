import 'dotenv/config';
import { Server } from 'socket.io';

import Application from './App';
import {
  ClientToServerEvents,
  IController,
  InterServerEvents,
  ServerToClientEvents,
  SocketData
} from './utils/interfaces';

// validate environment variables

const controllers: IController[] = [];
const app = new Application(5000, controllers);
const server = app.startListening();

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {});

io.on('connection', (socket) => {
  console.log(socket.id);

  socket.on('message', (message: string) => {
    console.log(message);
  });
});
