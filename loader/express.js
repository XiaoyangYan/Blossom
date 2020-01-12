const express = require("express");
const cors = require("cors");
const apiRouter = require("../router/api");
const config = require("../config/app");
const bodyParser = require("body-parser");

module.exports = async (app) => {
        app.use(cors());
        app.use(bodyParser.json());
        app.use(express.json());
        app.use(config.api, apiRouter);
        return app;
}