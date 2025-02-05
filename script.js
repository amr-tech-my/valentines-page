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
  "https://via.placeholder.com/150/FF0000/FFFFFF?text=Image+1",
  "https://via.placeholder.com/150/00FF00/FFFFFF?text=Image+2",
  "https://via.placeholder.com/150/0000FF/FFFFFF?text=Image+3",
  "https://via.placeholder.com/150/FFFF00/FFFFFF?text=Image+4"
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
