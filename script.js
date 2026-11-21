/* =========================================================
   Kancelaria Radcy Prawnego – Katarzyna Gruntmeyer
   Interakcje, animacje i dostępność
   ========================================================= */
(() => {
	"use strict";

	const header = document.querySelector(".site-header");
	const burger = document.getElementById("burger");
	const menu = document.getElementById("primary-menu");
	const progress = document.querySelector(".scroll-progress");
	const toTop = document.querySelector(".to-top");
	const quoteBg = document.querySelector(".quote-bg");
	const yearEl = document.querySelector(".year");

	const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
	const desktopQuery = window.matchMedia("(min-width: 900px)");
	let reduceMotion = motionQuery.matches;

	/* ---------- Rok w stopce ---------- */
	if (yearEl) yearEl.textContent = String(new Date().getFullYear());

	/* ---------- Menu mobilne (WCAG 2.1.1, 2.4.3, 4.1.2) ---------- */
	const isMenuOpen = () => burger && burger.getAttribute("aria-expanded") === "true";

	function setMenu(open, { returnFocus = false } = {}) {
		if (!burger || !menu) return;
		burger.setAttribute("aria-expanded", String(open));
		burger.setAttribute("aria-label", open ? "Zamknij menu nawigacyjne" : "Otwórz menu nawigacyjne");
		menu.classList.toggle("is-open", open);
		document.body.classList.toggle("menu-open", open);

		if (open) {
			const firstLink = menu.querySelector("a");
			if (firstLink) setTimeout(() => firstLink.focus(), 50);
		} else if (returnFocus) {
			burger.focus();
		}
	}

	if (burger && menu) {
		burger.addEventListener("click", () => setMenu(!isMenuOpen()));

		menu.addEventListener("click", (e) => {
			if (e.target.closest("a") && isMenuOpen()) setMenu(false);
		});

		document.addEventListener("keydown", (e) => {
			if (!isMenuOpen()) return;

			if (e.key === "Escape") {
				setMenu(false, { returnFocus: true });
				return;
			}

			// Pułapka fokusu w otwartym menu
			if (e.key === "Tab") {
				const focusables = [burger, ...menu.querySelectorAll("a")];
				const first = focusables[0];
				const last = focusables[focusables.length - 1];
				if (e.shiftKey && document.activeElement === first) {
					e.preventDefault();
					last.focus();
				} else if (!e.shiftKey && document.activeElement === last) {
					e.preventDefault();
					first.focus();
				}
			}
		});

		desktopQuery.addEventListener("change", (e) => {
			if (e.matches && isMenuOpen()) setMenu(false);
		});
	}

	/* ---------- Przewijanie: nagłówek, pasek postępu, „do góry”, paralaksa ---------- */
	let ticking = false;

	function onScrollFrame() {
		const y = window.scrollY;
		const max = document.documentElement.scrollHeight - window.innerHeight;

		if (header) header.classList.toggle("is-scrolled", y > 30);
		if (progress) progress.style.setProperty("--progress", max > 0 ? (y / max).toFixed(4) : "0");
		if (toTop) toTop.classList.toggle("is-visible", y > 700);

		if (quoteBg && !reduceMotion) {
			const rect = quoteBg.parentElement.getBoundingClientRect();
			if (rect.bottom > 0 && rect.top < window.innerHeight) {
				const limit = rect.height * 0.2; // tło ma zapas 25% – nigdy nie odsłoni krawędzi
				const raw = (rect.top + rect.height / 2 - window.innerHeight / 2) * -0.15;
				const offset = Math.max(-limit, Math.min(limit, raw));
				quoteBg.style.setProperty("--parallax", `${offset.toFixed(1)}px`);
			}
		}

		ticking = false;
	}

	function requestScrollFrame() {
		if (!ticking) {
			ticking = true;
			requestAnimationFrame(onScrollFrame);
		}
	}

	window.addEventListener("scroll", requestScrollFrame, { passive: true });
	window.addEventListener("resize", requestScrollFrame, { passive: true });
	onScrollFrame();

	// Przycisk „do góry” – po przewinięciu przenieś fokus na początek strony
	if (toTop) {
		toTop.addEventListener("click", () => {
			const logo = document.querySelector(".logo-link");
			if (logo) setTimeout(() => logo.focus({ preventScroll: true }), reduceMotion ? 0 : 600);
		});
	}

	/* ---------- Animacje pojawiania się (WCAG 2.3.3) ---------- */
	const revealEls = document.querySelectorAll("[data-reveal]");

	function revealAll() {
		revealEls.forEach((el) => el.classList.add("is-visible"));
	}

	if (reduceMotion || !("IntersectionObserver" in window)) {
		revealAll();
	} else {
		const revealObserver = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-visible");
						obs.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
		);
		revealEls.forEach((el) => revealObserver.observe(el));
	}

	// Elementy z fokusem klawiatury zawsze widoczne
	document.addEventListener("focusin", (e) => {
		const el = e.target.closest && e.target.closest("[data-reveal]");
		if (el) el.classList.add("is-visible");
	});

	motionQuery.addEventListener("change", (e) => {
		reduceMotion = e.matches;
		if (reduceMotion) {
			revealAll();
			if (quoteBg) quoteBg.style.removeProperty("--parallax");
		}
	});

	/* ---------- Aktywny link w menu ---------- */
	const navLinks = menu ? [...menu.querySelectorAll('a[href^="#"]')] : [];
	const sectionMap = new Map();

	navLinks.forEach((link) => {
		const id = link.getAttribute("href").slice(1);
		const target = id === "top" ? document.querySelector(".hero") : document.getElementById(id);
		const section = target && (target.closest("section") || target);
		if (section) sectionMap.set(section, link);
	});

	if ("IntersectionObserver" in window && sectionMap.size) {
		const navObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) return;
					navLinks.forEach((l) => l.removeAttribute("aria-current"));
					const link = sectionMap.get(entry.target);
					if (link) link.setAttribute("aria-current", "true");
				});
			},
			{ rootMargin: "-45% 0px -50% 0px" }
		);
		sectionMap.forEach((_, section) => navObserver.observe(section));
	}

	/* ---------- Efekt 3D kart specjalizacji (tylko mysz) ---------- */
	const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

	if (finePointer) {
		document.querySelectorAll("[data-tilt]").forEach((card) => {
			card.addEventListener("pointermove", (e) => {
				if (reduceMotion) return;
				const r = card.getBoundingClientRect();
				const px = (e.clientX - r.left) / r.width - 0.5;
				const py = (e.clientY - r.top) / r.height - 0.5;
				card.style.setProperty("--ry", `${(px * 8).toFixed(2)}deg`);
				card.style.setProperty("--rx", `${(-py * 8).toFixed(2)}deg`);
			});
			card.addEventListener("pointerleave", () => {
				card.style.removeProperty("--rx");
				card.style.removeProperty("--ry");
			});
		});
	}
})();
