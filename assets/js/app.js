// Seletores principais
const hamburguer = document.querySelector(".hamburguer");
const nav = document.querySelector(".nav");
const header = document.querySelector("#header");

// Scroll to top button
const scrollTopBtn = document.createElement("button");
scrollTopBtn.id = "scrollTopBtn";
scrollTopBtn.title = "Voltar ao topo";
scrollTopBtn.innerText = "↑";
document.body.appendChild(scrollTopBtn);

// Seções e links
const sections = document.querySelectorAll("main, section");
const navLinks = document.querySelectorAll(".nav-list a");

// Toggle do menu hamburguer
hamburguer.addEventListener("click", () => {
  nav.classList.toggle("active");
});

// Muda cor do header e ativa botão de topo
window.addEventListener("scroll", () => {
  header.classList.toggle("scroll", window.scrollY > 450);
  scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";

  // Ativa link do menu conforme a seção
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 60;
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
document.querySelectorAll(".nav-list a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
  });
});

// Fecha menu ao clicar fora
document.addEventListener("click", (e) => {
  const isClickInside = nav.contains(e.target) || hamburguer.contains(e.target);
  if (!isClickInside && nav.classList.contains("active")) {
    nav.classList.remove("active");
  }
});

// Rolagem suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Scroll para o topo
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/*
// 👋 Mensagem de boas-vindas temporária
// Verifica se está na página home (index.html ou raiz "/")
if (
  window.location.pathname === "/" || 
  window.location.pathname.endsWith("index.html")
) {
  const welcome = document.createElement("div");
  welcome.innerText = "Bem-vindo!";
  welcome.style.cssText = `
    position: fixed;
    height: 100vh;
    top: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.95);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 3rem;
    z-index: 10000;
    overflow: hidden;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    transition: clip-path 1s ease;
    clip-path: inset(0 0 0 0);
  `;
  document.body.appendChild(welcome);

  // Após 100ms, anima para abrir cortina (abre para os lados)
  setTimeout(() => {
    welcome.style.clipPath = "inset(0 50% 0 50%)";
  }, 100);

  // Remove o elemento após a animação
  setTimeout(() => {
    welcome.remove();
  }, 2200);
}
*/
// 🌒 Modo escuro
const toggleDarkMode = document.createElement("button");
toggleDarkMode.innerText = "🌙";
toggleDarkMode.title = "Alternar modo claro/escuro";
toggleDarkMode.style.cssText = `
  position: fixed;
  bottom: 32px;
  left: 32px;
  padding: 10px;
  font-size: 18px;
  border-radius: 50%;
  background: #222;
  color: #fff;
  border: none;
  cursor: pointer;
  z-index: 999;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
`;
document.body.appendChild(toggleDarkMode);

toggleDarkMode.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});



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


// ⏳ Loader simples (opcional)
window.addEventListener("load", () => {
  const loader = document.querySelector("#loader");
  if (loader) loader.style.display = "none";
});

document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main.background');
  // Depois que a página carregar, adiciona a classe para animar o portfólio
  setTimeout(() => {
    main.classList.add('show-portfolio');
  }, 500); // 0.5s de delay para efeito suave
});
document.addEventListener('DOMContentLoaded', () => {
  const portfolio = document.getElementById('portfolio');

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
});
  document.addEventListener("DOMContentLoaded", function () {
    const pageTitle = document.getElementById("pageTitle");
    const path = window.location.pathname;

    // Mapeia os caminhos para nomes legíveis
    const pageNames = {
      "https://github.com/ejuanoli/Teste_Site/blob/main/index.html": "Home",
      "https://github.com/ejuanoli/Teste_Site/blob/main/projects.html": "Projetos",
      "https://github.com/ejuanoli/Teste_Site/blob/main/pp.html": "Power Platform",
      "https://github.com/ejuanoli/Teste_Site/blob/main/rpa.html": "RPA",
      "https://github.com/ejuanoli/Teste_Site/blob/main/contact.html": "Contato",
      "/": "Home" // fallback para root
    };

    // Usa o nome se existir no mapeamento
    pageTitle.textContent = pageNames[path] || "Página";
  });
