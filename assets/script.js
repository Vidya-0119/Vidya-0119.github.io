// ----------------------
// Typewriter Effect
// ----------------------
const text = "Vidya Vardhini Kurada";
let i = 0;

function type() {
  if (i < text.length) {
    document.getElementById("hero-title").textContent += text.charAt(i);
    i++;
    setTimeout(type, 80);
  }
}
type();

// ----------------------
// Scroll Reveal
// ----------------------
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

document.querySelectorAll(".section").forEach(sec => observer.observe(sec));

// ----------------------
// Particle Background
// ----------------------
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const particles = Array.from({ length: 60 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 2 + 1,
  dx: (Math.random() - 0.5) * 0.5,
  dy: (Math.random() - 0.5) * 0.5
}));

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(200, 150, 255, 0.7)";
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });

  requestAnimationFrame(animate);
}
animate();

// ----------------------
// Card Tilt Interaction
// ----------------------
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.transform = `
      perspective(600px)
      rotateX(${-(y - rect.height / 2) / 20}deg)
      rotateY(${(x - rect.width / 2) / 20}deg)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0)";
  });
});

// ----------------------
// Dark Mode Toggle
// ----------------------
const toggle = document.getElementById("theme-toggle");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark"));
});

if (localStorage.getItem("theme") === "true") {
  document.body.classList.add("dark");
}
