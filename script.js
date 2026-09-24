document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.getElementById('header');

    // Funkcja do przełączania menu mobilnego
    const toggleMenu = () => {
        const isActive = navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isActive); // Poprawa dla czytników ekranu
        
        // Animacja ikony hamburgera
        const spans = hamburger.querySelectorAll('span');
        if(isActive) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    };

    // Nasłuchiwanie na kliknięcie w ikonę hamburgera
    hamburger.addEventListener('click', toggleMenu);

    // Automatyczne zamykanie menu mobilnego po kliknięciu w link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Płynna zmiana tła nagłówka podczas przewijania strony
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '15px 0';
            header.style.backgroundColor = 'rgba(10, 25, 47, 0.98)';
        } else {
            header.style.padding = '20px 0';
            header.style.backgroundColor = 'var(--midnight-navy)';
        }
    });
});