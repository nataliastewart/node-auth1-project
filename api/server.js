const express = require("express");

//import routers
const usersRouter = require("../users/users-router.js");

//server
const server = express();

//middleware
server.use(express.json());

//routers
server.use("/api/users", usersRouter);

module.exports = server;
