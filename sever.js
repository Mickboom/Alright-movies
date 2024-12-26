const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/movieDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Models
const User = require("./models/User");
const Movie = require("./models/Movie");

// Routes
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");

app.use("/api", userRoutes);
app.use("/api", movieRoutes);

// Start Server
const SEVER = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Server = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

// Routes
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");

app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

