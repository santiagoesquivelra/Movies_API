//Llamar a express
const { File } = require('buffer');
const { error } = require('console');
const express = require('express');

const fs = require('fs');
//Iniciar express
const app = express();


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(3000, () => {
    console.log('Escucha por el port 3000');
});

//Metodo GET
app.get('/', function(request, response) {
    response.send('hola');
});

app.get('/movies', (req, res) => {
    fs.readFile('movies.json', (error, file) => {
        if (error) {
            console.log('No se puede leer el archivo');
            return;
        }

        const movies = JSON.parse(file);
        return res.json(movies);
    });
});

//Metodo POST

app.post('/movies', (req, res) => {
    fs.readFile('movies.json', (err, data) => {
        const movies = JSON.parse(data);

        const newMovieID = movies.length + 1;

        req.body.id = newMovieID;
        movies.push(req.body);

        //Agregar nueva peli al arrays de movies
        const newMovie = JSON.stringify(movies, null, 2);

        fs.writeFile('movies.json', newMovie, (err) => {
            if (err) {
                console.log("Ha ocurrido un error al escribir el archivo")
            }

            return res.status(200).send("Nueva pelicula añadida");
        })
    });
});

//Metodo PATCH

app.patch('/movie/:id', (req, res) => {
    const mid = req.params.id;
    const { name, year } = req.body;

    fs.readFile('movies.json', (err, data) => {
        if (err) {
            console.log("Ha ocurrido un error al leer el fichero", err);
        }

        constmovies = JSON.parse(data);

        movies.forEach(movie => {
            if (name != undefined) {
                movie.name = name;
            }

            if (year != undefined) {
                movie.year = year;
            }

            const movieUpdated = JSON.stringify(movies, null, 2);

            fs.writeFile('movies.json', movieUpdated, (err) => {
                if (err) {
                    console.log("Ha ocurrido un error al escribir en el fichero")
                }

                return res.status(200).send("Pelicula modificada");
            })
        });
    })
})

//Metodo DELETE

app.delete('/movie/:id', (req, res) => {
    const mid = req.params.id;

    fs.readFile('movies.json', (err, data) => {
        if (err) {
            console.log("Ha ocurrido un error al leer el fichero", err);
        }

        const movies = JSON.parse(data);
        movies.forEach(movie => {
            if (movie.id === Number(mid), 1);

            const movieDeleted = JSON.stringify(movies.null, 2)

            fs.writeFile('movies.json', movieDeleted, (err) => {
                if (err) {
                    console.log("Ha ocurrido un erro al escribir en el fichero");
                }
                return res.status(200), json({ message: "pelicula eliminada" });
            })
        })
    })
})