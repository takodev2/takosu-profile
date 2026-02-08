const audio = document.getElementById('bgm');
const card = document.getElementById('card');
const textElement = document.getElementById('typewriter');

const phrases = [
    "I do programming in my spare time",
    "Python beginner, HTML is pretty good",
    "Discord: @4bc6"
];

let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;

function start() {
    document.getElementById('enter-screen').classList.add('fade-out');
    card.classList.add('show');
    
    audio.volume = 0.3;
    audio.play().catch(error => {
        console.log("Play error:", error);
    });

    startTypewriter();
}

function startTypewriter() {
    const currentPhrase = phrases[phraseIdx];
    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIdx - 1);
        charIdx--;
    } else {
        textElement.textContent = currentPhrase.substring(0, charIdx + 1);
        charIdx++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === currentPhrase.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        speed = 500;
    }

    setTimeout(startTypewriter, speed);
}

document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 40;
    const y = (window.innerHeight / 2 - e.pageY) / 40;
    card.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`;
});
