const envelope = document.getElementById("envelope");
const letter = document.getElementById("letter");
const paper = document.getElementById("paper-text");
const nextBtn = document.getElementById("nextBtn");
const indicator = document.getElementById("page-indicator");

let clickCount = 0;
let page = 0;

/* DATA */
const pages = [
  "Hai Chila... aku cuma mau bilang sesuatu yang mungkin gak pernah aku ungkapin.",
  "Kamu itu spesial. Kehadiran kamu berarti banget buat aku.",
  "Semoga kamu selalu bahagia... dan ini ada sesuatu kecil buat kamu 🎁"
];

/* TYPING */
let typing = false;
let currentText = "";
let i = 0;

function typeText(text) {
  paper.textContent = "";
  currentText = text;
  i = 0;
  typing = true;

  function loop() {
    if (i < text.length) {
      paper.textContent += text[i];
      i++;
      setTimeout(loop, 25);
    } else {
      typing = false;
    }
  }

  loop();
}

/* CLICK (ANTI GAGAL) */
envelope.onclick = function() {

  clickCount++;
  console.log("CLICK:", clickCount);

  // reset anim biar selalu jalan
  envelope.classList.remove("bounce");
  void envelope.offsetWidth;
  envelope.classList.add("bounce");

  if (clickCount >= 3) openLetter();
};

/* OPEN */
function openLetter() {

  envelope.style.opacity = "0";

  setTimeout(() => {
    envelope.style.display = "none";

    letter.classList.add("show");

    showPage();

    nextBtn.style.display = "block";
    indicator.style.display = "block";

  }, 400);
}

/* PAGE */
function showPage() {
  typeText(pages[page]);
  indicator.textContent = `${page + 1} / ${pages.length}`;
}

/* NEXT */
nextBtn.onclick = function() {

  if (typing) {
    paper.textContent = currentText;
    typing = false;
    return;
  }

  page++;

  if (page < pages.length) {
    showPage();
  } else {
    finish();
  }
};

/* END */
function finish() {

  // fade out biar smooth
  document.body.style.transition = "0.8s";
  document.body.style.opacity = "0";

  setTimeout(() => {
    window.location.href = "index4.html";
  }, 800);

}