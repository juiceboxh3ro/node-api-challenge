const cors = require('cors');
const express = require('express');
const server = express();

server.use(logger)
server.use(cors())
server.use(express.json())

const prjRouter = require('./api/projectsRouter')
server.use("/api/", prjRouter)

const actRouter = require('./api/actionsRouter')
server.use("/act", actRouter)

server.get('/', (req, res) => {
  res.send(`<h2>What's up here I am</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} Request to: ${req.originalUrl} `)
  next()
}

module.exports = server;
