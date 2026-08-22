/* =========================================================
   CHENURA GAJANAYAKE — CYBERSECURITY PORTFOLIO
   Main JavaScript
   ========================================================= */

"use strict";


/* =========================================================
   1. SMOOTH SCROLLING
   ========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   2. SCROLL REVEAL ANIMATIONS
   ========================================================= */

const revealElements = document.querySelectorAll(
    ".skill-card, .project-card, .timeline-item, .github-card"
);


const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.08
    }
);


revealElements.forEach((element) => {

    element.style.opacity = "0";

    element.style.transform = "translateY(25px)";

    element.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";

    revealObserver.observe(element);

});


/* =========================================================
   3. APPLY VISIBLE STATE
   ========================================================= */

const revealStyle = document.createElement("style");

revealStyle.textContent = `
    .skill-card.visible,
    .project-card.visible,
    .timeline-item.visible,
    .github-card.visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;

document.head.appendChild(revealStyle);


/* =========================================================
   4. NAVIGATION ACTIVE SECTION
   ========================================================= */

const sections = document.querySelectorAll("section[id]");

const navigationLinks = document.querySelectorAll(
    ".nav-links a"
);


const sectionObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                const currentId = entry.target.getAttribute("id");

                navigationLinks.forEach((link) => {

                    link.classList.remove("active");

                    if (
                        link.getAttribute("href") ===
                        "#" + currentId
                    ) {
                        link.classList.add("active");
                    }

                });

            }

        });

    },
    {
        rootMargin: "-35% 0px -55% 0px"
    }
);


sections.forEach((section) => {

    sectionObserver.observe(section);

});


/* =========================================================
   5. ACTIVE NAVIGATION STYLE
   ========================================================= */

const activeNavStyle = document.createElement("style");

activeNavStyle.textContent = `
    .nav-links a {
        transition: color 0.2s ease;
    }

    .nav-links a.active {
        color: #00ff88;
    }
`;

document.head.appendChild(activeNavStyle);


/* =========================================================
   6. TERMINAL TYPING EFFECT
   ========================================================= */

const terminalLines = [
    "whoami",
    "cat mission.txt",
    "./status.sh"
];


let terminalIndex = 0;


/* =========================================================
   7. TERMINAL CURSOR
   ========================================================= */

const cursor = document.querySelector(".cursor");

if (cursor) {

    setInterval(() => {

        cursor.style.opacity =
            cursor.style.opacity === "0" ? "1" : "0";

    }, 500);

}


/* =========================================================
   8. CURRENT YEAR
   ========================================================= */

const currentYear = new Date().getFullYear();

document.querySelectorAll("footer").forEach((footer) => {

    footer.innerHTML = footer.innerHTML.replace(
        /©\s*\d{4}/,
        `© ${currentYear}`
    );

});


/* =========================================================
   9. GITHUB CONTRIBUTION SNAKE FALLBACK
   ========================================================= */

const snakeImage = document.querySelector(
    ".snake-wrap img"
);

if (snakeImage) {

    snakeImage.addEventListener("error", () => {

        snakeImage.style.display = "none";

        const snakeMessage =
            document.querySelector(".snake-wrap p");

        if (snakeMessage) {

            snakeMessage.textContent =
                "GitHub contribution snake is currently unavailable. Configure the GitHub Actions snake workflow to display it here.";

        }

    });

}


/* =========================================================
   10. CARD HOVER EFFECT
   ========================================================= */

const cards = document.querySelectorAll(
    ".skill-card, .project-card"
);


cards.forEach((card) => {

    card.addEventListener("mouseenter", () => {

        card.style.transform =
            "translateY(-5px)";

    });


    card.addEventListener("mouseleave", () => {

        if (card.classList.contains("visible")) {

            card.style.transform =
                "translateY(0)";

        }

    });

});


/* =========================================================
   11. TERMINAL STATUS
   ========================================================= */

const statusText = document.querySelector(".status");

if (statusText) {

    const statuses = [
        "● AVAILABLE FOR LEARNING & BUILDING",
        "● SYSTEM SECURE",
        "● CYBERSPACE ONLINE",
        "● READY TO BUILD"
    ];

    let statusIndex = 0;

    setInterval(() => {

        statusIndex =
            (statusIndex + 1) % statuses.length;

        statusText.textContent =
            statuses[statusIndex];

    }, 4000);

}


/* =========================================================
   12. SCROLL PROGRESS BAR
   ========================================================= */

const progressBar =
    document.createElement("div");

progressBar.id = "scroll-progress";

progressBar.style.position = "fixed";
progressBar.style.top = "0";
progressBar.style.left = "0";
progressBar.style.height = "2px";
progressBar.style.width = "0%";
progressBar.style.background = "#00ff88";
progressBar.style.zIndex = "9999";
progressBar.style.boxShadow =
    "0 0 10px #00ff88";

document.body.appendChild(progressBar);


window.addEventListener("scroll", () => {

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const scrollPercentage =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

    progressBar.style.width =
        scrollPercentage + "%";

});


/* =========================================================
   13. BACK TO TOP BUTTON
   ========================================================= */

const backToTop =
    document.createElement("button");

backToTop.id = "back-to-top";

backToTop.innerHTML = "↑";

backToTop.setAttribute(
    "aria-label",
    "Back to top"
);

backToTop.style.position = "fixed";
backToTop.style.right = "25px";
backToTop.style.bottom = "25px";
backToTop.style.width = "42px";
backToTop.style.height = "42px";
backToTop.style.border = "1px solid #1b222c";
backToTop.style.borderRadius = "6px";
backToTop.style.background = "#0b0e12";
backToTop.style.color = "#00ff88";
backToTop.style.fontSize = "20px";
backToTop.style.cursor = "pointer";
backToTop.style.opacity = "0";
backToTop.style.pointerEvents = "none";
backToTop.style.transition =
    "all 0.25s ease";
backToTop.style.zIndex = "100";

document.body.appendChild(backToTop);


window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.style.opacity = "1";

        backToTop.style.pointerEvents =
            "auto";

    } else {

        backToTop.style.opacity = "0";

        backToTop.style.pointerEvents =
            "none";

    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================================
   14. MOBILE NAVIGATION
   ========================================================= */

const nav = document.querySelector(".nav");

const navLinks = document.querySelector(".nav-links");


if (nav && navLinks && window.innerWidth <= 700) {

    const menuButton =
        document.createElement("button");

    menuButton.innerHTML = "☰";

    menuButton.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

    menuButton.style.background = "none";
    menuButton.style.border = "1px solid #1b222c";
    menuButton.style.color = "#00ff88";
    menuButton.style.fontSize = "20px";
    menuButton.style.padding = "6px 10px";
    menuButton.style.cursor = "pointer";

    nav.appendChild(menuButton);


    menuButton.addEventListener("click", () => {

        navLinks.classList.toggle(
            "mobile-open"
        );

    });


    navLinks.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.classList.remove(
                "mobile-open"
            );

        });

    });

}


/* =========================================================
   15. CONSOLE EASTER EGG
   ========================================================= */

console.log(
    "%c CHENURA GAJANAYAKE ",
    "color:#00ff88;font-size:20px;font-weight:bold;"
);

console.log(
    "%c Cybersecurity Portfolio ",
    "color:#00c2ff;font-size:14px;"
);

console.log(
    "%c Learn. Build. Secure. Repeat.",
    "color:#8b96a5;font-size:12px;"
);


/* =========================================================
   PORTFOLIO INITIALIZED
   ========================================================= */

console.log(
    "[+] Portfolio JavaScript initialized successfully."
);
