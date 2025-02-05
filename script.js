/**********************
 * Configuration Data *
 **********************/
// DOM Elements
const elements = {
  noBtn: document.getElementById('noBtn'),
  yesBtn: document.getElementById('yesBtn'),
  topImage: document.getElementById('topImage'),
  question: document.getElementById('question'),
  playMusic: document.getElementById('playMusic'),
  nameInput: document.getElementById('nameInput'),
  submitName: document.getElementById('submitName'),
  personalizedMessage: document.getElementById('personalizedMessage'),
  youtubeMusic: document.getElementById('youtubeMusic')
};

// Configuration
const config = {
  noMessages: [
    "Are you sure?",
    "Bby please?",
    "Don't do this to me :(",
    "You're breaking my heart!"
  ],
  secretMessages: [
    "I'll keep asking!",
    "You can't escape!",
    "My heart belongs to you!",
    "❤️ Forever yours ❤️"
  ],
  images: [
    "OIP.jpg",
    "download (1).jpg",
    "OIP (1).jpg",
    "OIP (2).jpg"
  ],
  currentNoIndex: 0,
  currentSecretIndex: 0,
  currentImageIndex: 0
};

// No Button Behavior
function handleNoButton() {
  // Update messages
  elements.noBtn.textContent = config.noMessages[config.currentNoIndex];
  config.currentNoIndex = (config.currentNoIndex + 1) % config.noMessages.length;
  
  // Random secret message
  if (Math.random() < 0.3) {
    elements.question.textContent = config.secretMessages[config.currentSecretIndex];
    config.currentSecretIndex = (config.currentSecretIndex + 1) % config.secretMessages.length;
  }
  
  // Change image
  config.currentImageIndex = (config.currentImageIndex + 1) % config.images.length;
  elements.topImage.src = config.images[config.currentImageIndex];
  
  // Move button
  const viewportWidth = window.innerWidth - elements.noBtn.offsetWidth;
  const viewportHeight = window.innerHeight - elements.noBtn.offsetHeight;
  elements.noBtn.style.position = "absolute";
  elements.noBtn.style.left = `${Math.random() * viewportWidth}px`;
  elements.noBtn.style.top = `${Math.random() * viewportHeight}px`;
}

// Yes Button Celebration
function handleYesButton() {
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 },
    colors: ['#FF69B4', '#FF1493', '#FFFFFF']
  });

  document.body.innerHTML = `
    <div class="celebration">
      <h1>🎉 YAY! I LOVE YOU! 🎉</h1>
      <img src="https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif" 
           alt="Celebration" 
           style="max-width: 300px; margin-top: 20px;">
    </div>
  `;
}

// Event Listeners
function initializeEventListeners() {
  // Button interactions
  elements.noBtn.addEventListener('mouseenter', handleNoButton);
  elements.noBtn.addEventListener('click', handleNoButton);
  elements.noBtn.addEventListener('touchstart', handleNoButton);
  
  elements.yesBtn.addEventListener('click', handleYesButton);
  
  // Music controls
  elements.playMusic.addEventListener('click', () => {
    elements.youtubeMusic.style.display = 'block';
    elements.playMusic.textContent = '🎵 Music Playing';
  });
  
  // Personalized message
  elements.submitName.addEventListener('click', () => {
    const name = elements.nameInput.value.trim();
    if (name) {
      elements.personalizedMessage.textContent = `💌 Dear ${name}, you make every moment magical! 💌`;
      elements.nameInput.value = '';
    } else {
      elements.personalizedMessage.textContent = 'Please enter your name first! 😊';
    }
  });
}

// Initialize App
function init() {
  initializeEventListeners();
}

// Start Application
document.addEventListener('DOMContentLoaded', init);
