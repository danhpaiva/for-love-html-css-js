// Configuração da data (Mês é 0-indexed: Agosto = 7)
const startDate = new Date(2023, 7, 24, 0, 0, 0);

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

// Função para criar corações flutuantes no fundo
function createFloatingHeart() {
  const heart = document.createElement('div');
  heart.classList.add('floating-heart');
  heart.innerHTML = '❤️';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = Math.random() * 2 + 3 + 's'; // Entre 3s e 5s
  heart.style.fontSize = Math.random() * 10 + 15 + 'px';
  heart.style.opacity = Math.random() * 0.5 + 0.5;

  document.body.appendChild(heart);

  // Remove o elemento após a animação para não sobrecarregar o site
  setTimeout(() => {
    heart.remove();
  }, 5000);
}

document.getElementById('magicButton').addEventListener('click', (e) => {
  // 1. Feedback visual no botão
  e.target.style.transform = "scale(0.95)";
  setTimeout(() => e.target.style.transform = "scale(1)", 100);

  // 2. Inicia a música
  const audio = document.getElementById('musica');
  audio.play().catch(error => console.log("Erro ao tocar áudio:", error));

  // 3. Chuva de corações contínua
  setInterval(createFloatingHeart, 400);

  // 4. Explosão de confetes
  const duration = 3 * 1000;
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

  // 5. Atualiza estado do botão
  e.target.innerText = "Você é o meu melhor presente! ❤️";
  e.target.disabled = true;
  e.target.style.cursor = "default";
});

// Atualiza o timer a cada segundo
setInterval(updateTimer, 1000);
updateTimer();