const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let elements = [];
let locks = {}; // NEW: Store locks { itemId: userId }

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.emit("load-canvas", elements);
  socket.emit("load-locks", locks); // Send current locks to new user

  socket.on("draw-add", (newElement) => {
    elements.push(newElement);
    socket.broadcast.emit("draw-add", newElement);
  });

  socket.on("draw-update", (updatedElement) => {
    const index = elements.findIndex((el) => el.id === updatedElement.id);
    if (index !== -1) {
      elements[index] = updatedElement;
      socket.broadcast.emit("draw-update", updatedElement);
    }
  });

  socket.on("draw-delete", (id) => {
    elements = elements.filter((el) => el.id !== id);
    socket.broadcast.emit("draw-delete", id);
  });

  // --- LOCKING LOGIC ---
  socket.on("lock-item", (id) => {
    locks[id] = socket.id; // Mark item as locked by this user
    socket.broadcast.emit("lock-update", locks); // Tell everyone
  });

  socket.on("unlock-item", (id) => {
    if (locks[id] === socket.id) {
      delete locks[id]; // Remove lock only if this user owns it
      socket.broadcast.emit("lock-update", locks);
    }
  });
  // ---------------------

  socket.on("cursor-move", (data) => {
    socket.broadcast.emit("cursor-update", { ...data, userId: socket.id });
  });

  socket.on("disconnect", () => {
    // Clear locks held by disconnected user
    for (const id in locks) {
      if (locks[id] === socket.id) delete locks[id];
    }
    socket.broadcast.emit("lock-update", locks);
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING ON PORT 3001");
});