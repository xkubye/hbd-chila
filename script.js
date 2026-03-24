const dialogText = document.getElementById("dialog-text");
const choices = document.getElementById("choices");
const character = document.getElementById("character");

/* ========================= */
/* CONFIG */
/* ========================= */

let typing = false;
let currentText = "";
let index = 0;
let typingSpeed = 25;
let currentAudio = null;

/* ========================= */
/* AUDIO */
/* ========================= */

function playVoice(src) {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  currentAudio = new Audio(src);
  currentAudio.volume = 0.8;
  currentAudio.play().catch(() => {});
}

/* ========================= */
/* TYPING */
/* ========================= */

function typeText(text, voice = null) {
  dialogText.textContent = "";
  currentText = text;
  index = 0;
  typing = true;

  if (voice) playVoice(voice);

  function loop() {
    if (index < text.length) {
      dialogText.textContent += text[index];

      let delay = typingSpeed;
      if (text[index] === ".") delay = 200;
      if (text[index] === ",") delay = 100;

      index++;
      setTimeout(loop, delay);
    } else {
      typing = false;
    }
  }

  loop();
}

/* skip */
dialogText.addEventListener("click", () => {
  if (typing) {
    dialogText.textContent = currentText;
    typing = false;
    if (currentAudio) currentAudio.pause();
  }
});

/* ========================= */
/* ANIMATION */
/* ========================= */

function bounceChar() {
  character.classList.add("bounce");
  setTimeout(() => character.classList.remove("bounce"), 400);
}

/* ========================= */
/* FLOW SYSTEM */
/* ========================= */

function start() {
  character.src = "assets/normal.png";

  typeText("Hey, Kamu siapa??", "assets/conanv.mp3");

  choices.innerHTML = `
    <button onclick="chooseName('keyko')">Aku Jokowii!</button>
    <button onclick="chooseName('chila')">Chila yang imup</button>
  `;
}

/* STEP 1 */
function chooseName(name) {
  bounceChar();

  if (name === "chila") {
    character.src = "assets/happy.png";

    typeText(
      "Ohhh kamu chilaa yang imut itu ya?? Senang banget aku ketemu kamu!",
      "assets/conanv.mp3"
    );

    choices.innerHTML = `
      <button onclick="wrongAgain()">bukan deng</button>
      <button onclick="confirmChila()">iyaa aku chila, imup kan?</button>
    `;

  } else {
    wrongAnswer();
  }
}

/* SALAH */
function wrongAnswer() {
  character.src = "assets/disagree.png";

  typeText("Hmm... kamu bukan orang yang aku cari 😐", "assets/conanv.mp3");

  choices.innerHTML = `
    <button onclick="start()">Coba lagi</button>
  `;
}

/* STEP 2 */
function wrongAgain() {
  bounceChar();
  wrongAnswer();
}

function confirmChila() {
  bounceChar();

  character.src = "assets/happy.png";

  typeText(
    "Hehe, tentu saja! Kamu memang chila yang imut 😄",
    "assets/conanv.mp3"
  );

  choices.innerHTML = `
    <button onclick="nextQuestion()">mau apa nih?</button>
  `;
}

/* STEP 3 */
function nextQuestion() {
  bounceChar();

  character.src = "assets/normal.png";

  typeText(
    "Aku punya sesuatu yang spesial buat kamu...",
    "assets/conanv.mp3"
  );

  choices.innerHTML = `
    <button onclick="excited()">beneran nih?</button>
  `;
}

/* STEP 4 */
function excited() {
  bounceChar();

  character.src = "assets/happy.png";

  typeText(
    "Tentu saja! Ayo ikut aku, kita mulai sekarang!",
    "assets/conanv.mp3"
  );

  choices.innerHTML = `
    <button onclick="endPart()">Ayo</button>
  `;
}

/* END */
function endPart() {
  bounceChar();

  typeText("Menuju ke kejutan spesial... 🎁");

  choices.innerHTML = "";

  setTimeout(() => {
    window.location.href = "index2.html";
  }, 1500);
}

/* START */
window.onload = start;

/* ========================= */
/* LOADING SYSTEM */
/* ========================= */

window.addEventListener("load", () => {
  const loader = document.getElementById("loading-screen");

  setTimeout(() => {
    loader.classList.add("fade-out");
  }, 1000); // durasi loading (1 detik)
});