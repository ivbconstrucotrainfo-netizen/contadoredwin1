document.addEventListener('DOMContentLoaded', () => {
    
    // Header Scroll Effect
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('header-scrolled');
            header.classList.remove('py-4');
            header.classList.add('py-2');
        } else {
            header.classList.remove('header-scrolled');
            header.classList.remove('py-2');
            header.classList.add('py-4');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('flex');
    });

    // Close mobile menu on link click
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
        });
    });

    // Form Validation and Submission
    const contactForm = document.getElementById('contact-form');
    const formMsg = document.getElementById('form-msg');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation
            const nombre = document.getElementById('nombre').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const correo = document.getElementById('correo').value.trim();
            const servicio = document.getElementById('servicio').value;
            
            if (!nombre || !telefono || !correo || !servicio) {
                formMsg.textContent = 'Por favor, completa todos los campos requeridos.';
                formMsg.className = 'text-sm text-center mt-4 text-red-500 font-medium block';
                return;
            }

            // If valid, simulate sending and provide success message
            // In a real scenario, we would send the data to a backend or email service here.
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = 'Enviando...';
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-70');

            setTimeout(() => {
                formMsg.textContent = '¡Gracias! Tu solicitud ha sido enviada. Un asesor te contactará pronto.';
                formMsg.className = 'text-sm text-center mt-4 text-green-600 font-medium block';
                
                contactForm.reset();
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('opacity-70');
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMsg.classList.add('hidden');
                }, 5000);
            }, 1500);
        });
    }
    // Renta 2025 Carousel Logic
    const carousel = document.getElementById('renta-carousel');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    if (carousel) {
        const getScrollAmount = () => {
            const slide = carousel.querySelector('.snap-center') || carousel.querySelector('div');
            return (slide ? slide.offsetWidth : 500) + 24;
        };

        const scrollNext = () => {
            const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
            if (carousel.scrollLeft >= maxScrollLeft - 5) {
                carousel.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                carousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
            }
        };

        const scrollPrev = () => {
            if (carousel.scrollLeft <= 5) {
                const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
                carousel.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
            } else {
                carousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
            }
        };

        // Auto-play interval
        let autoPlay = setInterval(scrollNext, 4000);

        const resetAutoPlay = () => {
            clearInterval(autoPlay);
            autoPlay = setInterval(scrollNext, 4000);
        };

        if (btnPrev) {
            btnPrev.addEventListener('click', () => {
                scrollPrev();
                resetAutoPlay();
            });
        }
        
        if (btnNext) {
            btnNext.addEventListener('click', () => {
                scrollNext();
                resetAutoPlay();
            });
        }
    }

    // Scroll Reveal Observer Logic
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-fade');
    
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Reveal only once
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -40px 0px"
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

});
