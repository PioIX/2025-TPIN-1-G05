async function fetchGetPeliculas(id_pelicula, parametro) {
    try {
        let response = await fetch(`http://localhost:4000/peliculas?id_pelicula=${id_pelicula}&parametro=${parametro}`, {
            method: "GET", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
            },
        })
        let result = await response.json();
        return result
    } catch (error) {
        alert("Hubo un error: " + error.message);
    }

}

async function fetchPostPeliculas(titulo, voto_espectadores, año, ganancia, link) {
    let datos = {
        titulo: titulo,
        voto_espectadores: voto_espectadores,
        año: año,
        ganancia: ganancia,
        link: link
    };
    try {
        let response = await fetch(`http://localhost:4000/insertarPeliculas`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        });
        let result = await response.json();
        return result
    } catch (error) {
        alert("Hubo un error: " + error.message);
    }
}

async function fetchBorrarPeliculas(id_pelicula) {
    let datos = {
        id_pelicula: id_pelicula
    };
    try {
        let response = await fetch(`http://localhost:4000/borrarPeliculas`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        });
        let result = await response.json();
        return result
    } catch (error) {
        alert("Hubo un error: " + error.message);
    }
}

// Fetchs de los usuarios

async function fetchGetUsersId(username, password) {
    try {
        let response = await fetch(`http://localhost:4000/users?username=${username}&password=${password}`, {
            method: "GET", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
            },
        })
        let result = await response.json();
        console.log(result)

        return result.res
    } catch (error) {
        alert("Hubo un error: " + error.message);
    }

}



async function fetchGetUsersRanking() {
    try {
        let response = await fetch(`http://localhost:4000/usersRanking`, {
            method: "GET", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
            },
        })
        let result = await response.json();
        return result
    } catch (error) {
        alert("Hubo un error: " + error.message);
    }

}


async function llenarDatosRanking() {
    let tabla = document.getElementById("tabla").innerHTML
    let resulto = await fetchGetPuntaje();
    console.log(resulto)
    for (let i = 0; i < resulto.length; i++) {
        tabla += `<tr>
            <td><p>${resulto[i].username}</p></td>
            <td><p>${resulto[i].puntaje}</p></td>
            </tr>`
    }
    document.getElementById("tabla").innerHTML = tabla;
}
llenarDatosRanking()

async function fetchPostInsertUser(username, password) {
    let datos = {
        username: username,
        password: password
    };
    try {
        let response = await fetch(`http://localhost:4000/insertUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        });
        let result = await response.json();
        console.log(result);
        return result
    } catch (error) {
        alert("Hubo un error: " + error.message);
    }
}

async function fetchGetRecordPuntaje(id) {
    try {
        let response = await fetch(`http://localhost:4000/recordPuntaje?id_usuario=${id}`, {
            method: "GET", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
            },
        })
        let result = await response.json();
        console.log(result);
        return result
    } catch (error) {
        alert("Hubo un error: " + error.message);
    }

}

async function llenarDatosPersonal(id_user) {   //Recibe el id de usuario del jugador logueado
    let puntajeJugador = await fetchGetRecordPuntaje(id_user);
    document.getElementById("puntajePropio").innerText = puntajeJugador.record
}

async function fetchPutRecord(id_usuario, puntaje) {
    try {
        let datos = {
            puntaje: puntaje,
            id_usuario: id_usuario
        }
        let response = await fetch(`http://localhost:4000/record`, {
            method: "PUT", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos)
        })
        let result = await response.json();
        alert("Se modifico")
        return result
    } catch (error) {
        alert("Hubo un error: " + error.message);

    }
}

async function fetchGetPuntaje() {
    try {
        let response = await fetch(`http://localhost:4000/getPuntaje`, {
            method: "GET", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
            },
        })
        let result = await response.json();
        return result
    } catch (error) {
        alert("Hubo un error: " + error.message);
    }

}


async function fetchPostPuntajes(fecha, puntaje, id_usuario) {
    let datos = {
        fecha: fecha,
        puntaje: puntaje,
        id_usuario: id_usuario
    };
    try {
        let response = await fetch(`http://localhost:4000/insertarPuntaje`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        });
        console.log(response);
        let result = await response.json();
        console.log(result);
        alert(result.mensaje);
    } catch (error) {
        alert("Hubo un error: " + error.message);
    }
}

async function fetchPutPuntajes(puntaje) {
    try {
        let datos = {
            puntaje: puntaje
        }
        let response = await fetch(`http://localhost:4000/modificarPuntaje`, {
            method: "PUT", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos)
        })
        let result = await response.json();
        alert("Se modifico")
        return result
    } catch (error) {
        alert("Hubo un error: " + error.message);

    }
}

async function fetchBorrarPuntaje(id_pelicula) {
    let datos = {
        id_pelicula: id_pelicula
    };
    try {
        let response = await fetch(`http://localhost:4000/borrarPuntaje`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        });
        console.log(response);
        let result = await response.json();
        console.log(result);
        alert("Se borró");
    } catch (error) {
        alert("Hubo un error: " + error.message);
    }
}

async function fetchGetUltimoMejorPuntaje() {
    try {
        let response = await fetch(`http://localhost:4000/getLastMaxPoint`, {
            method: "GET", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
            },
        })
        let result = await response.json();
        return result
    } catch (error) {
        alert("Hubo un error: " + error.message);
    }

}

async function fetchPutModificarUltimoPuntaje(id, puntaje) {
    let datos = {
        id: id,
        puntaje: puntaje
    };
    try {
        let response = await fetch(`http://localhost:4000/modificarUltimoPuntaje`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        });
        let result = await response.json();
        alert(result.mensaje);
        return result;
    } catch (error) {
        alert("Hubo un error: " + error.message);
    }
}

async function fetchGetAllMovies() {
    try {
        let response = await fetch(`http://localhost:4000/getAllMovies`, {
            method: "GET", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
            },
        })
        let result = await response.json();
        return result
    } catch (error) {
        alert("Hubo un error: " + error.message);
    }
}

async function fetchGetAllUsers() {
    try {
        let response = await fetch(`http://localhost:4000/getAllUsers`, {
            method: "GET", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
            },
        })
        let result = await response.json();
        return result
    } catch (error) {
        alert("Hubo un error: " + error.message);
    }
}

async function llenarDatosPeliculasPut() {
    try {
        document.getElementById("opcionesPeliculasPut").innerHTML = ""
        let opciones = ""
        let result = await fetchGetAllMovies()
        for (let i = 0; i < result.length; i++) {
            opciones += `<option value = ${result[i].id_pelicula}>"${result[i].titulo}"</option>`
        }
        document.getElementById("opcionesPeliculasPut").innerHTML = opciones
    } catch (error) {
        alert("Hubo un error: " + error.message);
    }
}

async function llenarDatosPeliculasDelete() {
    try {
        document.getElementById("opcionesPeliculasDelete").innerHTML = ""
        let opciones = ""
        let result = await fetchGetAllMovies()
        for (let i = 0; i < result.length; i++) {
            opciones += `<option value = ${result[i].id_pelicula}>"${result[i].titulo}"</option>`
        }
        document.getElementById("opcionesPeliculasDelete").innerHTML = opciones
    } catch (error) {
        alert("Hubo un error: " + error.message);
    }
}

async function llenarDatosUsuariosPut() {
    try {
        document.getElementById("opcionesUsuariosPut").innerHTML = ""
        let opciones = ""
        let result = await fetchGetAllUsers()
        for (let i = 0; i < result.length; i++) {
            opciones += `<option value = ${result[i].id_usuario}>${result[i].username}</option>`
        }
        document.getElementById("opcionesUsuariosPut").innerHTML = opciones
    } catch (error) {
        alert("Hubo un error: " + error.message);
    }
}

async function llenarDatosUsuariosDelete() {
    try {
        document.getElementById("opcionesUsuariosDelete").innerHTML = ""
        let opciones = ""
        let result = await fetchGetAllUsers()
        for (let i = 0; i < result.length; i++) {
            opciones += `<option value = ${result[i].id_usuario}>${result[i].username}</option>`
        }
        document.getElementById("opcionesUsuariosDelete").innerHTML = opciones
    } catch (error) {
        alert("Hubo un error: " + error.message);
    }
}

async function fetchPutUsuarios(id_usuario, username, password, record) {
    try {
        let datos = {
            id_usuario: id_usuario,
            username: username,
            password: password,
            record: record
        }
        let response = await fetch(`http://localhost:4000/changeUser`, {
            method: "PUT", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos)
        })
        let result = await response.json();
        return result
    } catch (error) {
        alert("Hubo un error: " + error.message);

    }
}

async function fetchPostUsuarios(username, password, record) {
    let datos = {
        username: username,
        password: password,
        record: record
    };
    try {
        let response = await fetch(`http://localhost:4000/insertUserAdmin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        });
        let result = await response.json();
        return result
    } catch (error) {
        alert("Hubo un error: " + error.message);;
    }
}

async function fetchDeleteUsuarios(id_usuario) {
    let datos = {
        id_usuario: id_usuario
    }
    try {
        let response = await fetch(`http://localhost:4000/deleteUser`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        });
        let result = await response.json();
        return result
    } catch (error) {
        alert("Hubo un error: " + error.message);;
    }
}

async function fetchPutPeliculas(id_pelicula, titulo, ganancia, link, voto_espectadores, año) {
    try {
        let datos = {
            id_pelicula: id_pelicula,
            titulo: titulo,
            ganancia: ganancia,
            link: link,
            voto_espectadores: voto_espectadores,
            año: año

        }
        let response = await fetch(`http://localhost:4000/changeMovie`, {
            method: "PUT", //GET, POST, PUT o DELETE
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos)
        })
        let result = await response.json();
        return result
    } catch (error) {
        alert("Hubo un error: " + error.message);

    }
}