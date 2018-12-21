const express = require("express");
const router = express.Router();

const {
  getAllAnimals,
  getAnimalById,
  addAnimal,
  updateAnimal,
  deleteAnimal
} = require("../db/queries/animalQ.js");

router.get("/", getAllAnimals);
router.get("/:id", getAnimalById);

router.post("/", addAnimal);

router.patch("/:id", updateAnimal);

router.delete("/:id", deleteAnimal);

module.exports = router;
