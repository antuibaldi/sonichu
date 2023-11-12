const imagenSonichu= document.querySelector("#imagen-sonicchu");
const IMAGEN_SONICHU_COMIENDO= `${/img/sonicchucomiendo.jpg}`

class SonicChu {
    #alimentarse;
    #respondeTrols;
    #subirDeNivel;
    alimento=1000

    constructor (alimentarse =0, respondeTrols =0, subirDeNivel = 0){
        this.#alimentarse = alimentarse;
        this.#respondeTrols = respondeTrols;
        this.#subirDeNivel = subirDeNivel;
    }
 
    setNombre(alimentarse) {
        this.#alimentarse = alimentarse;
    }
    getNombre() {
        return this.#alimentarse;
    }
    setRoto(respondeTrols) {
        this.#respondeTrols = respondeTrols;
    }
    getRoto() {
        return this.#respondeTrols;
    }

    setNafta(subirDeNivel){
        this.#subirDeNivel =subirDeNivel;
    }

    getNafta(){
        return this.#subirDeNivel;
    }
    darAlimento()
    {
        if(alimentarse<10 && alimento>0){
          imagenSonichu.innerHTML+=`${IMAGEN_SONICHU_COMIENDO}`
        }
    }
}