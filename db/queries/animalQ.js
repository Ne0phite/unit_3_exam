const { db } = require("./connection.js");

const getAllAnimals = (req, res, next) => {
  db.any("SELECT * FROM animals")
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "all Animals"
      });
    })
    .catch(err => {
      console.log(err);
      next();
    });
};

const getAnimalById = (req, res, next) => {
  db.one("SELECT * FROM animals WHERE id = ${id}", {
    id: parseInt(req.params.id)
  })
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "got a single animal by id"
      });
    })
    .catch(err => next(err));
};

const addAnimal = (req, res, next) => {
  req.body.species_id = parseInt(req.body.species_id);
  db.none(
    "INSERT INTO animals(species_id, nickname) VALUES(${species_id}, ${nickname})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "added new animal"
      });
    })
    .catch(err => {
      console.log(err);
      next();
    });
};

const updateAnimal = (req, res, next) => {
  db.none(
    "UPDATE animals SET species_id = ${species_id}, nickname = ${nickname}  WHERE id = ${id}",
    {
      species_id: parseInt(req.body.species_id),
      nickname: req.body.nickname,
      id: parseInt(req.params.id)
    }
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "updated animal"
      });
    })
    .catch(err => next(err));
};

const deleteAnimal = (req, res, next) => {
  db.none("DELETE FROM animals WHERE id = ${id}", {
    id: parseInt(req.params.id)
  })
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "deleted an Animal"
      });
    })
    .catch(err => {
      console.log(err);
      next();
    });
};

module.exports = {
  getAllAnimals,
  getAnimalById,
  addAnimal,
  updateAnimal,
  deleteAnimal
};
