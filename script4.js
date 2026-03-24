const cards = document.querySelectorAll(".card");

/* SCROLL FIX (lebih akurat) */
function reveal() {
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();

    if (rect.top < window.innerHeight - 100) {
      card.classList.add("show");
      typing(card);
    }
  });
}

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);

/* ========================= */
/* TYPING FIX (ANTI RUSAK) */
/* ========================= */

function typing(card) {
  const el = card.querySelector(".typing");

  if (el.dataset.done) return;

  const text = el.textContent; // 🔥 pakai ini (AMAN)
  el.textContent = "";
  el.dataset.done = true;

  let i = 0;

  function type() {
    if (i < text.length) {
      el.textContent += text[i]; // 🔥 tidak hilang spasi
      i++;
      setTimeout(type, 20);
    }
  }

  type();
}

const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const music = document.getElementById("bgm");

startBtn.addEventListener("click", () => {

  // play music (100% pasti jalan karena klik)
  music.volume = 0.4;
  music.play().catch(()=>{});

  // fade out screen
  startScreen.classList.add("fade-out");

  setTimeout(() => {
    startScreen.style.display = "none";
  }, 800);

});
/* PARTICLES */
for (let i = 0; i < 20; i++) {
  const p = document.createElement("div");
  p.style.left = Math.random()*100+"%";
  p.style.animationDuration = (3+Math.random()*5)+"s";
  document.getElementById("particles").appendChild(p);
}

/* GIFT */
document.getElementById("gift").onclick = () => {
  alert("Hadiahnya Sedang Dikirim 📨📦");
};
