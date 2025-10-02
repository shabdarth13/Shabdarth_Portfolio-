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

document.querySelectorAll('.animate').forEach(el => observer.observe(el));

/* =================== Project Card Hover Particles =================== */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = `${e.offsetX}px`;
    particle.style.top = `${e.offsetY}px`;
    card.appendChild(particle);
    setTimeout(() => particle.remove(), 1000);
  });
});

/* =================== Full-page Canvas Particles =================== */
function initCanvasParticles(canvasId){
  const canvas = document.getElementById(canvasId);
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x:null, y:null };

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  });

  window.addEventListener('mousemove', e => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  class Particle {
    constructor(x, y, dx, dy, size, type){
      this.x = x; this.y = y; this.dx = dx; this.dy = dy; this.size = size;
      this.type = type || "cyber";
    }
    draw(){
      if(this.type==="cyber"){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fillStyle = '#43bddc';
        ctx.fill();
      } else if(this.type==="data"){
        ctx.fillStyle='rgba(255,193,7,0.7)';
        ctx.fillRect(this.x,this.y,this.size,this.size*2);
      }
    }
    update(){
      if(this.x + this.size > canvas.width || this.x - this.size < 0) this.dx = -this.dx;
      if(this.y + this.size > canvas.height || this.y - this.size < 0) this.dy = -this.dy;
      this.x += this.dx; this.y += this.dy;

      if(this.type==="cyber"){
        for(let i=0;i<particles.length;i++){
          if(particles[i].type==="cyber" && particles[i]!==this){
            let dist=Math.hypot(this.x - particles[i].x, this.y - particles[i].y);
            if(dist<150){
              ctx.beginPath();
              ctx.strokeStyle=`rgba(67,189,220,${1-dist/150})`;
              ctx.lineWidth=1;
              ctx.moveTo(this.x,this.y);
              ctx.lineTo(particles[i].x,particles[i].y);
              ctx.stroke();
            }
          }
        }
      }

      if(mouse.x && mouse.y){
        let dist=Math.hypot(this.x-mouse.x,this.y-mouse.y);
        if(dist<150){
          ctx.beginPath();
          ctx.strokeStyle=`rgba(67,189,220,0.5)`;
          ctx.moveTo(this.x,this.y);
          ctx.lineTo(mouse.x,mouse.y);
          ctx.stroke();
        }
      }

      this.draw();
    }
  }

  function initParticles(){
    particles=[];
    const numParticles=Math.floor(canvas.width/30);
    for(let i=0;i<numParticles;i++){
      let size=Math.random()*3+2;
      let x=Math.random()*canvas.width;
      let y=Math.random()*canvas.height;
      let dx=(Math.random()-0.5)*1.5;
      let dy=(Math.random()-0.5)*1.5;
      let type=Math.random()>0.5?"cyber":"data";
      particles.push(new Particle(x,y,dx,dy,size,type));
    }
  }

  initParticles();
  function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>p.update());
    requestAnimationFrame(animate);
  }
  animate();
}

/* Initialize for Home Hero and Contact Page */
initCanvasParticles('heroCanvas');
initCanvasParticles('contactCanvas');
/* Initialize canvas particles behind About and Projects */
initCanvasParticles('aboutCanvas');
initCanvasParticles('projectsCanvas');
