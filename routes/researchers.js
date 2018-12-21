const express = require("express");
const router = express.Router();

const {
  getAllResearchers,
  getResearcherById,
  addResearcher,
  updateResearcher,
  deleteResearcher
} = require("../db/queries/researcherQ.js");

router.get("/", getAllResearchers);
router.get("/:id", getResearcherById);

router.post("/", addResearcher);

router.patch("/:id", updateResearcher);

router.delete("/:id", deleteResearcher);

module.exports = router;
