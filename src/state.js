import { auxCriaTabuleiro, divideCartas, criaCarta, decideJogada, verificaDisponibilidadeDeCartas, fimDeJogo } from "./utils.js";
import { Jogador } from "./jogador.js";
import { Cenario, nomesCenarios } from "./cenario.js";

// DEFINE OS JOGADORES
let jogadorFisico = new Jogador('pessoa');
let jogadorComputador = new Jogador('computador');

// DEFINE OS CENARIOS
const cenarios = [];

// DONO DO TURNO
let JOGANDO_AGORA = 'pessoa';

// Rodada
let marcadorRodada;
let marcadorEnergia;
let FIM_JOGADA;
let divJogadorFisico;
let sua_vez;
let botaoPular;
let RODADA = 1;
// Troca o turno



let cartaJogada = null;
function comprarCarta(jogador, inicio, campoJogador = null) {
    let infoCarta = jogador.compraCarta(inicio);
    if (campoJogador != null) {
        let carta = criaCarta(infoCarta);
        carta.addEventListener('dragstart', arrastando);
        carta.dataset.owner = jogador.tipo;
        campoJogador.appendChild(carta);
    }
}

function arrastando(event) {
    cartaJogada = event.target;
}

function podePassarAVez(cartas, energia) {
    let cartasDisponiveis = verificaDisponibilidadeDeCartas(cartas, energia);
    if (cartasDisponiveis == null) {
        FIM_JOGADA = true;
    }
}

function mudaRodada() {
    if (RODADA < 6) {
        FIM_JOGADA = false;
        RODADA += 1;
        marcadorRodada.innerText = RODADA;
        marcadorEnergia.innerText = RODADA;
        jogadorFisico.energia = RODADA;
        jogadorComputador.energia = RODADA;
        comprarCarta(jogadorFisico, false, divJogadorFisico);
        comprarCarta(jogadorComputador, false);
    }
}

function adicionaCartaEmCampo(carta, idCenario) {
    let campo = document.querySelectorAll('#C' + idCenario + ' .computador')[0];
    let novaCarta = criaCarta(carta);
    novaCarta.draggable = false;
    novaCarta.dataset.owner = "computador";
    campo.appendChild(novaCarta);
}

function computadorJoga() {
    if (RODADA <= 6) {
        setTimeout(function () {
            let cartasLivres = verificaDisponibilidadeDeCartas(jogadorComputador.cartas_na_mao, jogadorComputador.energia)
            // SÓ JOGA SE POSSUIR CARTAS COMPATIVEIS COM A ENERGIA
            if (cartasLivres) {
                let cartaECenario = decideJogada(structuredClone(cenarios), cartasLivres);
                let carta = cartaECenario.carta_escolhida;
                let idCenario = cartaECenario.cenario_escolhido;
                // FAZ O COMPUTADOR PULAR QUANDO NÃO CONSEGUIR JOGAR MAIS
                if (carta.custo == jogadorComputador.energia) {
                    FIM_JOGADA = true;
                }
                adicionaCartaEmCampo(carta, idCenario);
                fezJogada(cenarios[idCenario].campoComputador, carta, jogadorComputador)
                podePassarAVez(jogadorComputador.cartas_na_mao, jogadorComputador.energia);
                if (FIM_JOGADA == false) {
                    computadorJoga();
                }
            }
            else {
                FIM_JOGADA = true;
            }
            mudaTurno();
        }, 2000);
    }
}

// event para o caso da função ser disparada pelo botão
function mudaTurno(event = null) {
    if (FIM_JOGADA || event != null) {
        if (JOGANDO_AGORA == 'pessoa') {
            JOGANDO_AGORA = 'computador';
            sua_vez.innerText = ""
            computadorJoga();
        } else {
            if (RODADA < 6)
                sua_vez.innerText = "Sua Vez"
            mudaRodada();
            JOGANDO_AGORA = 'pessoa';
        }
    }
}

function fezJogada(cenario, carta, jogador) {
    cenario.nCartas += 1;
    let forca = Number(carta.forca);
    cenario.somaPontuacao += Number(forca);

    jogador.jogaCarta(carta.nome);
    jogador.energia -= Number(carta.custo);
    if (JOGANDO_AGORA == "pessoa") {
        marcadorEnergia.innerText = jogador.energia;
    }
    if (jogador.energia == 0)
        FIM_JOGADA = true;
    else FIM_JOGADA = false;
    if (RODADA == 6 && JOGANDO_AGORA == 'computador') {
        fimDeJogo(jogadorFisico, jogadorComputador, cenarios);
    }
}

function arrastaCartaParaOCampo(event) {
    let c = event.target.dataset.cenario;
    let j = event.target.dataset.jogador;
    if (cartaJogada && event.target.classList.contains('campo')) {
        if (Number(cartaJogada.dataset.energia) <= jogadorFisico.energia) {
            if (j === JOGANDO_AGORA && j === cartaJogada.dataset.owner) {
                event.target.appendChild(cartaJogada);
                fezJogada(cenarios[c].campoJogador, Object(cartaJogada.dataset), jogadorFisico);
                cartaJogada.draggable = false;
                cartaJogada = null;
                // verifica se ainda tem carta para jogar
                podePassarAVez(jogadorFisico.cartas_na_mao, jogadorFisico.energia)
                mudaTurno();
            }
        }
    }
}


export function divideBaralho(campoJogadorFisico) {
    divJogadorFisico = campoJogadorFisico;
    jogadorFisico.cartas_no_baralho = divideCartas();
    jogadorComputador.cartas_no_baralho = divideCartas();
    for (let i = 0; i < 4; i++) {
        comprarCarta(jogadorFisico, true, campoJogadorFisico);
        comprarCarta(jogadorComputador, true);
    }
}

export function criarTabuleiro(tabuleiro) {
    for (let i = 0; i < 3; i++) {
        let nomeCenario = nomesCenarios[i];
        let elementos = auxCriaTabuleiro(tabuleiro);
        elementos.img.style.backgroundImage = `url('../images/${nomeCenario}.jpg')`
        elementos.campo.addEventListener('drop', arrastaCartaParaOCampo);
        elementos.campo2.addEventListener('drop', arrastaCartaParaOCampo);
        elementos.campo.dataset.cenario = i;
        elementos.campo.dataset.jogador = 'computador'
        elementos.campo2.dataset.cenario = i;
        elementos.campo2.dataset.jogador = 'pessoa'
        elementos.cenario.setAttribute('id', `C${i}`);
        elementos.cenario.appendChild(elementos.campo);
        elementos.cenario.appendChild(elementos.img);
        elementos.cenario.appendChild(elementos.campo2);
        elementos.cenario.dataset.nome = nomeCenario;
        tabuleiro.appendChild(elementos.cenario);

        let c = new Cenario(nomeCenario);
        cenarios.push(c);
    }
}

export function rodadas(rounds) {
    marcadorRodada = rounds;
}

export function setCampoEnergia(e) {
    marcadorEnergia = e;
}
export function setBotaoPular(b) {
    botaoPular = b;
    botaoPular.addEventListener('click', mudaTurno);
}
export function setSuaVez(vez) {
    sua_vez = vez;
}