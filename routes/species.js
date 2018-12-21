const express = require("express");
const router = express.Router();

const {
  getAllSpecies,
  getSpeciesById,
  addSpecies
} = require("../db/queries/speciesQ.js");

router.get("/", getAllSpecies);
router.get("/:id", getSpeciesById);

router.post("/", addSpecies);

module.exports = router;
