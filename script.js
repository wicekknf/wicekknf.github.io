document.addEventListener('DOMContentLoaded', () => {
    // Menu mobilne
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.getElementById('header');
    
    const toggleMenu = () => {
        const isActive = navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isActive);
        
        // Płynna animacja ikony hamburgera
        const spans = hamburger.querySelectorAll('span');
        if(isActive) {
            spans[0].style.transform = 'translateY(8px) rotate(45deg)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    };

    hamburger.addEventListener('click', toggleMenu);

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.backgroundColor = 'rgba(10, 25, 47, 0.98)';
        } else {
            header.style.padding = '20px 0';
            header.style.backgroundColor = 'var(--midnight-navy)';
        }
    });

    // Slider w sekcji Hero z dodaną lekką animacją skalowania
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 8000); // 8 sekund 
    }

    // Lightbox dla galerii zdjęć z płynnymi przejściami
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (lightbox && lightboxImg && galleryItems) {
        galleryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                lightboxImg.src = e.target.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; 
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto'; 
            setTimeout(() => {
                lightboxImg.src = '';
            }, 400); 
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                closeLightbox();
            }
        });
    }

    // Animacje pojawiania się elementów podczas scrollowania (Scroll Reveal)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    };

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    revealElements.forEach(el => revealObserver.observe(el));

    // Płynne FAQ oparte o klasy i CSS Grid
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            if (!isOpen) {
                item.classList.add('active');
            }
        });
    });
});
