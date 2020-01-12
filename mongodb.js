const express = require("express");
require("dotenv").config();
const {MongoClient, ObjectID} = require("mongodb");

const app = express();
app.listen(process.env.PORT);

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'auth';
const id = new ObjectID();
console.log(id);