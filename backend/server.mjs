import express from "express";
import axios from "axios";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Use CORS to allow frontend access
app.use(cors());

// Serve static frontend files (e.g., index.html, JS, CSS)
app.use(express.static(path.join(__dirname, "..", "frontend")));

// OMDb API key (move to .env for production)
const apiKey = "b9432326";

// ✅ Home route: serve the frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

// ✅ Fuzzy search by query string
app.get("/api/search", async (req, res) => {
  const query = req.query.query;

  if (!query) {
    return res.status(400).json({ error: "Missing search query" });
  }

  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}`;

  try {
    console.log(`Fetching OMDb (search): ${url}`);
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching from OMDb (search):", error.message);
    res.status(500).json({ error: "Failed to fetch movie data." });
  }
});

// ✅ Exact match by full title
app.get("/api/title", async (req, res) => {
  const title = req.query.title;

  if (!title) {
    return res.status(400).json({ error: "Missing title" });
  }

  const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`;

  try {
    console.log(`Fetching OMDb (title): ${url}`);
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching from OMDb (title):", error.message);
    res.status(500).json({ error: "Failed to fetch movie by title." });
  }
});

// ✅ Get full details by IMDb ID
app.get("/api/details", async (req, res) => {
  const imdbID = req.query.id;

  if (!imdbID) {
    return res.status(400).json({ error: "Missing IMDb ID" });
  }

  const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;

  try {
    console.log(`Fetching OMDb (details): ${url}`);
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching from OMDb (details):", error.message);
    res.status(500).json({ error: "Failed to fetch movie details." });
  }
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
