const express = require("express");
const router = express.Router();

const {
  getAllHabitats,
  getHabitatsById,
  addHabitats
} = require("../db/queries/habitatQ.js");

router.get("/", getAllHabitats);
router.get("/:id", getHabitatsById);

router.post("/", addHabitats);

module.exports = router;
