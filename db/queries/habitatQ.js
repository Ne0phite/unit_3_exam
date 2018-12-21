const { db } = require("./connection.js");

const getAllHabitats = (req, res, next) => {
  db.any("SELECT * FROM habitats")
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "all habitats"
      });
    })
    .catch(err => {
      console.log(err);
      next();
    });
};

const getHabitatsById = (req, res, next) => {
  db.one("SELECT * FROM habitats WHERE id = ${id}", {
    id: parseInt(req.params.id)
  })
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "got a single habitats by id"
      });
    })
    .catch(err => next(err));
};

const addHabitats = (req, res, next) => {
  db.none("INSERT INTO habitats(category) VALUES(${category})", req.body)
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "added new habitat"
      });
    })
    .catch(err => {
      console.log(err);
      next();
    });
};

module.exports = {
  getAllHabitats,
  getHabitatsById,
  addHabitats
};
