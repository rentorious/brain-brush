import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors);

const server = http.createServer(app);
const io = new Server(server, { cors: "*" });

const PORT = 3001;

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconneted", () => console.log("a user disconnected"));

  socket.on("canvas-snapshot", (data) => {
    console.log("emitting data");
    socket.broadcast.emit("canvas-snapshot-response", data);
  });
});

server.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
