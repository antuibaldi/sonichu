const divTablero = document.querySelector("#tablero");
const MAX_FILA = 20;
const MAX_COLUMNAS = 20;

const POS_INICIAL_COL = 3;
const POS_INICIAL_FIL = 3;

const POS_INICIAL_MAQUINA_COL = 10;
const POS_INICIAL_MAQUINA_FILA = 10;

const POS_INICIAL_MONEDA_COL = 7;
const POS_INICIAL_MONEDA_FILA = 7;

const ARRIBA = "w";
const ABAJO = "s";
const IZQUIERDA = "a";
const DERECHA = "d";

let posJugador = [POS_INICIAL_FIL, POS_INICIAL_COL];
let posMaquina = [POS_INICIAL_MAQUINA_FILA, POS_INICIAL_MAQUINA_COL];
let posMoneda = [POS_INICIAL_MONEDA_FILA, POS_INICIAL_MONEDA_COL];
let cantCasillas = 0;

function generarMatriz() {
    cantCasillas = 0;
    divTablero.innerHTML = "";
    for (let fila = 0; fila < MAX_FILA; fila++) {
        divTablero.innerHTML += `
            <div class="row">
                ${agregarColumnas(fila)}
            </div>
        `;
    }
    agregarJugador(POS_INICIAL_FIL, POS_INICIAL_COL);
    agregarMaquina(POS_INICIAL_MAQUINA_FILA, POS_INICIAL_MAQUINA_COL);
    agregarMoneda(posMoneda[0], posMoneda[1]);
}

function agregarColumnas(fila) {
    let columnasGeneradasHtml = "";
    for (let columna = 0; columna < MAX_COLUMNAS; columna++) {
        columnasGeneradasHtml += `
            <div id="casilla-${fila}-${columna}" class="col fila">
            </div>
        `;
        cantCasillas++;
    }
    return columnasGeneradasHtml;
}

function checkCollision() {
    if (posJugador[0] === posMaquina[0] && posJugador[1] === posMaquina[1]) {
        alert("¡Colisión! La máquina ha atrapado al jugador.");
    }
}

function moverMaquina() {
    posMaquina[0] = Math.floor(Math.random() * MAX_FILA);
    posMaquina[1] = Math.floor(Math.random() * MAX_COLUMNAS);
    checkCollision();
}

function modificarPosJugador(event) {
    eliminarJugador();

    switch (event.key) {
        case ARRIBA:
            if (posJugador[0] > 0) posJugador[0]--;
            break;
        case ABAJO:
            if (posJugador[0] < MAX_FILA - 1) posJugador[0]++;
            break;
        case IZQUIERDA:
            if (posJugador[1] > 0) posJugador[1]--;
            break;
        case DERECHA:
            if (posJugador[1] < MAX_COLUMNAS - 1) posJugador[1]++;
            break;
    }

    agregarJugador(posJugador[0], posJugador[1]);
    checkCollision();
    checkMoneda();
}

function agregarJugador(fila, col) {
    let jugador = document.querySelector(`#casilla-${fila}-${col}`);
    jugador.innerHTML = `<img src="../img/sprit.gif" alt="jorgumo" id="sprit">`;
    jugador.classList.add("jugador");
}

function eliminarJugador() {
    let jugador = document.querySelector(`#casilla-${posJugador[0]}-${posJugador[1]}`);
    jugador.innerHTML = "";
    jugador.classList.remove("jugador");
}

function agregarMaquina(fila, col) {
    let maquina = document.querySelector(`#casilla-${fila}-${col}`);
    maquina.innerHTML = `<img src="../img/sprit2.gif" alt="jorgumo" id="sprit">`;
    maquina.classList.add("maquina");
}

function eliminarMaquina() {
    let maquina = document.querySelector(`#casilla-${posMaquina[0]}-${posMaquina[1]}`);
    maquina.innerHTML = "";
    maquina.classList.remove("maquina");
}

function agregarMoneda(fila, col) {
    let moneda = document.querySelector(`#casilla-${fila}-${col}`);
    moneda.innerHTML = `<img src="../img/moneda.png" alt="moneda" id="moneda">`;
    moneda.classList.add("moneda");
}

function eliminarMoneda() {
    let casilla = document.querySelector(
        `#casilla-${posMoneda[0]}-${posMoneda[1]}`
    );

    if (posJugador[0] === posMoneda[0] &&
        posJugador[1] === posMoneda[1]) {

        casilla.innerHTML = `<img src="../img/sprit.gif" alt="jugador" id="sprit">`;
    } else {
        casilla.innerHTML = "";
    }

    casilla.classList.remove("moneda");
}

function moverMoneda() {

    eliminarMoneda();

    do {
        posMoneda[0] = Math.floor(Math.random() * MAX_FILA);
        posMoneda[1] = Math.floor(Math.random() * MAX_COLUMNAS);

    } while (
        (posMoneda[0] === posJugador[0] && posMoneda[1] === posJugador[1]) ||
        (posMoneda[0] === posMaquina[0] && posMoneda[1] === posMaquina[1])
    );

    agregarMoneda(posMoneda[0], posMoneda[1]);
}
function checkMoneda() {

    if (
        posJugador[0] === posMoneda[0] &&
        posJugador[1] === posMoneda[1]
    ) {
        moverMoneda();
    }

}
document.addEventListener("keydown", modificarPosJugador);

setInterval(() => {
    eliminarMaquina();
    moverMaquina();
    agregarMaquina(posMaquina[0], posMaquina[1]);
}, 100);

generarMatriz();
