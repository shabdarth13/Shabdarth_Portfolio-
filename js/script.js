/* =================== Navbar Active Link =================== */
const currentPage = location.pathname.split("/").pop();
document.querySelectorAll('nav ul li a').forEach(link => {
  if(link.getAttribute('href') === currentPage){
    link.classList.add('active');
  }
});

/* =================== Contact Form =================== */
document.getElementById('contactForm')?.addEventListener('submit', function(e){
  e.preventDefault();
  alert('Message sent! Thank you.');
});

/* =================== Scroll-triggered Animations =================== */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skill, .project-card, .achievement-card, .about-content, .about-img').forEach(el => {
  observer.observe(el);
});

/* =================== Hero Canvas Background =================== */
const heroCanvas = document.getElementById('heroCanvas');
if(heroCanvas){
  const ctx = heroCanvas.getContext('2d');
  heroCanvas.width = window.innerWidth;
  heroCanvas.height = window.innerHeight;
  function drawHero(){
    ctx.clearRect(0,0,heroCanvas.width, heroCanvas.height);
    // Example particles
    for(let i=0;i<50;i++){
      ctx.beginPath();
      ctx.arc(Math.random()*heroCanvas.width, Math.random()*heroCanvas.height, Math.random()*2+1, 0, Math.PI*2);
      ctx.fillStyle='rgba(67,189,220,0.3)';
      ctx.fill();
    }
  }
  drawHero();
  window.addEventListener('resize', ()=>{ heroCanvas.width=window.innerWidth; heroCanvas.height=window.innerHeight; drawHero(); });
}

/* =================== Skill Circle Animation =================== */
const skillSection = document.getElementById('skills');
let skillAnimated = false;

function animateCircles() {
    if (skillAnimated) return;
    skillAnimated = true;

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

// Trigger animation when skills section is visible
const skillObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            animateCircles();
        }
    });
}, {threshold:0.3});

if(skillSection) skillObserver.observe(skillSection);
