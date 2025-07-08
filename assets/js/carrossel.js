const carousels = {
    nokia: {
        currentSlide: 0,
        trackSelector: '.carousel-track1',
        dotSelector: '.dot'
    },
    canon: {
        currentSlide: 0,
        trackSelector: '.carousel-track2',
        dotSelector: '.dot'
    },
    whirlpool: {
        currentSlide: 0,
        trackSelector: '.carousel-track3',
        dotSelector: '.dot'
    },
    lenovo: {
        currentSlide: 0,
        trackSelector: '.carousel-track4',
        dotSelector: '.dot'
    },
    powerautomate: {
        currentSlide: 0,
        trackSelector: '.carousel-track_powerautomate',
        dotSelector: '.dot'
    },
    python: {
        currentSlide: 0,
        trackSelector: '.carousel-track_python',
        dotSelector: '.dot'
    },
    cases: {
        currentSlide: 0,
        trackSelector: '.carousel-track_cases',
        dotSelector: '.dot'
    }
};

function moveCarousel(carouselId, direction) {
    const carousel = document.getElementById(carouselId);
    const carouselData = carousels[carouselId];
    const track = carousel.querySelector(carouselData.trackSelector);
    const slides = track.children;
    const dots = carousel.querySelectorAll(carouselData.dotSelector);

    carouselData.currentSlide += direction;

    if (carouselData.currentSlide < 0) {
        carouselData.currentSlide = slides.length - 1;
    } else if (carouselData.currentSlide >= slides.length) {
        carouselData.currentSlide = 0;
    }

    track.style.transform = `translateX(-${carouselData.currentSlide * 100}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    dots[carouselData.currentSlide].classList.add('active');
}

function goToSlide(carouselId, slideIndex) {
    const carousel = document.getElementById(carouselId);
    const carouselData = carousels[carouselId];
    const track = carousel.querySelector(carouselData.trackSelector);
    const dots = carousel.querySelectorAll(carouselData.dotSelector);

    carouselData.currentSlide = slideIndex;

    track.style.transform = `translateX(-${carouselData.currentSlide * 100}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    dots[carouselData.currentSlide].classList.add('active');
}

