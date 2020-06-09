const express = require ("express");
const server = express();

// pegar o banco de dados
const db = require("./database/db.js")

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
    
     console.log(req.query)
    
    return res.render("create-point.html")
})

server.get("/search", (req,res) => {

  //pegar os dados do banco de dados

   db.all(`SELECT * FROM places`, function(err,rows){
        if(err){
            return console.log (err)
        }

        const total = rows.length
        console.log(rows)
        // mostrar a página html com os dados do banco
        return res.render("search-results.html", {places: rows, total:total})
        
    })

})



//on server
server.listen(3000)