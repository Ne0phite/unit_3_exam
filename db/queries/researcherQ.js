const { db } = require("./connection.js");

const getAllResearchers = (req, res, next) => {
  db.any("SELECT * FROM researchers")
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "all researchers"
      });
    })
    .catch(err => {
      console.log(err);
      next();
    });
};

const getResearcherById = (req, res, next) => {
  db.one("SELECT * FROM researchers WHERE id = ${id}", {
    id: parseInt(req.params.id)
  })
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "got a single researcher by id"
      });
    })
    .catch(err => next(err));
};

const addResearcher = (req, res, next) => {
  db.none(
    "INSERT INTO researchers(name, job_title) VALUES(${name}, ${job_title})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "added new researcher to the team"
      });
    })
    .catch(err => {
      console.log(err);
      next();
    });
};

const updateResearcher = (req, res, next) => {
  db.none(
    "UPDATE researchers SET name = ${name}, job_title = ${job_title}  WHERE id = ${id}",
    {
      name: req.body.name,
      job_title: req.body.job_title,
      id: parseInt(req.params.id)
    }
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "updated researcher"
      });
    })
    .catch(err => next(err));
};

const deleteResearcher = (req, res, next) => {
  db.none("DELETE FROM researchers WHERE id = ${id}", {
    id: parseInt(req.params.id)
  })
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "deleted a researcher"
      });
    })
    .catch(err => {
      console.log(err);
      next();
    });
};

module.exports = {
  getAllResearchers,
  getResearcherById,
  addResearcher,
  updateResearcher,
  deleteResearcher
};
