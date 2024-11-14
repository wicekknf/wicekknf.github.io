const navBottom = document.querySelector(".nav-bottom");
const burgerBtn = document.querySelector(".burger-btn");
const bars = document.querySelector(".bars");
const barsX = document.querySelector(".bars-x");
const navBottomLinks = document.querySelectorAll(".menu-list a");
const year = document.querySelector(".year");

console.log(navBottomLinks);

const currentYear = new Date().getFullYear();

year.textContent = currentYear;

const showMiniNav = () => {
	bars.classList.toggle("hide-bars");
	if (bars.classList.contains("hide-bars")) {
		barsX.classList.add("active-bars-x");
		navBottom.classList.add("show-miniNav");
	} else {
		barsX.classList.remove("active-bars-x");
		navBottom.classList.remove("show-miniNav");
	}
};

burgerBtn.addEventListener("click", showMiniNav);
