//importar a dependencia do sqlite3

const sqlite3 = require("sqlite3").verbose();

// criar o objeto que irá realizar as operações no banco de dados
const db = new sqlite3.Database("./src/database.db")
module.exports = db
// utilizar o objeto de banco de dados, para nossas operações.
// db.serialize( () => {
//     //Criar tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)

//     //Insert
//     const query = `
//     INSERT INTO places (
//         image,
//         name,
//         address,
//         address2,
//         state,
//         city,
//         items
//     ) values (?,?,?,?,?,?,?);
// `
//     const values = [
//         "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//         "Papersider",
//         " Avenida Santiago Rodilha, Jardim Veloso",
//         "Número 260",
//         "São Paulo",
//         "Osasco",
//         "Resíduos Eletrônicos, Lâmpadas"

//     ]

//     function afterInsertData(err){
//         if(err){
//             return console.log(err)
//         }
//         console.log("Cadastrado com sucesso")
//         console.log(this)
//     }
     
//     db.run (query, values, afterInsertData)    

    //Query
    // db.all(`SELECT * FROM places`, function(err,rows){
    //     if(err){
    //         return console.log (err)
    //     }

    //     console.log("Aqui estão os seus registros")
    //     console.log(rows)
    // })

    //Delete

//     db.run(`DELETE FROM places WHERE id = ?`, [1], function(err){
//          if(err){
//              return console.log(err)
//          }

//          console.log("Registro deletado com sucesso")
//     })
// })