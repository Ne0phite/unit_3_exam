const pgp = require("pg-promise")({});
const db = pgp("postgres://localhost:5432/unit3_db");

module.exports = { db };
