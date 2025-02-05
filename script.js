/**********************
 * Configuration Data *
 **********************/
const noButtonMessages = [
  "are you sure?",
  "bby please?",
  "Don't do this to me :(",
  "you're breaking my heart TvT"
];
let noMessageIndex = 0;

const secretMessages = ["I'll keep asking!", "You can't escape!", "❤️"];
let secretMessageIndex = 0;

const imageArray = [
  "454715500_1145191403225797_7536756696049058955_n.jpg",
  "455025337_476367281817781_1421241229018967998_n.jpg",
  "455071218_1064163268705080_1772528308917382692_n.jpg",
  "WhatsApp Image 2025-02-05 at 10.06.44 PM.jpeg"
];
let imageIndex = 0;

// Preload images
imageArray.forEach(url => {
  const img = new Image();
  img.src = url;
});

/****************************
 * DOM Elements References  *
 ****************************/
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const topImage = document.getElementById("topImage");
const nameInput = document.getElementById("nameInput");
const submitName = document.getElementById("submitName");
const personalizedMessage = document.getElementById("personalizedMessage");

// Create an Audio Context for sound effects
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

/****************************
 * Sound Effect Function    *
 ****************************/
function playSound(frequency) {
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscillator.type = "sine";
  oscillator.frequency.value = frequency;
  oscillator.start();
  gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.2);
  oscillator.stop(audioCtx.currentTime + 0.2);
}

/****************************
 * No Button Behavior Setup *
 ****************************/
function moveNoButton() {
  noBtn.textContent = noButtonMessages[noMessageIndex];
  noMessageIndex = (noMessageIndex + 1) % noButtonMessages.length;
  
  if (Math.random() < 0.3) {
    document.getElementById("question").textContent = secretMessages[secretMessageIndex];
    secretMessageIndex = (secretMessageIndex + 1) % secretMessages.length;
  } else {
    document.getElementById("question").textContent = "Will you be my valentine bby ?";
  }

  imageIndex = (imageIndex + 1) % imageArray.length;
  topImage.src = imageArray[imageIndex];

  playSound(300);

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  noBtn.style.position = "absolute";
  noBtn.style.left = Math.random() * (vw - noBtn.offsetWidth) + "px";
  noBtn.style.top = Math.random() * (vh - noBtn.offsetHeight) + "px";
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("click", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton);

yesBtn.addEventListener("click", () => {
  playSound(600);
  confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

  document.body.innerHTML = `
    <div class="celebration">
      <h1>🎉 YAY! I LOVE YOU! 🎉</h1>
      <img src="https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif">
    </div>
  `;
});

submitName.addEventListener("click", () => {
  const name = nameInput.value.trim();
  if (name) {
    personalizedMessage.textContent = `Dear ${name}, you make my heart flutter! ❤️`;
  }
});
