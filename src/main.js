import { divideBaralho, criarTabuleiro, rodadas, setBotaoPular, setCampoEnergia, setSuaVez } from "./state.js";

const tabuleiro = document.getElementById('tabuleiro');


function game() {
    criarTabuleiro(tabuleiro);
    let campoJogadorFisico = document.getElementById('cartas_j2');
    let campoComputador = document.getElementById('mesa_j2');
    const botao = document.querySelector('button');
    const energia = document.querySelector('#energia > span');
    let rounds = document.querySelector('#round > span');
    let sua_vez = document.getElementById('sua_vez');
    divideBaralho(campoJogadorFisico, campoComputador);
    rodadas(rounds);
    setBotaoPular(botao);
    setCampoEnergia(energia);
    setSuaVez(sua_vez);
}


game();

