const path = require("path");
const PORT = process.env.PORT || 5000;

const express = require("express");
const connectDB = require("./config/db");

const { errorHandler } = require("./middleware/errorMiddleware");

require("colors");
require("dotenv").config();

// Database connection
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/notes", require("./routes/noteRoutes"));

// Serve Front-End
if ((process.env.NODE_ENV = "production")) {
  // Set builder folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
} else {
  app.get("/", (_, res) => {
    res.status(200).json({ message: "Welcome to the Notes App API" });
  });
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
