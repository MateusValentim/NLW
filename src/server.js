const express = require("express");
const server = express();

// pegar o banco de dados
const db = require("./database/db.js")

// config public folder
server.use(express.static("public"))

// Habilitar o uso do req.body na nossa aplicação

server.use(express.urlencoded({ extended: true }))

// Utilizando template engine - ligando o nunjucks no express
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//config routes

//home
server.get("/", (req, res) => {
    return res.render("index.html", { title: "Um titulo" })
})

server.get("/create-point", (req, res) => {

    console.log(req.query)

    return res.render("create-point.html")
})

server.post("/save-point", (req, res) => {

    //req.body: O corpo do nosso formulário

    // console.log(req.query)
    // return res.send("ok")

    //Inserir dados no banco de dados
    //Insert
    const query = `
    INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    ) values (?,?,?,?,?,?,?);
`
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items,

    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro")
        }
        console.log("Cadastrado com sucesso")
        console.log(this)

        return Response.send("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData)
})

server.get("/search", (req, res) => {
    const search = req.query.search

    if (search == "") {
        return res.render("search-results.html", { total: 0 })
    }

    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }
        const total = rows.length
        console.log(rows)

        // mostrar a página html com os dados do banco
        return res.render("search-results.html", { places: rows, total: total })

    })

})



//on server
server.listen(3000)