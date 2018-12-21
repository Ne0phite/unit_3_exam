const { db } = require("./connection.js");

const getAllSpecies = (req, res, next) => {
  db.any("SELECT * FROM species")
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "all species"
      });
    })
    .catch(err => {
      console.log(err);
      next();
    });
};

const getSpeciesById = (req, res, next) => {
  db.one("SELECT * FROM species WHERE id = ${id}", {
    id: parseInt(req.params.id)
  })
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "got a single species by id"
      });
    })
    .catch(err => next(err));
};

const addSpecies = (req, res, next) => {
  if (req.body.is_mammal === "true") {
    req.body.is_mammal = JSON.parse("true");
  } else {
    req.body.is_mammal = JSON.parse("false");
  }
  db.none(
    "INSERT INTO species(name, is_mammal) VALUES(${name}, ${is_mammal})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "added new species"
      });
    })
    .catch(err => {
      console.log(err);
      next();
    });
};

module.exports = {
  getAllSpecies,
  getSpeciesById,
  addSpecies
};
