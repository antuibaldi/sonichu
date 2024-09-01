const divTablero = document.querySelector("#tablero");
const MAX_FILA = 20;
const MAX_COLUMNAS = 20;

const POS_INICIAL_COL = 3;
const POS_INICIAL_FIL = 3;

const POS_INICIAL_MAQUINA_COL = 10;
const POS_INICIAL_MAQUINA_FILA = 10;

const ARRIBA = "w";
const ABAJO = "s";
const IZQUIERDA = "a";
const DERECHA = "d";

let posJugador = [POS_INICIAL_FIL, POS_INICIAL_COL];
let posMaquina = [POS_INICIAL_MAQUINA_FILA, POS_INICIAL_MAQUINA_COL];
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

document.addEventListener("keydown", modificarPosJugador);

setInterval(() => {
    eliminarMaquina();
    moverMaquina();
    agregarMaquina(posMaquina[0], posMaquina[1]);
}, 100);

generarMatriz();
