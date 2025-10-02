/* =================== Navbar Active Link =================== */
const currentPage = location.pathname.split("/").pop();
document.querySelectorAll('nav ul li a').forEach(link => {
  if(link.getAttribute('href') === currentPage){
    link.classList.add('active');
  }
});

/* =================== Scroll-triggered Skill Circles =================== */
const skillSection = document.getElementById('skills');
let animated = false;

function animateCircles() {
    if (animated) return;
    animated = true;

    document.querySelectorAll('.circle').forEach(circle => {
        const percent = circle.getAttribute('data-percent');
        const span = circle.querySelector('span');

        const canvas = document.createElement('canvas');
        canvas.width = 120;
        canvas.height = 120;
        circle.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        const radius = 54;
        const lineWidth = 6;
        let currentPercent = 0;

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Background circle
            ctx.beginPath();
            ctx.arc(60, 60, radius, 0, Math.PI * 2);
            ctx.strokeStyle = '#222';
            ctx.lineWidth = lineWidth;
            ctx.stroke();

            // Foreground progress
            const endAngle = (currentPercent / 100) * Math.PI * 2;
            ctx.beginPath();
            ctx.arc(60, 60, radius, -Math.PI/2, endAngle - Math.PI/2);
            ctx.strokeStyle = '#43bddc';
            ctx.lineWidth = lineWidth;
            ctx.lineCap = 'round';
            ctx.stroke();

            span.textContent = Math.round(currentPercent) + '%';

            if (currentPercent < percent) {
                currentPercent += 1;
                requestAnimationFrame(animate);
            }
        }
        animate();
    });
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            animateCircles();
        }
    });
}, { threshold: 0.5 });

observer.observe(skillSection);

/* =================== Hero Canvas Animation =================== */
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const particleCount = 120;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if(this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if(this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = '#43bddc';
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for(let i=0; i<particleCount; i++){
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });

    // Draw lines between close particles
    for(let i=0; i<particles.length; i++){
        for(let j=i+1; j<particles.length; j++){
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if(dist < 120){
                ctx.beginPath();
                ctx.strokeStyle = `rgba(67,189,220,${1 - dist/120})`;
                ctx.lineWidth = 0.8;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

initParticles();
animateParticles();
