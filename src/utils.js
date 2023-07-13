import { getBaralho } from "./baralho.js";

function rand(max) {
    return Math.floor(Math.random() * max);
}


export function criaCarta(infoCarta) {
    let carta = document.createElement('div');
    carta.classList.add('carta');
    carta.draggable = true;
    carta.dataset.nome = infoCarta.nome;
    carta.dataset.custo = infoCarta.custo;
    carta.dataset.energia = infoCarta.energia;
    carta.dataset.forca = infoCarta.forca;
    carta.style.backgroundImage = `url('../images/${infoCarta.nome}.png')`
    return carta;
}
// gera qt numero de 0 a max. Retorna uma lista ou um único elemento
export function numerosAleatorios(max = 1, qt = 1, list = false) {
    if (list) {
        let numbers = [-1];
        if (max >= qt) {
            for (let i = 0; i < qt;) {
                let r = rand(max);
                if (!numbers.includes(r)) {
                    numbers.push(r);
                    i++;
                }
            }
            return numbers.slice(1, numbers.length);
        }
        return -1;
    }
    else {
        return rand(max);
    }
}

export function divideCartas() {
    const baralho = getBaralho();
    let cartasPadrao = baralho.slice(0, 10);
    let cartasAltas = baralho.slice(10, 14);
    let cartasJogador = cartasPadrao;
    let indCartasAltas = numerosAleatorios(4, 2, true)
    cartasJogador.push(cartasAltas[indCartasAltas[0]])
    cartasJogador.push(cartasAltas[indCartasAltas[1]])
    return cartasJogador;
}

export function auxCriaTabuleiro() {
    let elementos = {}
    elementos.cenario = document.createElement("div");
    elementos.campo = document.createElement("div");
    elementos.img = document.createElement("div");
    elementos.campo2 = document.createElement("div");
    elementos.campo.classList.add('campo');
    elementos.campo.classList.add('computador');
    elementos.campo2.classList.add('campo');
    elementos.campo2.classList.add('pessoa');
    elementos.img.classList.add('imagem');
    elementos.cenario.classList.add('cenarios');
    elementos.campo.addEventListener('dragover', (e) => { e.preventDefault(); });
    elementos.campo2.addEventListener('dragover', (e) => { e.preventDefault(); });
    return elementos;
}

export function decideJogada(cenarios, cartas) {
    let cenariosLivres = cenarios.filter(c => c.campoComputador.nCartas < 4);
    let cenario_escolhido = rand(cenariosLivres.length)
    let ct = rand(cartas.length)
    let carta_escolhida = cartas[ct];
    return { carta_escolhida, cenario_escolhido }
}


export function verificaDisponibilidadeDeCartas(cartas, energia) {
    let cartasDisponiveis = cartas.filter(carta => carta.custo <= energia);
    return (cartasDisponiveis.length > 0) ? cartasDisponiveis : null;
}


function verificaVencedor(cenarios) {
    let vitoriasJogador = 0, vitoriasComputador = 0;
    cenarios.forEach(function (c) {
        let win = c.jogadorComMaisPontos();
        if (win == 'pessoa') {
            vitoriasJogador += 1;
        }
        else if (win == 'computador') {
            vitoriasComputador++;
        }
    })
    let dif = vitoriasJogador - vitoriasComputador;
    if (dif == 0)
        return 'empate'
    else if (dif > 0)
        return 'Você Venceu!';
    return 'Você Perdeu!';
}

export function fimDeJogo(jogadorFisico, jogadorComputador, cenarios) {
    console.log("FIM DE JOGO. GANHADOR: ")
    let resultado = verificaVencedor(cenarios)
    if (resultado == "empate") {
        let forcaJF = jogadorFisico.totalForcas();
        let forcaJC = jogadorComputador.totalForcas()
        if ((forcaJF == forcaJC) || (forcaJF < forcaJC))
            resultado = "Você Perdeu!"
        else {
            resultado = "Você Venceu!"
        }
    }
    console.log(resultado)
    setTimeout(function () {
        window.location.href = "fim_de_jogo.html?" + resultado;
        // console.log(resultado)
    }, 5000);
}
