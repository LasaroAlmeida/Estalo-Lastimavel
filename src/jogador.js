import { numerosAleatorios } from "./utils.js"

export class Jogador {
    constructor(tipo) {
        this.tipo = tipo;
        this.forca_locais = [0, 0, 0];
        this.cartas_no_baralho = null;
        this.cartas_na_mao = [];
        this.energia = 1;
    }

    compraCarta(inicio) {
        let baralho = Object(this.cartas_no_baralho)
        let id = 0;
        if (inicio) {
            id = numerosAleatorios(2);
        } else {
            id = numerosAleatorios(baralho.length);
        }
        let carta = this.cartas_no_baralho[id]
        this.cartas_na_mao.push(carta);
        baralho.splice(id, 1);
        return carta;
    }

    incrementaForcaLocal(id, valor) {
        this.forca_locais[id] += valor;
    }

    jogaCarta(nomeCarta) {
        this.cartas_na_mao = this.cartas_na_mao.filter(carta => carta.nome != nomeCarta);
    }
    totalForcas(){
        let total = 0;
        this.forca_locais.forEach(forcas => total += forcas);
        return total;
    }
}

