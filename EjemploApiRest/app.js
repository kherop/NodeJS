//Para instalar express: npm install express --save
//Para configurar jade: npm install jade --save
//Para recuperar datos de un formulario: npm install body-parser --save
//Para usar mysql: npm install mysql --save

var express = require("express");
var body_parser = require('body-parser');
var router = express.Router();
var app = express();
var mysql = require('mysql');
const { response } = require("express");

// Create a MySQL pool
// Set database connection credentials
var config = {
    host: 'localhost',
    user: 'fernando',
    password: 'Chubaca2018',
    database: 'authBasico',
    port: 3306
};
/*
Para la eficiencia, vamos a crear un pool de MySQL, que nos permite utilizar múltiples conexiones 
a la vez en lugar de tener que manualmente abrir y cerrar conexiones múltiples.
*/
var pool = mysql.createPool(config);
// Export the pool
module.exports = pool;

// app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());



//------------------------------- Rutas -------------------------------------
// Display all users
app.get('/personas', (request, response) => {
    pool.query('SELECT * FROM personas', (error, result) => {
        if (error) throw error;
        response.status(200).send(result);
    });
});


// Display a single user by ID
app.get('/personas/:id', (request, response) => {
    const id = request.params.id;
 
    pool.query('SELECT * FROM personas WHERE id = ?', id, (error, result) => {
        if (error) throw error;
        response.status(200).send(result);
    });
});

// Add a new user
app.post('/personas', (req, res) => {
    var nombre = req.body.nombre;
    var ciudad = req.body.ciudad;
    console.log(req.body);
    console.log(nombre);
    console.log(ciudad);
    res.send(req.body);
    pool.query('INSERT INTO personas(nombre,ciudad) VALUES (?,?)', [req.body.nombre, req.body.ciudad], (error, result) => {
        if (error) throw error;
        res.status(201).send(`Usuario añadido: ${result.insertId}`);
    });
});



// api.post('/api/notas',(req,res)=>{
//     if (req.body.nota != null){
//       res.status(400).send(mensajeErroneo);
//     }
//     guardarNota(req.body.nota);
//     res.send(mensajeCorrecto);
//   });

//Lanzamos el servidor.
app.listen(8090);

