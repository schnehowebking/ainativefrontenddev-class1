"use strict";


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menuToggle");
const mainNavigation = document.getElementById("mainNavigation");

if (menuToggle && mainNavigation) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            mainNavigation.classList.toggle("is-open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });


    /*
     * Close mobile navigation
     * when clicking a navigation link.
     */
    const navLinks =
        mainNavigation.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            mainNavigation.classList.remove("is-open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        });

    });

}


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll("main section[id]");

const navigationLinks =
    document.querySelectorAll(".nav-link");

const observerOptions = {
    root: null,
    rootMargin: "-30% 0px -60% 0px",
    threshold: 0
};

const sectionObserver =
    new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) {
                return;
            }

            const currentId =
                entry.target.getAttribute("id");

            navigationLinks.forEach((link) => {

                link.classList.remove("active");

                const linkTarget =
                    link.getAttribute("href");

                if (linkTarget === `#${currentId}`) {
                    link.classList.add("active");
                }

            });

        });

    }, observerOptions);


sections.forEach((section) => {
    sectionObserver.observe(section);
});


/* =========================================
   CURRENT YEAR
========================================= */

const currentYear =
    document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent =
        new Date().getFullYear();
}


/* =========================================
   PROGRESS ANIMATION
========================================= */

const progressBar =
    document.querySelector(".progress-bar");

const progressValue =
    document.querySelector(".progress-top strong");

const progressFill =
    document.querySelector(".progress-bar span");


if (progressBar && progressFill && progressValue) {

    const progress =
        Number(progressBar.getAttribute("aria-valuenow")) || 0;

    progressFill.style.width = `${progress}%`;

    progressValue.textContent = `${progress}%`;

}


/* =========================================
   CLOSE MENU WITH ESCAPE
========================================= */

document.addEventListener("keydown", (event) => {

    if (event.key !== "Escape") {
        return;
    }

    if (
        mainNavigation &&
        mainNavigation.classList.contains("is-open")
    ) {

        mainNavigation.classList.remove("is-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        menuToggle.focus();
    }

});


/* =========================================
   PREVENT EMPTY DEMO LINKS
========================================= */

document.querySelectorAll('a[href="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {
        event.preventDefault();
    });

});