const express = require("express");
const bp = require("body-parser");

const app = express();

app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

const researchers = require("./routes/researchers.js");
const species = require("./routes/species.js");
const animals = require("./routes/animals.js");
const habitats = require("./routes/habitats.js");
const taggings = require("./routes/taggings.js");
const sightings = require("./routes/sightings.js");

app.use("/researchers", researchers);
app.use("/species", species);
app.use("/animals", animals);
app.use("/habitats", habitats);
app.use("/taggings", taggings);
app.use("/sightings", sightings);

app.get("/", (req, res) => {
  res.send("Welcome to Marine Biology DATABASE");
});

app.get("*", (req, res) => {
  res.send("Error: Please check your stuff");
});

app.listen(4000, () => {
  console.log("Listening to port 4000");
});
