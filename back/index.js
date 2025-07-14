var express = require('express'); //Tipo de servidor: Express
var bodyParser = require('body-parser'); //Convierte los JSON
var cors = require('cors');
const { realizarQuery } = require('./modulos/mysql');

var app = express(); //Inicializo express
var port = process.env.PORT || 4000; //Ejecuto el servidor en el puerto 3000

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res) {
    res.status(200).send({
        message: 'GET Home route working fine!'
    });
});

//Crea un nuevo usuario una vez se checka el login, y devuelve el id. Tener en cuenta que el id lo van a usar para obtener los siguientes pedidos
app.post('/insertUser', async function (req, res) {
    try {
        let check = await realizarQuery(`SELECT username FROM Usuarios WHERE username = "${req.body.username}"`);
        if (check.length == 0) {     //Este condicional corrobora que exista algun usuario con ese nombre de usuario
            await realizarQuery(`INSERT INTO Usuarios (username, password, record) VALUES
                ("${req.body.username}", "${req.body.password}", 0)`)      //Cambiar a nombres de variables que sean el username y la password, el récord por default es 0
            let respuesta = await realizarQuery(`SELECT id_usuario FROM Usuarios WHERE username = "${req.body.username}"`)  //Pasarle como parámetro el nombre de usuario, de acá en más nos manejaremos con el id de usuario
            res.send({ res: respuesta })
        } else {
            res.send({ res: "No se pudo agregar el usuario, ya existe otro con ese nombre" })
        };
    } catch (error) {
        res.send({ mensaje: "Tuviste un error", error: error.message })
    }
})


//Esta función checkea que primero exista un usuario con ese nombre y luego checkea si la contraseña y el usuario coinciden 
app.get('/users', async function (req, res) {
    try {
        let checkUsuario = await realizarQuery(`SELECT * FROM Usuarios WHERE username = "${req.query.username}"`)
        if (checkUsuario.length == 0) {
            res.send({ res: "-1" })   //Importante que hagan un parseInt en el front para cambiarlo a integer, sí funciona bien el register
        } else if (checkUsuario.length > 0) {
            let checkContraseña = await realizarQuery(`SELECT * FROM Usuarios WHERE username = "${req.query.username}" AND password = "${req.query.password}"`)
            if (checkContraseña.length == 0) {
                res.send({ res: "0" })  //Importante que hagan un parseInt en el front para cambiarlo a integer, sí funciona bien el register
            } else {
                res.send({ res: checkContraseña })
            }
        }
    } catch (error) {
        res.send({ mensaje: "Tuviste un error", error: error.message });
    }
})

//Los usuarios para el ranking de los 10 mejores
app.get('/usersRanking', async function (req, res) {
    try {
        let respuesta = await realizarQuery(`SELECT username, record FROM Usuarios ORDER BY record DESC LIMIT 10`);
        res.send(respuesta);
    }
    catch (error) {
        res.send({ mensaje: "Tuviste un error", error: error.message });
    }
})





//PEDIDOS BACK DE PELICULAS
// titulo, img y la categoria todo por el query; y try catch




app.get('/peliculas', async function (req, res) {
    try {
        let parametro = req.query.parametro
        let respuesta;
        respuesta = await realizarQuery(`SELECT titulo, link, ${parametro} AS parametro FROM Peliculas WHERE id_pelicula=${req.query.id_pelicula}`);
        res.send(respuesta)
    } catch (error) {
        res.send(error)
    }

});

app.delete('/borrarPeliculas', async function (req, res) {
    try {
        await realizarQuery(`
        DELETE FROM Peliculas WHERE id_pelicula = ${req.body.id_pelicula}`)
        res.send({ mensaje: "Se elimino correctamente" })
    } catch (error) {
        res.send(error)
    }

})

app.post('/insertarPeliculas', async function (req, res) {
    try {
        let check = await realizarQuery(`SELECT * FROM Peliculas WHERE titulo = "${req.body.titulo}" AND voto_espectadores = ${req.body.voto_espectadores} AND ganancia = ${req.body.ganancia} AND año = ${req.body.año} AND link ="${req.body.link}"`)
        if (check.length == 0) {
            await realizarQuery(` INSERT INTO Peliculas (titulo, ganancia, voto_espectadores, link, año )
                VALUES ("${req.body.titulo}", ${req.body.ganancia}, ${req.body.voto_espectadores}, "${req.body.link}", ${req.body.año});`)
            res.send({ mensaje: "Pelicula agregada correctamente" });
        }
        else {
            res.send({ mensaje: "Pelicula ya existe" })
        }
    } catch (error) {
        res.send({ mensaje: "Tuviste un error", error: error.message });
    }
});

//Obtiene el puntaje de la cuenta a partir del id de usuario (recordar que el id de usuario se obtuvo anteriormente, cuando se logueó)
app.get('/recordPuntaje', async function (req, res) {
    try {
        let respuesta = await realizarQuery(`SELECT record FROM Usuarios WHERE id_usuario = ${req.query.id_usuario}`);
        console.log(respuesta)
        res.send({ record: respuesta[0].record });
    } catch (error) {
        res.send({ mensaje: "Tuviste un error", error: error.message })
    }
}
)

//Cambia el puntaje del usuario si este es mayor que su record. Sino, se encarga de obtener el puntaje máximo para comparar al final con el puntaje hecho
app.put('/record', async function (req, res) {
    try {
        let check = await realizarQuery(`SELECT record FROM Usuarios WHERE record >= ${req.body.puntaje} AND id_usuario = ${req.body.id_usuario}`)  //Pasarle los puntos que hizo el usuario
        console.log(check)
        if (check.length == 0) {      //Este condicional corrobora que el récord sea mayor que el puntaje
            await realizarQuery(`UPDATE Usuarios SET record = ${req.body.puntaje} WHERE id_usuario = ${req.body.id_usuario}`);   //A través del id de usuario identifica qué record debe cambiar
            res.send({mensaje:"Record cambiado"})
        } else {
            res.send("El puntaje no es mayor que el record")
        }
    } catch (error) {
        res.send({ mensaje: "Tuviste un error", error: error.message })
    }
})

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

//Para cambiar el auto-increment del SQL si se generan usuarios de prueba:
//ALTER TABLE Usuarios AUTO_INCREMENT = 1

/*------------------------------------------------------------------------------------------*/
/*-----------------------------------------PUNTAJES-----------------------------------------*/
/*------------------------------------------------------------------------------------------*/


//GET PUNTAJES
app.get('/getPuntaje', async function (req,res) {
    try {
        let respuesta = await realizarQuery(`
            SELECT Puntajes.puntaje, Usuarios.username 
            FROM Puntajes 
            INNER JOIN Usuarios 
            ON Puntajes.id_usuario = Usuarios.id_usuario 
            ORDER BY Puntajes.puntaje DESC
            limit 10
        `);
        res.send(respuesta);
    }
    catch (error) {
        res.send({ mensaje: "Tuviste un error", error: error.message });
    }
})

//POST PUNTAJES
app.post('/insertarPuntaje', async function (req, res) {
    try {
        const check = await realizarQuery(`SELECT * FROM Puntajes WHERE fecha = "${req.body.fecha}" AND puntaje = "${req.body.puntaje}" AND id_usuario = "${req.body.id_usuario}"`)

        if (check.length == 0) {
            await realizarQuery(` INSERT INTO Puntajes (fecha, puntaje, id_usuario)
                VALUES ("${req.body.fecha}", "${req.body.puntaje}", "${req.body.id_usuario}"); `)
            res.send({ mensaje: "Puntaje agregado correctamente" });
        }
        else {
            res.send({ mensaje: "Puntaje ya existe" })
        }
    } catch(error) {
        res.send({ mensaje: "Tuviste un error", error: error.message });
    }
});

//PUT PUNTAJES
app.put('/modificarPuntaje', async function (req, res) {
    try{
        await realizarQuery(`UPDATE Puntajes SET
        puntaje='${req.body.puntaje}' WHERE id_puntaje='${req.body.id_puntaje}'`);
        res.send({ mensaje: "Puntaje modificado correctamente" });
    }catch(error){
        res.send({mensaje: "Tuviste un error", error: error.message})}
})

//DELETE PUNTAJES
app.delete('/borrarPuntaje', function (req, res) {
    try{
    realizarQuery(`DELETE FROM Puntajes WHERE id_puntaje = '${req.body.id_puntaje}'`)
        res.send({ mensaje: "Puntaje borrado correctamente" });
    }catch (error) {
        res.send({ mensaje: "Tuviste un error", error: error.message });
    }
})

//GET DÉCIMO PUNTAJE
app.get('/getLastMaxPoint', async function (req,res) {
    try {
        let respuesta = await realizarQuery(`select puntaje from Puntajes order by puntaje limit 1`);
        res.send(respuesta);
    }catch (error) {
        res.send({ mensaje: "Tuviste un error", error: error.message });
    }
})


//MODIFICAR ULTIMO PUNTAJE
app.put('/modificarUltimoPuntaje', async function (req, res) {
    try{
        const ultimo =  await realizarQuery(`select id_puntaje from Puntajes order by puntaje limit 1`);
        console.log(ultimo)
        await realizarQuery(`UPDATE Puntajes SET puntaje='${req.body.puntaje}', id_usuario=${req.body.id_usuario} WHERE id_puntaje='${ultimo[0].id_puntaje}'`);
        res.send({mensaje: "Décimo puntaje modificado correctamente"});
    }catch(error){
        res.send({mensaje: "Tuviste un error", error: error.message})
    }
})

/*------------------------------------------------------------------------------------------*/
/*-------------------------------------ADMINISTRADOR----------------------------------------*/
/*------------------------------------------------------------------------------------------*/

//USUARIOS
app.get('/getAllUsers', async function (req, res) {
    try {
        respuesta = await realizarQuery(`SELECT username, id_usuario FROM Usuarios`)
        res.send(respuesta)
    } catch (error) {
        res.send({ mensaje: "Tuviste un error", error: error.message })
    }
})

app.post('/insertUserAdmin', async function (req, res) {
    try {
        let check = await realizarQuery(`SELECT username FROM Usuarios WHERE username = "${req.body.username}"`);
        if (check.length == 0) {
            await realizarQuery(`INSERT INTO Usuarios (username, password, record) VALUES
                ("${req.body.username}", "${req.body.password}", ${req.body.record})`)
            res.send({res: "Usuario agregado"})
        } else {
            res.send({ res: "No se pudo agregar el usuario, ya existe otro con ese nombre" })
        };
    } catch (error) {
        res.send({ mensaje: "Tuviste un error", error: error.message })
    }
})

app.put('/changeUser', async function (req, res) {
    try {
        await realizarQuery(`UPDATE Usuarios SET username = "${req.body.username}", password = "${req.body.password}", record = ${req.body.record} WHERE id_usuario = "${req.body.id_usuario}"`)
        res.send({res:"Se ha cambiado el usuario"})
    } catch (error) {
        res.send({ mensaje: "Tuviste un error", error: error.message })
    }
})

app.delete('/deleteUser', async function (req, res) {
    try {
        await realizarQuery(`DELETE FROM Usuarios WHERE id_usuario = ${req.body.id_usuario}`)
        res.send({res:"Usuario eliminado correctamente"})
    } catch (error) {
        res.send({ mensaje: "Tuviste un error", error: error.message })
    }
})

//PELICULAS
app.get('/getAllMovies', async function (req, res) {
    try {
        respuesta = await realizarQuery(`SELECT titulo, id_pelicula FROM Peliculas`)
        res.send(respuesta)
    } catch (error) {
        res.send({ mensaje: "Tuviste un error", error: error.message })
    }
})

//PARA EL POST USAR EL MISMO PEDIDO YA CREADO ANTERIORMENTE

app.put('/changeMovie', async function (req, res) {
    try {
        await realizarQuery(`UPDATE Peliculas SET titulo = "${req.body.titulo}", ganancia = "${req.body.ganancia}", link = "${req.body.link}", voto_espectadores = "${req.body.voto_espectadores}", año = ${req.body.año} WHERE id_pelicula = "${req.body.id_pelicula}"`)
        res.send({res:"Se ha cambiado la pelicula"})
    } catch (error) {
        res.send({ mensaje: "Tuviste un error", error: error.message })
    }
})

//PARA EL DELETE USAR EL MISMO PEDIDO YA CREADO ANTERIORMENTE
