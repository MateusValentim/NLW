const express = require ("express");
const server = express();

// config public folder
server.use(express.static("public"))

// Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("/src/views", {
    express: server,
    noCache: true
})

//config routes

//home
server.get("/", (req,res) => {
    res.sendFile(__dirname + "/views/index.html")
})

server.get("/create-point", (req,res) => {
    res.sendFile(__dirname + "/views/create-point.html")
})


//on server
server.listen(3000)