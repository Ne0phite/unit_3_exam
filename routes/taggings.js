const express = require("express");
const router = express.Router();

const {
  getAllTaggings,
  getTaggingById,
  taggingsByResearcher,
  taggingsOnAnimal,
  addTagging
} = require("../db/queries/taggingQ.js");

router.get("/", getAllTaggings);
router.get("/:id", getTaggingById);
router.get("/researchers/:id", taggingsByResearcher);
router.get("/animals/:id", taggingsOnAnimal);

router.post("/", addTagging);

module.exports = router;
