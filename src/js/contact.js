const miniHamburger = document.querySelector(".hamburger-icon");
const miniClose = document.querySelector(".close-icon");
const miniNavList = document.querySelector(".mini-nav-list");
const miniNavItems = miniNavList.querySelectorAll("a");
const year = document.querySelector(".year");
const navList = document.querySelector(".nav-list");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#e-mail");
const textArea = document.querySelector("#msg");
const popup = document.querySelector(".popup");
const sendBtn = document.querySelector(".send");
const clearBtn = document.querySelector(".clear");
const closeBtn = document.querySelector(".close");

const currentYear = new Date().getFullYear();
year.textContent = currentYear;

// zarządzanie małą nawigacją
const showNav = () => {
	miniNavList.classList.add("show-miniNav");
	miniClose.style.display = "block";
	miniHamburger.style.display = "none";
};
const hideNav = () => {
	miniNavList.classList.remove("show-miniNav");
	miniClose.style.display = "none";
	miniHamburger.style.display = "block";
};

miniNavItems.forEach((e) => {
	e.addEventListener("click", hideNav);
});

const cleanFormFnc = () => {
	[nameInput, emailInput, textArea].forEach((el) => {
		el.value = "";
		el.parentElement.classList.remove("error");
	});
};

// Implementacja ScrollSpy
document.addEventListener("DOMContentLoaded", function () {
	const sections = document.querySelectorAll("section");
	const navLinks = navList.querySelectorAll("a");

	// Funkcja aktualizująca aktywny link nawigacyjny
	function updateActiveLink() {
		let currentSection = "";

		// Sprawdź, która sekcja jest aktualnie w oknie przeglądarki
		sections.forEach((section) => {
			const sectionTop = section.offsetTop;
			if (scrollY >= sectionTop - 80) {
				currentSection = section.getAttribute("id");
			}
		});

		navLinks.forEach((link) => {
			link.classList.remove("active");
			if (link.getAttribute("href") === `#${currentSection}`) {
				link.classList.add("active");
			}
		});
	}

	// Nasłuchuj przewijania strony
	window.addEventListener("scroll", updateActiveLink);
});

const showError = (elementIn, msg) => {
	elementIn.parentElement.classList.add("error");
	elementIn.nextElementSibling.textContent = msg;
};

const hideError = (elementIn) => {
	elementIn.parentElement.classList.remove("error");
};

clearBtn.addEventListener("click", (e) => {
	e.preventDefault();

	cleanFormFnc();
});

// sprawdzanie formularza

const checkNameLenght = (input, length) => {
	if (input.value.length < length) {
		showError(input, "Imię jest za krótkie");
	} else {
		hideError(input);
	}
};

const checkTextarea = (elementIn) => {
	if (elementIn.value === "") {
		elementIn.parentElement.classList.add("error");
		elementIn.nextElementSibling.textContent = "wiadomość jest pusta";
	} else {
		hideError(elementIn);
	}
};

const checkInput = (elementIn) => {
	elementIn.forEach((el) => {
		if (el.value === "") {
			showError(el, el.placeholder);
		} else {
			hideError(el);
			checkNameLenght(nameInput, 3);
			checkEmail(emailInput);
		}
	});
};

const checkEmail = (email) => {
	const re =
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

	if (re.test(email.value)) {
		hideError(email);
	} else {
		showError(email, "nie prawidłowy adres email");
	}
};

// wysyłanie formularza

const checkErrors = () => {
	let currentErrors = 0;

	const formBoxes = document.querySelectorAll(".form-box");

	formBoxes.forEach((el) => {
		if (el.classList.contains("error")) {
			currentErrors++;
		}
		console.log(currentErrors);
	});
	if (currentErrors === 0) {
		popup.classList.add("show-popup");
	}
};

sendBtn.addEventListener("click", (e) => {
	e.preventDefault();

	checkTextarea(textArea);
	checkInput([nameInput, emailInput]);
	checkErrors();
});
closeBtn.addEventListener("click", (e) => {
	e.preventDefault();
	popup.classList.remove("show-popup");
	cleanFormFnc();
});
miniHamburger.addEventListener("click", showNav);
miniClose.addEventListener("click", hideNav);
