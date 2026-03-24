const dialogText = document.getElementById("dialog-text");
const choices = document.getElementById("choices");
const character = document.getElementById("character");
const nameBox = document.getElementById("name-box");

/* CONFIG */
let typing = false;
let currentText = "";
let index = 0;
let typingSpeed = 25;
let currentAudio = null;

/* AUDIO */
function playVoice(src) {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  currentAudio = new Audio(src);
  currentAudio.volume = 0.8;
  currentAudio.play().catch(()=>{});
}

/* TYPING */
function typeText(text, voice=null) {
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

      index++;
      setTimeout(loop, delay);
    } else {
      typing = false;
    }
  }

  loop();
}

/* SKIP */
dialogText.addEventListener("click", () => {
  if (typing) {
    dialogText.textContent = currentText;
    typing = false;
    if (currentAudio) currentAudio.pause();
  }
});

/* BOUNCE */
function bounceChar() {
  character.classList.add("bounce");
  setTimeout(()=>character.classList.remove("bounce"),400);
}

/* ================= */
/* FLOW */
/* ================= */

function start() {
  nameBox.textContent = "Conan";
  character.src = "assets/normal.png";

  typeText("Hai, Haibara.", "assets/conanv.mp3");

  choices.innerHTML = `<button onclick="next1()">...</button>`;
}

function next1() {
  bounceChar();

  nameBox.textContent = "Haibara";
  character.src = "assets/normal2.png";

  typeText("Hai... ada apa?", "assets/haibv.mp3");

  choices.innerHTML = `<button onclick="next2()">...</button>`;
}

function next2() {
  bounceChar();

  nameBox.textContent = "Conan";
  character.src = "assets/normal.png";

  typeText("Aku membawa seseorang... Chila.", "assets/conanv.mp3");

  choices.innerHTML = `<button onclick="next3()">...</button>`;
}

function next3() {
  bounceChar();

  nameBox.textContent = "Haibara";
  character.src = "assets/happy2.png";

  typeText("Eh!? Chila yang imut itu...? Aku senang bertemu denganmu...", "assets/haibv.mp3");

  choices.innerHTML = `
    <button onclick="good()">senang bertemu denganmu juga</button>
    <button onclick="bad()">apasi sok asik</button>
  `;
}

/* BAD */
function bad() {
  bounceChar();

  nameBox.textContent = "Haibara";
  character.src = "assets/sad.png";

  typeText("...oh, maaf kalau aku mengganggu.");

  choices.innerHTML = `<button onclick="fix()">...</button>`;
}

function fix() {
  bounceChar();

  nameBox.textContent = "Conan";
  character.src = "assets/disagree.png";

  typeText("Oi... jangan gitu. Jawab yang benar dong.", "assets/conanv.mp3");

  choices.innerHTML = `<button onclick="good()">senang bertemu denganmu juga</button>`;
}

/* GOOD */
function good() {
  bounceChar();

  nameBox.textContent = "Haibara";
  character.src = "assets/happy2.png";

  typeText("Hehe... aku senang sekali. Kamu baik banget.", "assets/haibv.mp3");

  choices.innerHTML = `<button onclick="giveBook()">Hehehe</button>`;
}

/* BOOK */
function giveBook() {
  bounceChar();

  nameBox.textContent = "Haibara";
  character.src = "assets/normal2.png";

  typeText("Ini... aku punya sesuatu untukmu. Sebuah surat.");

  choices.innerHTML = `<button onclick="nextPart()">ambil surat</button>`;
}

function nextPart() {
  window.location.href = "index3.html";
}

/* START */
window.onload = start;

/* LOADING */
window.addEventListener("load", () => {
  const loader = document.getElementById("loading-screen");

  setTimeout(() => {
    loader.classList.add("fade-out");
  }, 1200);
});