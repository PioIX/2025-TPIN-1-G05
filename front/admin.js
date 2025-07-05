async function agregarPeliculas() {
    if (getTitlePost() == "" || getLinkPost() == "" || getAñoPost() == "" || getGananciaPost() == "" || getVotoEspectadoresPost() == ""){
        alert("Complete todo los campos para hacer el POST")
    }else{
        await fetchPostPeliculas(getTitlePost(), getVotoEspectadoresPost(), getAñoPost(), getGananciaPost(), getLinkPost())
        alert("Pelicula agregada")
        document.getElementById("titlePost").value = ""
        document.getElementById("gananciaPost").value = ""
        document.getElementById("linkPost").value = ""
        document.getElementById("voto_espectadoresPost").value = ""
        document.getElementById("añoPost").value = ""
    }
}

async function modificarPeliculas() {
    if (getTitlePut() == "" || getLinkPut() == "" || getAñoPut() == "" || getGananciaPut() == "" || getVotoEspectadoresPut() == "" || getIdPeliculasPut() == ""){
        alert("Complete todo los campos para hacer el Put")
    }else{
        await fetchPutPeliculas(getIdPeliculasPut(), getTitlePut(), getGananciaPut(), getLinkPut(), getVotoEspectadoresPut(), getAñoPut())
        alert("Pelicula modificada")
        await llenarDatosPeliculasPut()
        document.getElementById("titlePut").value = ""
        document.getElementById("gananciaPut").value = ""
        document.getElementById("linkPut").value = ""
        document.getElementById("voto_espectadoresPut").value = ""
        document.getElementById("añoPut").value = ""
    }
}

async function borrarPeliculas() {
    if (getIdPeliculasDelete() == ""){
        alert("Seleccione la película a eliminar")
    }else{
        await fetchBorrarPeliculas(getIdPeliculasDelete())
        alert("Pelicula borrada")
        await llenarDatosPeliculasDelete()
    }
}

async function agregarUsuarios() {
    if (getUsernamePost() == "" || getPasswordAdminPost() == "" || getRecordPost() == ""){
        alert("Complete todo los campos para hacer el POST")
    }else{
        await fetchPostUsuarios(getUsernamePost(), getPasswordAdminPost(), getRecordPost())
        alert("Usuario agregado")
        document.getElementById("usernamePost").value = ""
        document.getElementById("passwordPost").value = ""
        document.getElementById("recordPost").value = ""
    }
}

async function modificarUsuarios() {
    if (getUsernamePut() == "" || getPasswordAdminPut() == "" || getRecordPut() == ""|| getIdUsuarioPut() == ""){
        alert("Complete todo los campos para hacer el PUT")
    }else{
        await fetchPutUsuarios(getIdUsuarioPut(), getUsernamePut(), getPasswordAdminPut(), getRecordPut())
        alert("Usuario modificado")
        await llenarDatosUsuariosPut()
        document.getElementById("usernamePut").value = ""
        document.getElementById("passwordPut").value = ""
        document.getElementById("recordPut").value = ""
    }
}

async function borrarUsuarios() {
    if (getIdUsuarioDelete() == ""){
        alert("Seleccione el usuario a eliminar")
    }else{
        await fetchDeleteUsuarios(getIdUsuarioDelete())
        alert("Usuario eliminado")
        await llenarDatosUsuariosDelete()
    }
}