const navBottom = document.querySelector(".nav-bottom");
const burgerBtn = document.querySelector(".burger-btn");
const bars = document.querySelector(".bars");
const barsX = document.querySelector(".bars-x");
const navBottomLinks = document.querySelectorAll(".menu-list a");
const year = document.querySelector(".year");

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

// Komentarze o szkoleniach
// const leftBtn1 = document.querySelector(".btn-left1");
// const rightBtn1 = document.querySelector(".btn-right1");
// const carouselComments1 = document.querySelectorAll(".courses-opinion1 div");
// const carouselSpeed = 5000;
// let index1 = 0;

// const handleCarousel1 = () => {
// 	carouselComments1[index1].style.opacity = 0;
// 	index1++;
// 	changeComment1();
// };

// let startCarousel1 = setInterval(handleCarousel1, carouselSpeed);

// const changeComment1 = () => {
// 	if (index1 > carouselComments1.length - 1) {
// 		index1 = 0;
// 	} else if (index1 < 0) {
// 		index1 = carouselComments1.length - 1;
// 	}
// 	carouselComments1[index1].style.opacity = 1;
// };

// const handleRightArrow1 = () => {
// 	carouselComments1[index1].style.opacity = 0;
// 	index1++;
// 	resetInterval1();
// }
// const handleLeftArrow1 = () => {
// 	carouselComments1[index1].style.opacity = 0;
// 	index1--;
// 	resetInterval1();
// }
// const resetInterval1 = () => {
// 	changeComment1();
// 	clearInterval(startCarousel1)
// 	startCarousel1 = setInterval(handleCarousel1, carouselSpeed);
// }
// rightBtn1.addEventListener("click", handleRightArrow1);
// leftBtn1.addEventListener("click", handleLeftArrow1);

// // Komentarze o salonie
// const leftBtn2 = document.querySelector(".btn-left2");
// const rightBtn2 = document.querySelector(".btn-right2");
// const carouselComments2 = document.querySelectorAll(".courses-opinion2 div");
// let index2 = 0;

// const handleCarousel2 = () => {
// 	carouselComments2[index2].style.opacity = 0;
// 	index2++;
// 	changeComment2();
// };

// let startCarousel2 = setInterval(handleCarousel2, carouselSpeed);

// const changeComment2 = () => {
// 	if (index2 > carouselComments2.length - 1) {
// 		index2 = 0;
// 	} else if (index2 < 0) {
// 		index2 = carouselComments2.length - 1;
// 	}
// 	carouselComments2[index2].style.opacity = 1;
// };

// const handleRightArrow2 = () => {
// 	carouselComments2[index2].style.opacity = 0;
// 	index2++;
// 	resetInterval2();
// }
// const handleLeftArrow2 = () => {
// 	carouselComments2[index2].style.opacity = 0;
// 	index2--;
// 	resetInterval2();
// }
// const resetInterval2 = () => {
// 	changeComment2();
// 	clearInterval(startCarousel2)
// 	startCarousel2 = setInterval(handleCarousel2, carouselSpeed);
// }
// rightBtn2.addEventListener("click", handleRightArrow2);
// leftBtn2.addEventListener("click", handleLeftArrow2);
