let text = document.getElementById("text");
let energyDisplay = document.getElementById("energy");

let energy = 100;
let timer;
let timeLeft = 10;

/* =========================
   ⚡ ENERGIA
========================= */

function updateEnergy(value) {
  energy += value;
  energyDisplay.innerText = energy;

  if (energy <= 0) {
    text.innerHTML = "💀 O laboratório entrou em colapso...";
  }

  if (energy >= 200) {
    text.innerHTML = "🧬 Você se fundiu ao laboratório...";
  }
}

/* =========================
   🎮 JOGO PRINCIPAL
========================= */

function choice(option) {

  if (option === 1) {
    text.innerHTML = "⚡ O laboratório reage... algo acorda abaixo do chão.";
    updateEnergy(-10);

    document.getElementById("choices").innerHTML = `
      <button onclick="choice(3)">Investigar 🧪</button>
      <button onclick="choice(4)">Recuar 🚪</button>
    `;
  }

  if (option === 2) {
    text.innerHTML = "🐟 Uma criatura híbrida te observa em silêncio...";

    updateEnergy(-5);

    document.getElementById("choices").innerHTML = `
      <button onclick="choice(5)">Aproximar 🐟</button>
      <button onclick="choice(4)">Fugir ⚠️</button>
    `;
  }

  if (option === 3) {
    text.innerHTML = "🧪 Algo te observa... e parece reconhecer você.";

    updateEnergy(-15);

    document.getElementById("choices").innerHTML = `
      <button onclick="choice(6)">Tentar comunicação 🤖</button>
      <button onclick="choice(4)">Correr 🚨</button>
    `;
  }

  if (option === 4) {
    text.innerHTML = "Você corre... mas o laboratório muda de forma.";
    document.getElementById("choices").innerHTML = `
      <button onclick="location.reload()">Recomeçar 🔁</button>
    `;
  }

  if (option === 5) {
    text.innerHTML = `
      🐟 A criatura híbrida não te ataca...<br>
      Ela apenas observa você com curiosidade.
    `;

    updateEnergy(+10);

    document.getElementById("choices").innerHTML = `
      <button onclick="choice(6)">Tentar comunicação 🤖</button>
      <button onclick="choice(4)">Recuar 🚪</button>
    `;
  }

  if (option === 6) {
    text.innerHTML = "🧬 O laboratório aceita você... algo mudou.";

    updateEnergy(+20);

    document.getElementById("choices").innerHTML = `
      <button onclick="novoCiclo()">Novo ciclo 🔁</button>
    `;
  }
}

/* =========================
   🧬 NOVO CICLO
========================= */

function novoCiclo() {
  text.innerHTML = `
    🧬 O laboratório reiniciou...<br><br>
    Uma porta trancada aparece.<br>
    Um painel pisca com números apagados.<br><br>
    💡 Mensagem: "Padrões simples salvam vidas"
  `;

  document.getElementById("choices").innerHTML = `
    <button onclick="puzzle1()">Inserir código 🔐</button>
    <button onclick="puzzleHint()">Ver pistas 🔎</button>
  `;
}

/* =========================
   ⏱️ TIMER
========================= */

function startTimer(onFail) {
  clearInterval(timer);
  timeLeft = 10;

  let clockExists = document.getElementById("clock");

  if (!clockExists) {
    text.innerHTML += `<br><br>⏱️ Tempo: <span id="clock">10</span>s`;
  }

  timer = setInterval(() => {
    timeLeft--;

    let clock = document.getElementById("clock");
    if (clock) clock.innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      onFail();
    }
  }, 1000);
}

/* =========================
   🔐 PUZZLE 1
========================= */

function puzzle1() {

  text.innerHTML = `
    🔐 PAINEL DO LABORATÓRIO<br><br>

    💡 Pista 1: 2 + 3 = ?<br>
    💡 Pista 2: 4 - 1 = ?<br>
    💡 Pista final: junte os resultados<br><br>

    Digite no prompt:
  `;

  startTimer(() => {
    text.innerHTML = "⏱️ Tempo esgotado... o laboratório bloqueou o acesso.";
    novoCiclo();
  });

  let resposta = prompt("Código: 2+3 e 4-1 (junte os resultados)");

  clearInterval(timer);

  if (resposta === "53") {
    text.innerHTML = "✔ Código aceito... uma nova sala abre.";
    puzzle2();
  } else {
    text.innerHTML = "❌ Código errado... o laboratório reage.";
  }
}

/* =========================
   🔎 PISTAS
========================= */

function puzzleHint() {
  text.innerHTML = `
    🔎 PISTAS:<br><br>
    • 2 + 3 = ?<br>
    • 4 - 1 = ?<br>
    • depois junte os números<br><br>
    💡 Exemplo: resultado1 = resultado2
  `;
}

/* =========================
   ⚡ PUZZLE 2
========================= */

function puzzle2() {
  text.innerHTML = "⚡ Vermelho, Azul e Verde. Escolha rápido!";

  document.getElementById("choices").innerHTML = `
    <button onclick="finalPuzzle('vermelho')">Vermelho</button>
    <button onclick="finalPuzzle('azul')">Azul</button>
    <button onclick="finalPuzzle('verde')">Verde</button>
  `;

  startTimer(() => {
    text.innerHTML = "⏱️ O laboratório embaralhou as luzes...";
    novoCiclo();
  });
}

/* =========================
   🧠 FINAL PUZZLE
========================= */

function finalPuzzle(cor) {

  if (cor === "azul") {
    text.innerHTML = "🧪 O núcleo responde... você entendeu o laboratório.";

    document.getElementById("choices").innerHTML = `
      <button onclick="trueEnding()">Entrar no núcleo 🧬</button>
    `;
  } else {
    text.innerHTML = "⚠ O laboratório se reorganiza...";
    novoCiclo();
  }
}

/* =========================
   🌟 FINAL VERDADEIRO
========================= */

function trueEnding() {
  text.innerHTML = "✨ Você agora é parte do sistema.";

  document.getElementById("choices").innerHTML = `
    <button onclick="location.reload()">Recomeçar 🔁</button>
  `;
}