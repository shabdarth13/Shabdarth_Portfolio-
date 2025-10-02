// -------------------
// Contact Form Handler
// -------------------
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function () {
    // Create thank you message
    const thankYou = document.createElement("div");
    thankYou.id = "thankYouMessage";
    thankYou.innerHTML = "✅ Thank you! Your message has been sent.";
    thankYou.style.color = "limegreen";
    thankYou.style.textAlign = "center";
    thankYou.style.marginTop = "15px";
    thankYou.style.fontSize = "1.1em";

    // Insert after form
    this.insertAdjacentElement("afterend", thankYou);

    // Hide form so only thank you message is shown
    this.style.display = "none";
  });
}

// -------------------
// Background Animation (your existing code remains the same)
// -------------------
(() => {
  const canvas = document.getElementById('contactCanvas');
  if (!canvas) return; // only run on contact page

  const ctx = canvas.getContext('2d');
  let particles = [];

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  });

  class Particle {
    constructor(x, y, dx, dy, size, type) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.size = size;
      this.type = type; // cyber or data
    }
    draw() {
      if (this.type === "cyber") {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(67,189,220,0.8)';
        ctx.fill();
      } else if (this.type === "data") {
        ctx.fillStyle = 'rgba(255,193,7,0.7)';
        ctx.fillRect(this.x, this.y, this.size, this.size * 2);
      }
    }
    update() {
      if (this.x + this.size > canvas.width || this.x - this.size < 0) this.dx = -this.dx;
      if (this.y + this.size > canvas.height || this.y - this.size < 0) this.dy = -this.dy;
      this.x += this.dx;
      this.y += this.dy;

      if (this.type === "cyber") {
        for (let i = 0; i < particles.length; i++) {
          if (particles[i].type === "cyber" && particles[i] !== this) {
            let dist = Math.hypot(this.x - particles[i].x, this.y - particles[i].y);
            if (dist < 150) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(67,189,220,${1 - dist / 150})`;
              ctx.lineWidth = 1;
              ctx.moveTo(this.x, this.y);
              ctx.lineTo(particles[i].x, particles[i].y);
              ctx.stroke();
            }
          }
        }
      }

      this.draw();
    }
  }

  function initParticles() {
    particles = [];
    const numParticles = Math.floor(canvas.width / 30);
    for (let i = 0; i < numParticles; i++) {
      let size = Math.random() * 3 + 2;
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;
      let dx = (Math.random() - 0.5) * 1.5;
      let dy = (Math.random() - 0.5) * 1.5;
      let type = Math.random() > 0.5 ? "cyber" : "data";
      particles.push(new Particle(x, y, dx, dy, size, type));
    }
  }

  initParticles();

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => p.update());
    requestAnimationFrame(animate);
  }

  animate();
})();
