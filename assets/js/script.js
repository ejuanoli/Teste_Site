// Seletores principais
const hamburguer = document.querySelector(".hamburguer");
const nav = document.querySelector(".nav");
const header = document.querySelector("#header");
const closeMenu = document.querySelector(".close-menu");

// Scroll to top button
const scrollTopBtn = document.getElementById("scrollTopBtn");

// Seções e links
const sections = document.querySelectorAll("main section, section.fade, #portfolio");
const navLinks = document.querySelectorAll(".nav-list a");

// Toggle do menu hamburguer
hamburguer.addEventListener("click", () => {
  nav.classList.toggle("active");
  hamburguer.classList.toggle("active");
});

// Fecha menu com botão X
if (closeMenu) {
  closeMenu.addEventListener("click", () => {
    nav.classList.remove("active");
    hamburguer.classList.remove("active");
  });
}

// Fecha menu ao clicar em link
document.querySelectorAll(".nav-list a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    hamburguer.classList.remove("active");
  });
});

// Muda cor do header e ativa botão de topo
window.addEventListener("scroll", () => {
  if (header) header.classList.toggle("scrolled", window.scrollY > 80);
  if (scrollTopBtn) scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";

  // Ativa link do menu conforme a seção
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// Fecha menu ao clicar em link
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (nav) nav.classList.remove("active");
  });
});

// Fecha menu ao clicar fora
if (nav && hamburguer) {
  document.addEventListener("click", (e) => {
    const isClickInside = nav.contains(e.target) || hamburguer.contains(e.target);
    if (!isClickInside && nav.classList.contains("active")) {
      nav.classList.remove("active");
      hamburguer.classList.remove("active");
    }
  });
}

// Rolagem suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Botão voltar ao topo aprimorado
function handleScroll() {
  if (scrollTopBtn) {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add("show");
      scrollTopBtn.style.display = "flex";
    } else {
      scrollTopBtn.classList.remove("show");
      setTimeout(() => {
        if (!scrollTopBtn.classList.contains("show")) {
          scrollTopBtn.style.display = "none";
        }
      }, 300);
    }
  }
}

window.addEventListener("scroll", handleScroll);

if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
  
  // Efeito de partículas no clique
  scrollTopBtn.addEventListener("click", function(e) {
    createParticles(e, this);
  });
}

// Função para criar partículas no clique
function createParticles(e, element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  for (let i = 0; i < 8; i++) {
    const particle = document.createElement("div");
    particle.style.position = "fixed";
    particle.style.left = centerX + "px";
    particle.style.top = centerY + "px";
    particle.style.width = "4px";
    particle.style.height = "4px";
    particle.style.background = ["#BA0C2F", "#FFCC00", "#8B0000"][i % 3];
    particle.style.borderRadius = "50%";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "9999";
    particle.style.transition = "all 0.6s ease-out";
    
    document.body.appendChild(particle);
    
    const angle = (i / 8) * Math.PI * 2;
    const distance = 30 + Math.random() * 20;
    const endX = centerX + Math.cos(angle) * distance;
    const endY = centerY + Math.sin(angle) * distance;
    
    setTimeout(() => {
      particle.style.transform = `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`;
      particle.style.opacity = "0";
    }, 10);
    
    setTimeout(() => {
      document.body.removeChild(particle);
    }, 600);
  }
}

// 🌒 Modo escuro - REMOVIDO DO CANTO INFERIOR
// O botão de dark mode agora está apenas na navbar

// 📦 Animação de entrada usando IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll(".fade").forEach(el => observer.observe(el));

// Título dinâmico da página
const pageTitle = document.getElementById("pageTitle");
const filename = window.location.pathname.split("/").pop();
const pageNames = {
  "index.html": "Home",
  "projects.html": "Projetos",
  "pp.html": "Power Platform",
  "rpa.html": "RPA",
  "contact.html": "Contato",
  "": "Home"
};
if (pageTitle) pageTitle.textContent = pageNames[filename] || "Página";

// ⏳ Loader simples (opcional)
window.addEventListener("load", () => {
  const loader = document.querySelector("#loader");
  if (loader) loader.style.display = "none";
});

document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main.background');
  // Depois que a página carregar, adiciona a classe para animar o portfólio
  setTimeout(() => {
    if (main) main.classList.add('show-portfolio');
  }, 500); // 0.5s de delay para efeito suave
});
document.addEventListener('DOMContentLoaded', () => {
  const portfolio = document.getElementById('portfolio');

  if (portfolio) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          portfolio.classList.add('show');
          observer.unobserve(portfolio);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(portfolio);
  }
});

// Animação de frase de impacto na hero aprimorada
function animateHeroPhrase() {
  const heroContent = document.querySelector('.hero-content h1');
  if (!heroContent) return;
  const frases = [
    'Inovação <span class="destaque">e tecnologia</span> para transformar o seu <span class="destaque">futuro</span>.',
    'Soluções <span class="destaque">digitais</span> que impulsionam <span class="destaque">resultados</span>.',
    'Automação, <span class="destaque">inteligência</span> e <span class="destaque">crescimento</span> para o seu negócio.'
  ];
  let fraseIndex = 0;
  let i = 0;
  let apagando = false;
  function getCursorHTML() {
    return '<span class="typing-cursor">|</span>';
  }
  function type() {
    const frase = frases[fraseIndex];
    if (!apagando && i < frase.length) {
      heroContent.innerHTML = frase.slice(0, i+1) + getCursorHTML();
      i++;
      let char = frase[i-1];
      let delay = 22 + Math.random() * 38;
      if (char === ',' || char === '.') delay = 180;
      if (char === ' ' && frase[i-2] !== '>') delay = 40;
      setTimeout(type, delay);
    } else if (!apagando && i === frase.length) {
      heroContent.innerHTML = frase + getCursorHTML();
      heroContent.classList.add('show-hero-phrase');
      setTimeout(() => { apagando = true; type(); }, 1700);
    } else if (apagando && i > 0) {
      heroContent.innerHTML = frase.slice(0, i-1) + getCursorHTML();
      i--;
      setTimeout(type, 13 + Math.random() * 18);
    } else {
      heroContent.innerHTML = '';
      apagando = false;
      fraseIndex = (fraseIndex + 1) % frases.length;
      setTimeout(type, 400);
    }
  }
  type();
}

document.addEventListener('DOMContentLoaded', animateHeroPhrase);

// Carrossel de portfólio com setas premium
function initPortfolioCarousel() {
  const track = document.querySelector('.carousel-track');
  const cards = Array.from(document.querySelectorAll('.portfolio-card'));
  const leftBtn = document.querySelector('.carousel-arrow.left');
  const rightBtn = document.querySelector('.carousel-arrow.right');
  const indicators = document.querySelector('.carousel-indicators');
  if (!track || !cards.length || !leftBtn || !rightBtn || !indicators) return;

  let current = 0;
  let cardsToShow = 3;
  let autoplayTimer = null;
  
  function updateCardsToShow() {
    if (window.innerWidth < 600) cardsToShow = 1;
    else if (window.innerWidth < 900) cardsToShow = 2;
    else cardsToShow = 3;
  }
  updateCardsToShow();
  window.addEventListener('resize', () => {
    updateCardsToShow();
    goTo(current);
  });

  function goTo(idx) {
    current = (idx + cards.length) % cards.length;
    const cardWidth = cards[0].offsetWidth + 32; // 32px gap
    track.scrollTo({ left: current * cardWidth, behavior: 'smooth' });
    cards.forEach((c, i) => c.classList.toggle('active', i === current));
    updateIndicators();
    
    // Efeito de partículas nas setas
    const direction = idx > current ? 'right' : 'left';
    const activeBtn = direction === 'right' ? rightBtn : leftBtn;
    if (activeBtn) {
      createArrowParticles(activeBtn, direction);
    }
  }

  function updateIndicators() {
    indicators.innerHTML = '';
    for (let i = 0; i < cards.length; i++) {
      const dot = document.createElement('span');
      dot.className = 'indicator' + (i === current ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      indicators.appendChild(dot);
    }
  }

  function nextAuto() {
    goTo(current + 1);
  }
  function startAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = setInterval(nextAuto, 4000);
  }
  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = null;
  }

  // Efeitos especiais para setas premium
  function createArrowParticles(arrow, direction) {
    const rect = arrow.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement("div");
      particle.style.position = "fixed";
      particle.style.left = centerX + "px";
      particle.style.top = centerY + "px";
      particle.style.width = "3px";
      particle.style.height = "3px";
      particle.style.background = ["#BA0C2F", "#FFCC00", "#8B0000", "#28a745"][i % 4];
      particle.style.borderRadius = "50%";
      particle.style.pointerEvents = "none";
      particle.style.zIndex = "9999";
      particle.style.transition = "all 1.2s ease-out";
      particle.style.boxShadow = "0 0 6px currentColor";
      
      document.body.appendChild(particle);
      
      // Partículas que sobem em diferentes direções
      const angle = (i / 8) * Math.PI * 2;
      const distance = 60 + Math.random() * 40;
      const endX = centerX + Math.cos(angle) * (distance * 0.3);
      const endY = centerY - Math.abs(Math.sin(angle) * distance) - 40; // Sempre para cima
      
      setTimeout(() => {
        particle.style.transform = `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`;
        particle.style.opacity = "0";
      }, 10);
      
      setTimeout(() => {
        if (document.body.contains(particle)) {
          document.body.removeChild(particle);
        }
      }, 1200);
    }
  }

  // Efeitos de hover dinâmicos para setas premium
  function addPremiumArrowEffects() {
    const premiumArrows = document.querySelectorAll('.premium-arrow');
    
    premiumArrows.forEach(arrow => {
      // Efeito de rotação no hover
      arrow.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2) rotate(5deg)';
        this.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Adicionar classe para animação de partículas
        this.classList.add('hover-active');
      });
      
      arrow.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
        this.classList.remove('hover-active');
      });
      
      // Efeito de clique com partículas
      arrow.addEventListener('click', function(e) {
        const direction = this.getAttribute('data-direction');
        createArrowParticles(this, direction);
        
        // Efeito de pulso
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = 'scale(1.2) rotate(5deg)';
        }, 100);
      });
    });
  }

  leftBtn.addEventListener('click', () => { 
    goTo(current - 1); 
    stopAutoplay(); 
  });
  rightBtn.addEventListener('click', () => { 
    goTo(current + 1); 
    stopAutoplay(); 
  });
  
  track.addEventListener('mouseenter', stopAutoplay);
  track.addEventListener('mouseleave', startAutoplay);
  track.addEventListener('focusin', stopAutoplay);
  track.addEventListener('focusout', startAutoplay);
  track.addEventListener('touchstart', stopAutoplay);
  track.addEventListener('touchend', startAutoplay);

  // Swipe para mobile
  let startX = null;
  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });
  track.addEventListener('touchend', e => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (dx > 50) goTo(current - 1);
    if (dx < -50) goTo(current + 1);
    startX = null;
  });

  // Inicialização
  goTo(0);
  startAutoplay();
  addPremiumArrowEffects();
}
document.addEventListener('DOMContentLoaded', initPortfolioCarousel); 

// NOVO DARK MODE BUTTON DINÂMICO NA NAVBAR
function setupSophisticatedDarkModeBtn() {
  const btn = document.getElementById('darkModeSophisticated');
  if (!btn) return;
  
  // Carregar preferência inicial - MODE DARK COMO PADRÃO
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || savedTheme === null) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  }
  
  btn.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-mode');
    
    // Animação de transição
    btn.style.transform = 'scale(0.9) rotate(-10deg)';
    setTimeout(() => {
      btn.style.transform = 'scale(1.1) rotate(10deg)';
    }, 150);
    setTimeout(() => {
      btn.style.transform = 'scale(1) rotate(0deg)';
    }, 300);
    
    // Efeito de partículas
    createDarkModeParticles(btn, isDark);
    
    // Alternar modo
    document.body.classList.toggle('dark-mode');
    
    // Salvar preferência no localStorage
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
    
    // Efeito de onda no botão
    createRippleEffect(btn);
  });
  
  // Efeitos de hover
  btn.addEventListener('mouseenter', () => {
    if (!document.body.classList.contains('dark-mode')) {
      btn.style.boxShadow = '0 8px 24px rgba(135, 206, 235, 0.8)';
    } else {
      btn.style.boxShadow = '0 8px 24px rgba(26, 26, 46, 0.8)';
    }
  });
  
  btn.addEventListener('mouseleave', () => {
    if (!document.body.classList.contains('dark-mode')) {
      btn.style.boxShadow = '0 4px 16px rgba(135, 206, 235, 0.4)';
    } else {
      btn.style.boxShadow = '0 4px 16px rgba(26, 26, 46, 0.6)';
    }
  });
}

// Função para criar partículas do botão dark mode
function createDarkModeParticles(btn, isDark) {
  const rect = btn.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  const colors = isDark ? 
    ['#FFD700', '#F0F8FF', '#FFFFFF'] : 
    ['#1a1a2e', '#16213e', '#FFCC00'];
  
  for (let i = 0; i < 12; i++) {
    const particle = document.createElement("div");
    particle.style.position = "fixed";
    particle.style.left = centerX + "px";
    particle.style.top = centerY + "px";
    particle.style.width = "4px";
    particle.style.height = "4px";
    particle.style.background = colors[i % colors.length];
    particle.style.borderRadius = "50%";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "9999";
    particle.style.transition = "all 1.5s cubic-bezier(0.4, 0, 0.2, 1)";
    particle.style.boxShadow = `0 0 8px ${colors[i % colors.length]}`;
    
    document.body.appendChild(particle);
    
    // Partículas em padrão circular
    const angle = (i / 12) * Math.PI * 2;
    const distance = 80 + Math.random() * 40;
    const endX = centerX + Math.cos(angle) * distance;
    const endY = centerY + Math.sin(angle) * distance;
    
    setTimeout(() => {
      particle.style.transform = `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`;
      particle.style.opacity = "0";
    }, 10);
    
    setTimeout(() => {
      if (document.body.contains(particle)) {
        document.body.removeChild(particle);
      }
    }, 1500);
  }
}

// Função para criar efeito de onda
function createRippleEffect(btn) {
  const ripple = document.createElement("div");
  ripple.style.position = "absolute";
  ripple.style.top = "50%";
  ripple.style.left = "50%";
  ripple.style.width = "0";
  ripple.style.height = "0";
  ripple.style.background = "rgba(255, 255, 255, 0.3)";
  ripple.style.borderRadius = "50%";
  ripple.style.transform = "translate(-50%, -50%)";
  ripple.style.pointerEvents = "none";
  ripple.style.transition = "all 0.6s ease-out";
  
  btn.appendChild(ripple);
  
  setTimeout(() => {
    ripple.style.width = "100px";
    ripple.style.height = "100px";
    ripple.style.opacity = "0";
  }, 10);
  
  setTimeout(() => {
    if (btn.contains(ripple)) {
      btn.removeChild(ripple);
    }
  }, 600);
}

document.addEventListener('DOMContentLoaded', setupSophisticatedDarkModeBtn); 
