// Mobile Menu Toggle
const btn = document.getElementById('mobile-menu-button');
const menu = document.getElementById('mobile-menu');
const menuLinks = menu ? menu.querySelectorAll('a') : [];

if (btn && menu) {
    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });

    // Close menu when a link is clicked
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
        });
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg', 'bg-darker/95', 'backdrop-blur-md', 'border-b', 'border-gray-800');
            navbar.classList.remove('bg-transparent', 'py-4');
            navbar.classList.add('py-2');
        } else {
            navbar.classList.remove('shadow-lg', 'bg-darker/95', 'backdrop-blur-md', 'border-b', 'border-gray-800', 'py-2');
            navbar.classList.add('bg-transparent', 'py-4');
        }
    }
});

// Smooth fade in for elements on load
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.animate-fade-in-up');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';

        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100);
    });
});

// About section image slider functionality
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('#about-slider img');
    if (slides.length > 0) {
        let currentSlide = 0;

        setInterval(() => {
            // Hide current slide
            slides[currentSlide].classList.remove('opacity-100');
            slides[currentSlide].classList.add('opacity-0');

            // Move to next slide
            currentSlide = (currentSlide + 1) % slides.length;

            // Show next slide
            slides[currentSlide].classList.remove('opacity-0');
            slides[currentSlide].classList.add('opacity-100');
        }, 3000); // changes every 3 seconds
    }
});

// Gallery Lightbox Functionality
let currentImageIndex = 0;
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function getGalleryImages() {
    return Array.from(document.querySelectorAll('#gallery .grid img')).map(img => img.src);
}

function openLightbox(index) {
    currentImageIndex = index;
    const images = getGalleryImages();
    if (images[currentImageIndex]) {
        lightboxImg.src = images[currentImageIndex];
    }
    lightbox.classList.remove('hidden');
    // slight delay for transition
    setTimeout(() => {
        lightbox.classList.remove('opacity-0');
        lightbox.classList.add('opacity-100');
    }, 10);
    document.body.style.overflow = 'hidden'; // stop page scrolling
}

function closeLightbox() {
    lightbox.classList.remove('opacity-100');
    lightbox.classList.add('opacity-0');
    setTimeout(() => {
        lightbox.classList.add('hidden');
    }, 300);
    document.body.style.overflow = 'auto'; // enable page scrolling
}

function nextImage(event) {
    event.stopPropagation(); // Prevent closing lightbox when clicking next
    const images = getGalleryImages();
    if (images.length > 0) {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateLightboxImage(images);
    }
}

function prevImage(event) {
    event.stopPropagation(); // Prevent closing lightbox when clicking prev
    const images = getGalleryImages();
    if (images.length > 0) {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateLightboxImage(images);
    }
}

function updateLightboxImage(images) {
    // Basic fade effect
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
        lightboxImg.src = images[currentImageIndex];
        lightboxImg.style.opacity = '1';
    }, 200);
}

// Close lightbox when clicking outside the image
document.getElementById('lightbox')?.addEventListener('click', function (e) {
    if (e.target === this) {
        closeLightbox();
    }
});

// Setup Feedback Carousel using SwiperJS
document.addEventListener('DOMContentLoaded', () => {
    // Only init if swiper is available (we add script at bottom of HTML)
    if (typeof Swiper !== 'undefined') {
        const swiper = new Swiper('.feedbackSwiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true, // Infinite looping
            grabCursor: true, // Show hand cursor
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            // Responsive breakpoints
            breakpoints: {
                // when window width is >= 640px
                640: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                // when window width is >= 1024px
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 40
                }
            }
        });
    }
});
