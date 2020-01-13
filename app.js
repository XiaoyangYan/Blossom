const cors = require("cors");
const express = require("express");
const loader = require("./loader/index")
const app = express();

loader.init(app);
module.exports = app;