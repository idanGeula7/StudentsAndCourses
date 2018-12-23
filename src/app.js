const express = require("express");
const app = express();
const router = require("./router");
app.use(express.json());
app.use("/", router);

// TODO:
// Add HTTP request validations.
// Add error Handling.

module.exports = app;