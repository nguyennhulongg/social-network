// socket.ts
import { Server } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";

let io: SocketIOServer;

export const init = (httpServer: Server) => {
  io = new SocketIOServer(httpServer);

  io.on("connection", (socket: Socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // Handle socket events here
    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
};

export { io };
