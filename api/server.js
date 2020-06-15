const express = require("express");

//import routers
const usersRouter = require("../users/users-router.js");
const authRouter = require("../auth/auth-router.js");
//server
const server = express();

//middleware
server.use(express.json());

//routers
server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);
module.exports = server;
