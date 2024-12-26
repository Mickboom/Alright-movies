const express = require("express");
const Movie = require("../models/Movie");

const router = express.Router();

router.get("/movies", async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

module.exports = router;

const express = require("express");
const Movie = require("../models/Movie");

const routes = express.Router();

// Get all movies
router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

// Add a movie
router.post("/", async (req, res) => {
  const { title, description, thumbnail, videoUrl } = req.body;
  const movie = new Movie({ title, description, thumbnail, videoUrl });
  await movie.save();
  res.status(201).json(movie);
});

module.exports = router;

