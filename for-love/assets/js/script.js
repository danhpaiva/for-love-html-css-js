// 1. Configuração da data (Mês é 0-indexed: Agosto = 7)
const startDate = new Date(2023, 7, 24, 0, 0, 0);

// 2. Playlist de músicas
const playlist = [
  'audio/dengo.mp3',
  'audio/duasmetades.mp3',
  'audio/trevotu.mp3',
  'audio/umsonhador.mp3',
  'audio/porvoce.mp3',
  'audio/vocemefaz.mp3',
  'audio/sejapramim.mp3',
  'audio/coisalinda.mp3',
  'audio/amorSemMedida.mp3',
  'audio/pVcGuardeiOAmor.mp3'
];

// 3. Lista de frases de mimo
const mimos = [
  "Você é o meu melhor presente! ❤️",
  "Lembro do dia que te conheci no Boulevard 🏬",
  "Laicos ficou na nossa historia, ne??? 🎉",
  "Minha vida é mais colorida com você! ✨",
  "Cada segundo ao seu lado é um sonho! ☁️",
  "Você é a minha melhor escolha! 🌹",
  "Obrigado por ser meu porto seguro! ⚓",
  "Meu lugar favorito é dentro do seu abraço! 🤗",
  "Te amo o tanto que voce ama praia... 🏖️",
  "Tambem amo vc o tanto que voce ama chocolatudo... 🍫",
  "Te amo o tanto que voce gosta de 🍔",
  "Fico feliz só de pensar em você! 😊",
  "Você ilumina meus dias mais sombrios! 🌞",
  "Com você, cada momento é especial! 💖",
  "Você é a razão do meu sorriso! 😄",
  "Você é o meu dengo favorito! 🥰"
];

let heartsStarted = false; // Trava para não duplicar o efeito de corações

function updateTimer() {
  const now = new Date();
  const diff = now - startDate;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById('days').innerText = String(days).padStart(2, '0');
  document.getElementById('hours').innerText = String(hours).padStart(2, '0');
  document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
  document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
}

function createFloatingHeart() {
  const heart = document.createElement('div');
  heart.classList.add('floating-heart');
  heart.innerHTML = '❤️';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = Math.random() * 2 + 3 + 's';
  heart.style.fontSize = Math.random() * 10 + 15 + 'px';
  heart.style.opacity = Math.random() * 0.5 + 0.5;

  document.body.appendChild(heart);
  setTimeout(() => { heart.remove(); }, 5000);
}

document.getElementById('magicButton').addEventListener('click', (e) => {
  // Feedback visual no botão
  e.target.style.transform = "scale(0.95)";
  setTimeout(() => e.target.style.transform = "scale(1)", 100);

  // 1. Sorteio de Música
  const audio = document.getElementById('musica');
  const source = audio.querySelector('source');
  const randomMusic = playlist[Math.floor(Math.random() * playlist.length)];

  source.src = randomMusic;
  audio.load();
  audio.play().catch(error => console.log("Erro no áudio:", error));

  // 2. Sorteio de Frase (Mimo)
  const fraseSorteada = mimos[Math.floor(Math.random() * mimos.length)];
  e.target.innerText = fraseSorteada;

  // 3. Inicia corações apenas uma vez
  if (!heartsStarted) {
    setInterval(createFloatingHeart, 400);
    heartsStarted = true;
  }

  // 4. Explosão de confetes (sempre que clicar!)
  const duration = 2 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.8 },
      colors: ['#ff7675', '#fdcb6e']
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.8 },
      colors: ['#ff7675', '#fdcb6e']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
});

// Inicialização
setInterval(updateTimer, 1000);
updateTimer();