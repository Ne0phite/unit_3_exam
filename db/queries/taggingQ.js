const { db } = require("./connection.js");

const getAllTaggings = (req, res, next) => {
  db.any("SELECT * FROM taggings")
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "all taggings"
      });
    })
    .catch(err => {
      console.log(err);
      next();
    });
};

const getTaggingById = (req, res, next) => {
  db.one("SELECT * FROM taggings WHERE id = ${id}", {
    id: parseInt(req.params.id)
  })
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "got a single tagging by id"
      });
    })
    .catch(err => next(err));
};

const taggingsByResearcher = (req, res, next) => {
  let researcherId = parseInt(req.params.id);
  db.any(
    "SELECT taggings.* FROM researchers JOIN taggings ON researchers.id = taggings.researcher_id WHERE researchers.id = $1",
    [researcherId]
  )
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "all taggings from a specific researcher"
      });
    })
    .catch(err => {
      console.log(err);
      next();
    });
};

const taggingsOnAnimal = (req, res, next) => {
  let animalId = parseInt(req.params.id);
  db.any(
    "SELECT taggings.* FROM animals JOIN taggings ON animals.id = taggings.animal_id WHERE animals.id = $1",
    [animalId]
  )
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "all taggings on specific animal"
      });
    })
    .catch(err => {
      console.log(err);
      next();
    });
};

const addTagging = (req, res, next) => {
  req.body.animal_id = parseInt(req.body.animal_id);
  req.body.researcher_id = parseInt(req.body.researcher_id);
  db.none(
    "INSERT INTO taggings(animal_id, researcher_id) VALUES(${animal_id}, ${researcher_id})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "added new tagging"
      });
    })
    .catch(err => {
      console.log(err);
      next();
    });
};

module.exports = {
  getAllTaggings,
  getTaggingById,
  taggingsByResearcher,
  taggingsOnAnimal,
  addTagging
};
