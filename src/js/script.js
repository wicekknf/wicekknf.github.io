const navBottom = document.querySelector(".nav-bottom");
const burgerBtn = document.querySelector(".burger-btn");
const bars = document.querySelector(".bars");
const barsX = document.querySelector(".bars-x");
const navBottomLinks = document.querySelectorAll(".menu-list a");
const year = document.querySelector(".year");

console.log(navBottomLinks);

const currentYear = new Date().getFullYear();

year.textContent = currentYear;

// Function for show mini nav
const showMinNav = () => {
	barsX.classList.add("active-bars-x");
	navBottom.classList.add("show-miniNav");
};

// Function for hide mini nav
const hideMiniVav = () => {
	barsX.classList.remove("active-bars-x");
	navBottom.classList.remove("show-miniNav");
};

// Managing hide and show mini nav by bars
const handleMiniNav = () => {
	bars.classList.toggle("hide-bars");
	if (bars.classList.contains("hide-bars")) {
		showMinNav();
	} else {
		hideMiniVav();
	}
};

// Managing show and hide mini nav by links
const handleLinksNav = () => {
	navBottomLinks.forEach((e) =>
		e.addEventListener("click", function hideMiniVavByLink() {
			hideMiniVav();
			bars.classList.remove("hide-bars");
		})
	);
};

handleLinksNav();
burgerBtn.addEventListener("click", handleMiniNav);
