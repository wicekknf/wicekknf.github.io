// Cache wszystkich referencji DOM
const burger = document.getElementById("burger");
const menu = document.querySelector(".menu");
const nav = document.querySelector("nav");
const span = document.querySelector(".year");

// Ustawienie aktualnego roku w stopce
if (span) {
    span.textContent = new Date().getFullYear();
}

// Funkcja przełączająca menu mobilne z obsługą ARIA (WCAG 4.1.2)
function handleMiniNav() {
    const isOpened = burger.classList.toggle("active");
    menu.classList.toggle("active");

    // Aktualizacja stanu dla czytników ekranu
    burger.setAttribute("aria-expanded", isOpened ? "true" : "false");
    burger.setAttribute(
        "aria-label",
        isOpened ? "Zamknij menu nawigacyjne" : "Otwórz menu nawigacyjne"
    );
}

// Zamknięcie menu po kliknięciu w link
if (menu && burger) {
    menu.addEventListener("click", (e) => {
        if (e.target.matches("a")) {
            handleMiniNav();
        }
    });

    burger.addEventListener("click", handleMiniNav);

    // Dostępność z klawiatury: zamykanie menu klawiszem Escape (WCAG 2.1.1)
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && menu.classList.contains("active")) {
            handleMiniNav();
            burger.focus(); // Przywrócenie fokusu na przycisk menu
        }
    });
}

// Obsługa tła nawigacji podczas przewijania
let ticking = false;
function updateNavBackground() {
    if (window.scrollY > 20) {
        nav.classList.add("background-for-menu");
    } else {
        nav.classList.remove("background-for-menu");
    }
    ticking = false;
}

function handleScroll() {
    if (!ticking) {
        requestAnimationFrame(updateNavBackground);
        ticking = true;
    }
}
window.addEventListener("scroll", handleScroll, { passive: true });

// IntersectionObserver z uwzględnieniem prefers-reduced-motion (WCAG 2.3.3)
const elements = document.querySelectorAll(
    ".card, .s-card, .about-me-first-part, .about-me-second-part, .contact-img, .contact-text"
);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion) {
    // Jeśli użytkownik ma włączoną redukcję ruchu, od razu pokaż wszystkie elementy
    elements.forEach((el) => el.classList.add("visible"));
} else {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.2,
            rootMargin: "0px 0px -10% 0px",
        }
    );

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            elements.forEach((el) => observer.observe(el));
        });
    } else {
        elements.forEach((el) => observer.observe(el));
    }
}