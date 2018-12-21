const express = require("express");
const router = express.Router();

const {
  getAllSightings,
  sightingsBySpeciesId,
  sightingsByResearcherId,
  sightingsByhabitatId,
  addSighting,
  deleteSighting
} = require("../db/queries/sightingQ.js");

router.get("/", getAllSightings);
router.get("/species/:id", sightingsBySpeciesId);
router.get("/researchers/:id", sightingsByResearcherId);
router.get("/habitats/:id", sightingsByhabitatId);

router.post("/", addSighting);

router.delete("/:id", deleteSighting);

module.exports = router;
