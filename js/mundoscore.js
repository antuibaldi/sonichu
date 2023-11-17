const divTablero = document.querySelector("#tablero");
const MAX_FILA = 20;
const MAX_COLUMNAS = 20;

const POS_INICIAL_COL = 3;
const POS_INICIAL_FIL = 3;

const ARRIBA = "w";
const ABAJO = "s";
const IZQUIERDA = "a";
const DERECHA = "d";

let posJugador = [POS_INICIAL_FIL, POS_INICIAL_COL];
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
}

function agregarColumnas(fila) {
    let columnasGeneradasHtml = "";
    for (let columna = 0; columna < MAX_COLUMNAS; columna++) {
        columnasGeneradasHtml += `
            <div id="casilla-${fila}-${columna}" onclick="detectar(this)" class="col fila">
            </div>
        `;
        cantCasillas++;
    }
    return columnasGeneradasHtml;
}

function modificarPosJugador(event) {
    eliminarJugador();

    switch (event.key) {
        case ARRIBA:
            posJugador[0]--;
            break;
        case ABAJO:
            posJugador[0]++;
            break;
        case IZQUIERDA:
            posJugador[1]--;
            break;
        case DERECHA:
            posJugador[1]++;
            break;
    }

    agregarJugador(posJugador[0], posJugador[1]);
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

document.addEventListener("keydown", modificarPosJugador);

generarMatriz();
