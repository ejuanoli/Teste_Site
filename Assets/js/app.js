const hamburguer = document.querySelector(".hamburguer");
const nav = document.querySelector(".nav");

hamburguer.addEventListener("click", () => nav.classList.toggle("active"));

window.addEventListener("scroll", function(){
    let header = document.querySelector('#header')
    header.classList.toggle('scroll', window.scrollY > 450);
});
