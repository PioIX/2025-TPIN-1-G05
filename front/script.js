
//Funciones base
let peliculaSec1
let peliculaSec2
let parametro
let point
let id_user = -1
let usernameLogued
let menu = -1

function getRandomInt() {
    let random = Math.floor(Math.random() * 494);
    return random
}
async function selectRandomPeli(parametro) {
    let good = 0;
    while (good < 2) {
        let id = getRandomInt();
        let selection = await fetchGetPeliculas(id, parametro);
        console.log(selection)
        // Parametro dado ID y parametro a seleccionar.Parametro a espera TITLE, IMAGE_URL Y numero de categoria
        if (selection.length != 3) {
            console.log("a")
            return selection
        }
        good++
    }
    alert("ERROR 444", "Fallo de conexion con base de datos")
    return -1
}
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////


//seccion inicio

// elige y pone las peliculas iniciales
async function seleccionIncial() {
    point = 0
    peliculaSec1 = await selectRandomPeli(parametro);
    replaceSec1(peliculaSec1); //falta definir variable y UI // DOM
    peliculaSec2 = await selectRandomPeli(parametro);
    replaceSec2(peliculaSec2); //falta definir variable y UI // DOM
}

//prepara las variables para el juego luego de la seleccion
async function changeGame(buttonparametro) {
    if(id_user < 0){
        alert("Debes iniciar sesión para jugar")
        return
    }else{
        parametro = buttonparametro
        console.log(parametro)
        closeModalPlay()
        await seleccionIncial()
        replaceCategory()
        changeScreen()
    }

}
//prepara el juego devuelta
async function playAgain() {
    point =0
    replacePoint(point)
    await seleccionIncial()
    closeModalFinal()
}

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////


//seccion finalizo



//inicia la finalizacion luego de elegir
function buttonAnswer1() {
    answer(peliculaSec1)
}

function buttonAnswer2() {
    answer(peliculaSec2)
}

async function answer(selecctionAnswer) {
    if (peliculaSec1[0].parametro > peliculaSec2[0].parametro) {
        correctAnswer = peliculaSec1
    } else if (peliculaSec1[0].parametro < peliculaSec2[0].parametro) {
        correctAnswer = peliculaSec2
    } else {
        correctAnswer = "igual"
    }
    if (selecctionAnswer == correctAnswer || correctAnswer == "igual") {
        point++
        await replaceSelection()
    } else {
        let maxPoint = await fetchGetRecordPuntaje(id_user)
        console.log("maxPoint.record")
        console.log(maxPoint.record)
        // Parametro dado ID de user. Parametro a espera Max Points
        if (maxPoint.record < point) {
                maxPoint.record = point
                await fetchPutRecord(id_user, maxPoint.record)
            // Parametro dado ID de user y puntos max.
        }
        let tenPlace = await fetchGetUltimoMejorPuntaje()
        // Parametro recibe el decimo puesto de la tabla (puntaje)
        if (tenPlace[0].puntaje< point) {
            console.log("es mayor")
            await fetchPutModificarUltimoPuntaje(point,id_user)
            //parametro dado id del user y puntos maximos
        }
        replaceandshowModalFinal(maxPoint.record, point)
        showModalFinal()
    }
}

//cambia de posicion y busca nueva peli
async function replaceSelection() {
    replacePoint()
    peliculaSec1 = peliculaSec2
    replaceSec1(peliculaSec1); 
    peliculaSec2 = await selectRandomPeli(parametro);
    replaceSec2(peliculaSec2);
}
//Inicio de sesión
async function register() {
    let check = await fetchPostInsertUser(getUser(), getPassword())
    if (check.res[0].id_usuario > 0) {
        login()
    } else {
        alert("Error. Ese usuario ya existe, ingrese uno nuevo")
    }
}

async function login() {
    let check = await fetchGetUsersId(getUser(), getPassword())
    if (check[0].id_usuario > 0) {
        usernameLogued = check[0].username
        id_user = check[0].id_usuario
        alert("Iniciando sesion")
        showModalCuenta()
        await llenarDatosPersonal(id_user)
    } else if (check == "0") { //La función hecha en el back de usuarios conseguirá el usuario y la contraseña. Devolverá 0 o -1 si no funciona y el id de usuario si sí funciona
        alert("Error. No se ha ingresado correctamente la contraseña")
    } else if (check == "-1") {
        alert("Error. El usuario ingresado no existe")
    }
}

function closeAccount() {
    id_user = -1
    alert("Cerrando sesión")
    showModalCuenta()
    document.getElementById("inputUser").value = ""
    document.getElementById("inputPassword").value = ""
    document.getElementById("puntajePropio").innerText = "Inicia sesión para ver tu puntaje máximo"
}
