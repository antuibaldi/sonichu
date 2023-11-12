const divTablero = document.querySelector("#tablero");
const MAX_FILA = 20;
const MAX_COLUMNAS = 20;


let cantCasillas = 0;

function generarMatriz() {
    cantCasillas = 0;
    divTablero.innerHTML = "";    
    for (let fila = 0; fila < MAX_FILA; fila++) {
        /* matriz.push([])    */ 
        divTablero.innerHTML += `
            <div class="row">
                ${ agregarColumnas() }
            </div>
        `
    }
}

function agregarColumnas() {
    let columnasGeneradasHtml = "";
    for (let columna = 0; columna < MAX_COLUMNAS; columna++) {
        columnasGeneradasHtml += `
                <div id="negra" onclick="detectar(this)" class="fila">
                </div>
            `;

        cantCasillas++;
    }
    cantCasillas++;
    return columnasGeneradasHtml;
}

generarMatriz();