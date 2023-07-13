export const nomesCenarios = [
    'LugarNunhum',
    'FendaDoBikini',
    'CasaSimpsons'
]

export class Cenario {
    constructor(nome) {
        this.nome = nome;
        this.campoJogador = {
            nCartas: 0,
            somaPontuacao: 0
        };
        this.campoComputador = {
            nCartas: 0,
            somaPontuacao: 0
        };
    }

    jogadorComMaisPontos() {
        let dif = this.campoJogador.somaPontuacao - this.campoComputador.somaPontuacao;
        if (dif > 0)
            return "pessoa";
        else if (dif < 0)
            return "computador";
        return "empate";
    }
}