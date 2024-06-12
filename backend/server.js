const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = 3000;

const dbFilePath = path.join(__dirname, "db.json");

app.use(bodyParser.json());
app.use(cors());

const readDatabase = () => {
  const data = fs.readFileSync(dbFilePath);
  return JSON.parse(data);
};

const writeDatabase = (data) => {
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
};

// Get all trips
app.get("/data", (req, res) => {
  const trips = readDatabase();
  res.json(trips);
});

// Get a trip by ID
app.get("/data/:tripId", (req, res) => {
  const trips = readDatabase();
  const trip = trips.data.find((t) => t.tripId === req.params.tripId);
  if (trip) {
    res.json(trip);
  } else {
    res.status(404).send("Trip not found");
  }
});

// Add a new trip
app.post("/data", (req, res) => {
  const trips = readDatabase();
  const newTrip = { ...req.body, tripId: uuidv4() };
  trips.data.push(newTrip);
  writeDatabase(trips);
  res.status(201).json(newTrip);
});

// Update a trip
app.put("/data/:tripId", (req, res) => {
  const trips = readDatabase();
  const tripIndex = trips.data.findIndex((t) => t.tripId === req.params.tripId);
  if (tripIndex !== -1) {
    trips.data[tripIndex] = { ...req.body, tripId: req.params.tripId };
    writeDatabase(trips);
    res.json(trips.data[tripIndex]);
  } else {
    res.status(404).send("Trip not found");
  }
});

// Delete a trip
app.delete("/data/:tripId", (req, res) => {
  let trips = readDatabase();
  trips = trips.data.filter((t) => t.tripId !== req.params.tripId);
  writeDatabase(trips);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
