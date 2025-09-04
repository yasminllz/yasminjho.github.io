// Navigation functionality
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.section === sectionId) {
            btn.classList.add('active');
        }
    });
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Navigation event listeners
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.dataset.section;
            showSection(sectionId);
        });
    });
});

// Carousel functionality
const carouselStates = {
    desenvolvimento: 0,
    administracao: 0,
    vigilancia: 0
};

function updateCarousel(courseId) {
    const carousel = document.getElementById(`carousel-${courseId}`);
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const currentIndex = carouselStates[courseId];
    
    // Remove active class from all slides
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Add active class to current slide
    if (slides[currentIndex]) {
        slides[currentIndex].classList.add('active');
    }
    
    // Move track
    const translateX = -currentIndex * 100;
    track.style.transform = `translateX(${translateX}%)`;
}

function nextSlide(courseId) {
    const carousel = document.getElementById(`carousel-${courseId}`);
    const slides = carousel.querySelectorAll('.carousel-slide');
    const maxIndex = slides.length - 1;
    
    carouselStates[courseId] = (carouselStates[courseId] + 1) > maxIndex ? 0 : carouselStates[courseId] + 1;
    updateCarousel(courseId);
}

function prevSlide(courseId) {
    const carousel = document.getElementById(`carousel-${courseId}`);
    const slides = carousel.querySelectorAll('.carousel-slide');
    const maxIndex = slides.length - 1;
    
    carouselStates[courseId] = (carouselStates[courseId] - 1) < 0 ? maxIndex : carouselStates[courseId] - 1;
    updateCarousel(courseId);
}

// Auto-advance carousels
function startCarouselAutoplay() {
    setInterval(() => {
        // Only auto-advance if the course section is active
        const activeCourses = ['desenvolvimento', 'administracao', 'vigilancia'];
        activeCourses.forEach(courseId => {
            const section = document.getElementById(courseId);
            if (section && section.classList.contains('active')) {
                nextSlide(courseId);
            }
        });
    }, 5000); // Change slide every 5 seconds
}

// Flashcard functionality
function flipCard(card) {
    card.classList.toggle('flipped');
}

// Initialize flashcards - add click event to all flashcards
document.addEventListener('DOMContentLoaded', function() {
    const flashcards = document.querySelectorAll('.flashcard');
    flashcards.forEach(card => {
        card.addEventListener('click', function() {
            flipCard(this);
        });
    });
    
    // Start carousel autoplay
    startCarouselAutoplay();
});

// Smooth scrolling for internal links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.course-card, .project-card, .stat-card, .flashcard');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', addScrollAnimations);

// Add keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any flipped flashcards
        const flippedCards = document.querySelectorAll('.flashcard.flipped');
        flippedCards.forEach(card => {
            card.classList.remove('flipped');
        });
    }
});

// Add touch support for mobile devices
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    // Check if we're in a course section with carousel
    const activeCourses = ['desenvolvimento', 'administracao', 'vigilancia'];
    const activeSection = document.querySelector('.section.active');
    
    if (activeSection && activeCourses.includes(activeSection.id)) {
        if (swipeDistance > swipeThreshold) {
            // Swipe right - previous slide
            prevSlide(activeSection.id);
        } else if (swipeDistance < -swipeThreshold) {
            // Swipe left - next slide
            nextSlide(activeSection.id);
        }
    }
}

// Preload images for better performance
function preloadImages() {
    const imageUrls = [
        'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2882566/pexels-photo-2882566.jpeg?auto=compress&cs=tinysrgb&w=800'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize preloading when DOM is loaded
document.addEventListener('DOMContentLoaded', preloadImages);