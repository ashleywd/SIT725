const express = require("express");
const path = require("path");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const routes = require("./routes/routes");

const port = 3001;

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/components",
  express.static(path.join(__dirname, "public/components"))
);
app.use(
  "/src",
  (req, res, next) => {
    if (req.path.endsWith(".js")) {
      res.type("application/javascript");
    }
    next();
  },
  express.static(path.join(__dirname, "src"))
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api", routes);

// Socket.io
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("chat message", (data) => {
    io.emit("chat message", {
      id: Date.now(),
      username: data.username,
      message: data.message,
      timestamp: new Date(),
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server listening to: ${port}`);
});
