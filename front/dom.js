//DOM getters
function getUser() {
    user = document.getElementById("inputUser").value;
    return user
}
function getPassword() {
    password = document.getElementById("inputPassword").value;
    return password
}

function getIdPeliculasPut() {
    let id_pelicula = document.getElementById("opcionesPeliculasPut").value
    return id_pelicula
}

function getIdPeliculasDelete() {
    let id_pelicula = document.getElementById("opcionesPeliculasDelete").value
    return id_pelicula
}

function getIdUsuarioPut() {
    let id_usuario = document.getElementById("opcionesUsuariosPut").value
    return id_usuario
}

function getIdUsuarioDelete() {
    let id_usuario = document.getElementById("opcionesUsuariosDelete").value
    return id_usuario
}

function getTitlePost() {
    let title = document.getElementById("titlePost").value
    return title
}

function getTitlePut() {
    let title = document.getElementById("titlePut").value
    return title
}

function getGananciaPut() {
    let ganancia = document.getElementById("gananciaPut").value
    return ganancia
}

function getGananciaPost() {
    let ganancia = document.getElementById("gananciaPost").value
    return ganancia
}

function getVotoEspectadoresPut() {
    let voto_espectadores = document.getElementById("voto_espectadoresPut").value
    return voto_espectadores
}

function getVotoEspectadoresPost() {
    let voto_espectadores = document.getElementById("voto_espectadoresPost").value
    return voto_espectadores
}

function getAñoPut() {
    let año = document.getElementById("añoPut").value
    return año
}

function getAñoPost() {
    let año = document.getElementById("añoPost").value
    return año
}

function getLinkPut() {
    let link = document.getElementById("linkPut").value
    return link
}

function getLinkPost() {
    let link = document.getElementById("linkPost").value
    return link
}

function getUsernamePut() {
    let username = document.getElementById("usernamePut").value
    return username
}

function getUsernamePost() {
    let username = document.getElementById("usernamePost").value
    return username
}

function getPasswordAdminPut() {
    let password = document.getElementById("passwordPut").value
    return password
}

function getPasswordAdminPost() {
    let password = document.getElementById("passwordPost").value
    return password
}

function getRecordPut() {
    let record = document.getElementById("recordPut").value
    return record
}

function getRecordPost() {
    let record = document.getElementById("recordPost").value
    return record
}

// dom modals

const modalJugar = document.getElementById("modalJugar")//encuentra con el modalid el elemento //Accder al elemento
const modalRanking = document.getElementById("modalRanking")//encuentra con el modalid el elemento//Accder al elemento
const modalSesion1 = document.getElementById("modalSesion1")//encuentra con el modalid el elemento//Accder al elemento
const modalSesion2 = document.getElementById("modalSesion2")//encuentra con el modalid el elemento//Accder al elemento
const modalFinal = document.getElementById("modalFinal")//encuentra con el modalid el elemento//Accder al elemento
const modalAdmin = document.getElementById("modalAdmin")//encuentra con el modalid el elemento//Accder al elemento
const administerPelicula = document.getElementById("administerPelicula")//encuentra con el modalid el elemento//Accder al elemento
const administerUser = document.getElementById("administerUser")//encuentra con el modalid el elemento//Accder al elemento
const deletePeliculas = document.getElementById("borrarPelicula")//encuentra con el modalid el elemento//Accder al elemento
const putPeliculas = document.getElementById("modificarPelicula")//encuentra con el modalid el elemento//Accder al elemento
const postPeliculas = document.getElementById("agregarPelicula")//encuentra con el modalid el elemento//Accder al elemento
const deleteUsuarios = document.getElementById("borrarUsuario")//encuentra con el modalid el elemento//Accder al elemento
const putUsuarios = document.getElementById("modificarUsuario")//encuentra con el modalid el elemento//Accder al elemento
const postUsuarios = document.getElementById("agregarUsuario")//encuentra con el modalid el elemento//Accder al elemento

//modal cuenta1
function showModalCuenta() {
    if (id_user == -1 || id_user == undefined) {
        closeModalCuenta2()
        showModalCuenta1()
    } else {
        closeModalCuenta1()
        showModalCuenta2()
    }
}
function showModalCuenta1() {
    modalSesion1.showModal()
}
function closeModalCuenta1() {
    modalSesion1.close()
}
//modal cuenta2
function showModalCuenta2() {
    document.getElementById("userLogued").textContent = usernameLogued
    modalSesion2.showModal()
}
function closeModalCuenta2() {
    modalSesion2.close()
}


//modal ranking
function showModalRanking() {
    modalRanking.showModal()
}
function closeModalRanking() {
    modalRanking.close()
}

// MODAL JUGAR
function showModalPlay() {
    if (usernameLogued == "houses") {
        modalAdmin.showModal()
    } else {
        modalJugar.showModal()
    }
}

function closeModalPlay(){
    modalJugar.close()
}

function closeModalAdmin(){
    modalAdmin.close()
}

//modal admin

function openAdministerPelicula(){
    closemodalAdmin()
    administerPelicula.showModal()
}

function openAdministerUser(){
    closemodalAdmin()
    administerUser.showModal()
}
function openModalAdmin(){
    modalAdmin.showModal()
}
function closeAdministerPelicula(){
    administerPelicula.close()
}

function closeAdministerUser(){
    administerUser.close()
}
function closemodalAdmin(){
    modalAdmin.close()
}

async function openPutPeliculas(){
    administerPelicula.close()
    putPeliculas.showModal()
    await llenarDatosPeliculasPut()
}

function closeDeletePeliculas(){
    deletePeliculas.close()
}

async function openDeletePeliculas(){
    administerPelicula.close()
    deletePeliculas.showModal()
    await llenarDatosPeliculasDelete()
}

function closePutPeliculas(){
    putPeliculas.close()
}

function openPostPeliculas(){
    administerPelicula.close()
    postPeliculas.showModal()
}

function closePostPeliculas(){
    postPeliculas.close()
}

async function openDeleteUsuarios(){
    administerUser.close()
    deleteUsuarios.showModal()
    await llenarDatosUsuariosDelete()
}

function closeDeleteUsuarios(){
    deleteUsuarios.close()
}

async function openPutUsuarios(){
    administerUser.close()
    putUsuarios.showModal()
    await llenarDatosUsuariosPut()
}

function closePutUsuarios(){
    putUsuarios.close()
}

function openPostUsuarios(){
    administerUser.close()
    postUsuarios.showModal()
}

function closePostUsuarios(){
    postUsuarios.close()
}

//modal Final
function replaceandshowModalFinal(maxPoint, point) {
    document.getElementById("pointModalFinal").textContent = point
    document.getElementById("maxpointModalFinal").textContent = maxPoint
    showModalFinal()
}
function showModalFinal() {
    modalFinal.showModal()
}
function closeModalFinal() {
    modalFinal.close()
}

// dom index
async function changeScreen() {
    if (menu != 0) {
        document.getElementById("playPart").style.display = ''
        document.getElementById("mainMenu").style.display = 'none'
        menu = 0
    } else {
        await llenarDatosRanking()
        closeModalFinal()
        document.getElementById("mainMenu").style.display = ''
        document.getElementById("playPart").style.display = 'none'
        menu = 1
    }
}

function replaceSec1(peliculaSec1) {
    console.log(peliculaSec1[0].titulo)
    console.log(peliculaSec1[0])
    document.getElementById("namePeli1_0").innerHTML = peliculaSec1[0].titulo
    document.getElementById("namePeli1_1").innerHTML = peliculaSec1[0].titulo
    document.getElementById("namePeli1_0").style.backgroundImage = `url(${peliculaSec1[0].link})`
}
function replaceSec2(peliculaSec2) {
    document.getElementById("namePeli2_0").innerHTML = peliculaSec2[0].titulo
    document.getElementById("namePeli2_1").innerHTML = peliculaSec2[0].titulo
    document.getElementById("namePeli2_0").style.backgroundImage = `url(${peliculaSec2[0].link})`
}
function replacePoint() {
    document.getElementById("pointShow").innerHTML = point
}
function replaceCategory() {
    console.log("a")
    document.getElementById("categoryShow").innerHTML = parametro
}
