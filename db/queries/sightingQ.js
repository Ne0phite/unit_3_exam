const { db } = require("./connection.js");

const getAllSightings = (req, res, next) => {
  db.any("SELECT * FROM sightings")
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "all sightings"
      });
    })
    .catch(err => {
      console.log(err);
      next();
    });
};
// - GET `/sightings/species/:id`: Get all sightings of a specific species.
const sightingsBySpeciesId = (req, res, next) => {
  let speciesId = parseInt(req.params.id);
  db.any(
    "SELECT sightings.* FROM species JOIN sightings ON species.id = sightings.species_id WHERE species.id = $1",
    [speciesId]
  )
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "all sightings for a specific species"
      });
    })
    .catch(err => {
      console.log(err);
      next();
    });
};

const sightingsByResearcherId = (req, res, next) => {
  let researcherId = parseInt(req.params.id);
  db.any(
    "SELECT sightings.* FROM researchers JOIN sightings ON researchers.id = sightings.researcher_id WHERE researchers.id = $1",
    [researcherId]
  )
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "all sightings for a specific species"
      });
    })
    .catch(err => {
      console.log(err);
      next();
    });
};

const sightingsByhabitatId = (req, res, next) => {
  let habitatId = parseInt(req.params.id);
  db.any(
    "SELECT sightings.* FROM habitats JOIN sightings ON habitats.id = sightings.habitat_id WHERE habitats.id = $1",
    [habitatId]
  )
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "all sightings for a given habitat ID"
      });
    })
    .catch(err => {
      console.log(err);
      next();
    });
};

const addSighting = (req, res, next) => {
  req.body.researcher_id = parseInt(req.body.researcher_id);
  req.body.species_id = parseInt(req.body.species_id);
  req.body.habitat_id = parseInt(req.body.habitat_id);
  db.none(
    "INSERT INTO sitings(researcher_id, species_id, habitat_id) VALUES(${researcher_id}, ${species_id}, ${habitat_id})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "added new singting"
      });
    })
    .catch(err => {
      console.log(err);
      next();
    });
};

const deleteSighting = (req, res, next) => {
  db.none("DELETE FROM sightings WHERE id = ${id}", {
    id: parseInt(req.params.id)
  })
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "deleted a sighting"
      });
    })
    .catch(err => {
      console.log(err);
      next();
    });
};

module.exports = {
  getAllSightings,
  sightingsBySpeciesId,
  sightingsByResearcherId,
  sightingsByhabitatId,
  addSighting,
  deleteSighting
};
