const express = require ("express");
const server = express();

// config public folder
server.use(express.static("public"))

// Utilizando template engine - ligando o nunjucks no express
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//config routes

//home
server.get("/", (req,res) => {
  return res.render("index.html", { title: "Um titulo" })
})

server.get("/create-point", (req,res) => {
    return res.render("create-point.html")
})

server.get("/search", (req,res) => {
  return res.render("search-results.html")
})



//on server
server.listen(3000)