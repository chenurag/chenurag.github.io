/* =========================================================
   CHENURA GAJANAYAKE — GITHUB PORTFOLIO
   Main JavaScript
   GitHub:  https://github.com/chenurag
   YouTube: https://youtube.com/@sbchenu
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CONFIGURATION
       ===================================================== */

    const CONFIG = {
        name: "Chenura Gajanayake",
        username: "chenurag",

        github: "https://github.com/chenurag",
        youtube: "https://youtube.com/@sbchenu",

        githubApi: "https://api.github.com/users/chenurag",
        reposApi: "https://api.github.com/users/chenurag/repos?sort=updated&per_page=100",

        typingSpeed: 80,
        deleteSpeed: 45,
        typingPause: 1800
    };


    /* =====================================================
       UTILITY FUNCTIONS
       ===================================================== */

    const $ = (selector) => document.querySelector(selector);

    const $$ = (selector) => document.querySelectorAll(selector);

    function escapeHTML(value) {
        if (typeof value !== "string") return "";

        return value
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    /* =====================================================
       UPDATE PROFILE LINKS
       ===================================================== */

    function updateProfileLinks() {

        // GitHub links
        document.querySelectorAll(
            'a[href*="github.com"], [data-link="github"]'
        ).forEach(link => {
            link.href = CONFIG.github;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
        });

        // YouTube links
        document.querySelectorAll(
            'a[href*="youtube.com"], [data-link="youtube"]'
        ).forEach(link => {
            link.href = CONFIG.youtube;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
        });

        // Elements containing GitHub username
        document.querySelectorAll("[data-github-username]").forEach(element => {
            element.textContent = CONFIG.username;
        });

        // Elements containing YouTube handle
        document.querySelectorAll("[data-youtube-handle]").forEach(element => {
            element.textContent = "@sbchenu";
        });
    }


    /* =====================================================
       TYPING EFFECT
       ===================================================== */

    function initTypingEffect() {

        const typingElement =
            $("#typing-text") ||
            $(".typing-text") ||
            $("#typed-text");

        if (!typingElement) return;

        const roles = [
            "Cybersecurity Undergraduate",
            "Cybersecurity Enthusiast",
            "SOC Analyst",
            "Ethical Hacker",
            "Security Researcher",
            "Future Cybersecurity Engineer"
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function type() {

            const currentRole = roles[roleIndex];

            if (!deleting) {

                typingElement.textContent =
                    currentRole.substring(0, charIndex + 1);

                charIndex++;

                if (charIndex === currentRole.length) {

                    deleting = true;

                    setTimeout(type, CONFIG.typingPause);

                    return;
                }

                setTimeout(type, CONFIG.typingSpeed);

            } else {

                typingElement.textContent =
                    currentRole.substring(0, charIndex - 1);

                charIndex--;

                if (charIndex === 0) {

                    deleting = false;

                    roleIndex =
                        (roleIndex + 1) % roles.length;

                    setTimeout(type, 500);

                    return;
                }

                setTimeout(type, CONFIG.deleteSpeed);
            }
        }

        type();
    }


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    function initMobileMenu() {

        const menuButton =
            $("#menu-toggle") ||
            $(".menu-toggle") ||
            $(".hamburger");

        const nav =
            $("nav") ||
            $(".nav-links") ||
            $(".navbar-links");

        if (!menuButton || !nav) return;

        menuButton.addEventListener("click", () => {

            nav.classList.toggle("active");
            menuButton.classList.toggle("active");

        });

        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("active");
                menuButton.classList.remove("active");

            });

        });
    }


    /* =====================================================
       SMOOTH SCROLLING
       ===================================================== */

    function initSmoothScrolling() {

        document.querySelectorAll('a[href^="#"]').forEach(link => {

            link.addEventListener("click", function (event) {

                const targetID = this.getAttribute("href");

                if (!targetID || targetID === "#") return;

                const target = document.querySelector(targetID);

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });
    }


    /* =====================================================
       NAVBAR SCROLL EFFECT
       ===================================================== */

    function initNavbarScroll() {

        const navbar =
            $("header") ||
            $("nav") ||
            $(".navbar");

        if (!navbar) return;

        window.addEventListener("scroll", () => {

            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }

        });
    }


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    function initActiveNavigation() {

        const sections = $$("section[id]");
        const navLinks = $$('a[href^="#"]');

        if (!sections.length || !navLinks.length) return;

        window.addEventListener("scroll", () => {

            let currentSection = "";

            sections.forEach(section => {

                const sectionTop =
                    section.offsetTop - 150;

                if (window.scrollY >= sectionTop) {
                    currentSection = section.id;
                }

            });

            navLinks.forEach(link => {

                link.classList.remove("active");

                if (
                    link.getAttribute("href") ===
                    `#${currentSection}`
                ) {
                    link.classList.add("active");
                }

            });

        });
    }


    /* =====================================================
       GITHUB PROFILE
       ===================================================== */

    async function loadGitHubProfile() {

        try {

            const response =
                await fetch(CONFIG.githubApi);

            if (!response.ok) {
                throw new Error("GitHub profile unavailable");
            }

            const data =
                await response.json();

            const avatar =
                $("#github-avatar") ||
                $(".github-avatar");

            const followers =
                $("#github-followers") ||
                $(".github-followers");

            const following =
                $("#github-following") ||
                $(".github-following");

            const repositories =
                $("#github-repositories") ||
                $(".github-repositories");

            const publicRepos =
                $("#public-repos") ||
                $(".public-repos");

            if (avatar && data.avatar_url) {
                avatar.src = data.avatar_url;
                avatar.alt =
                    `${CONFIG.name} GitHub profile`;
            }

            if (followers) {
                followers.textContent =
                    data.followers ?? 0;
            }

            if (following) {
                following.textContent =
                    data.following ?? 0;
            }

            if (repositories) {
                repositories.textContent =
                    data.public_repos ?? 0;
            }

            if (publicRepos) {
                publicRepos.textContent =
                    data.public_repos ?? 0;
            }

        } catch (error) {

            console.warn(
                "Unable to load GitHub profile:",
                error
            );

        }
    }


    /* =====================================================
       GITHUB REPOSITORIES
       ===================================================== */

    async function loadGitHubRepositories() {

        const container =
            $("#github-projects") ||
            $(".github-projects") ||
            $("#projects-container");

        if (!container) return;

        try {

            const response =
                await fetch(CONFIG.reposApi);

            if (!response.ok) {
                throw new Error("GitHub repositories unavailable");
            }

            const repositories =
                await response.json();

            if (!Array.isArray(repositories)) return;

            const filteredRepos =
                repositories
                    .filter(repo => !repo.fork)
                    .slice(0, 6);

            if (!filteredRepos.length) {
                container.innerHTML =
                    `<p>No public projects found.</p>`;
                return;
            }

            container.innerHTML =
                filteredRepos.map(repo => {

                    const description =
                        repo.description ||
                        "Cybersecurity and technology project.";

                    const language =
                        repo.language ||
                        "Code";

                    return `
                        <article class="project-card">

                            <div class="project-icon">
                                <i class="fab fa-github"></i>
                            </div>

                            <h3>
                                ${escapeHTML(repo.name)}
                            </h3>

                            <p>
                                ${escapeHTML(description)}
                            </p>

                            <div class="project-meta">

                                <span>
                                    <i class="fas fa-code"></i>
                                    ${escapeHTML(language)}
                                </span>

                                <span>
                                    <i class="fas fa-star"></i>
                                    ${repo.stargazers_count || 0}
                                </span>

                            </div>

                            <a
                                href="${repo.html_url}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="project-link"
                            >
                                View Project
                                <i class="fas fa-arrow-right"></i>
                            </a>

                        </article>
                    `;

                }).join("");

        } catch (error) {

            console.warn(
                "Unable to load GitHub repositories:",
                error
            );

            container.innerHTML = `
                <p>
                    GitHub projects could not be loaded.
                    <a
                        href="${CONFIG.github}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View them on GitHub
                    </a>
                </p>
            `;
        }
    }


    /* =====================================================
       GITHUB BUTTON
       ===================================================== */

    function createGitHubButton() {

        const buttons =
            $$("[data-github-button]");

        buttons.forEach(button => {

            button.addEventListener("click", () => {

                window.open(
                    CONFIG.github,
                    "_blank",
                    "noopener,noreferrer"
                );

            });

        });
    }


    /* =====================================================
       YOUTUBE BUTTON
       ===================================================== */

    function createYouTubeButton() {

        const buttons =
            $$("[data-youtube-button]");

        buttons.forEach(button => {

            button.addEventListener("click", () => {

                window.open(
                    CONFIG.youtube,
                    "_blank",
                    "noopener,noreferrer"
                );

            });

        });
    }


    /* =====================================================
       COPY GITHUB USERNAME
       ===================================================== */

    function initCopyUsername() {

        const copyButtons =
            $$("[data-copy-github]");

        copyButtons.forEach(button => {

            button.addEventListener("click", async () => {

                try {

                    await navigator.clipboard.writeText(
                        CONFIG.username
                    );

                    const original =
                        button.textContent;

                    button.textContent =
                        "Copied!";

                    setTimeout(() => {
                        button.textContent =
                            original;
                    }, 1500);

                } catch (error) {

                    console.warn(
                        "Clipboard unavailable"
                    );

                }

            });

        });
    }


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    function initScrollReveal() {

        const elements =
            $$(".reveal, .fade-in, .project-card, .skill-card");

        if (!elements.length) return;

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );

        elements.forEach(element => {
            observer.observe(element);
        });
    }


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    function setCurrentYear() {

        const year =
            new Date().getFullYear();

        $$("[data-year], #current-year, .current-year")
            .forEach(element => {
                element.textContent = year;
            });
    }


    /* =====================================================
       CONTACT FORM
       ===================================================== */

    function initContactForm() {

        const form =
            $("#contact-form") ||
            $(".contact-form");

        if (!form) return;

        form.addEventListener("submit", event => {

            event.preventDefault();

            const name =
                form.querySelector('[name="name"]');

            const email =
                form.querySelector('[name="email"]');

            const message =
                form.querySelector('[name="message"]');

            if (!name || !email || !message) {
                return;
            }

            if (
                !name.value.trim() ||
                !email.value.trim() ||
                !message.value.trim()
            ) {

                alert(
                    "Please fill in all fields."
                );

                return;
            }

            const subject =
                encodeURIComponent(
                    `Portfolio Contact from ${name.value}`
                );

            const body =
                encodeURIComponent(
                    `Name: ${name.value}\n\n` +
                    `Email: ${email.value}\n\n` +
                    `Message:\n${message.value}`
                );

            window.location.href =
                `mailto:your-email@example.com?subject=${subject}&body=${body}`;

        });
    }


    /* =====================================================
       BACK TO TOP
       ===================================================== */

    function initBackToTop() {

        const button =
            $("#back-to-top") ||
            $(".back-to-top");

        if (!button) return;

        window.addEventListener("scroll", () => {

            if (window.scrollY > 400) {
                button.classList.add("show");
            } else {
                button.classList.remove("show");
            }

        });

        button.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });
    }


    /* =====================================================
       PARTICLE / MATRIX EFFECT
       ===================================================== */

    function initMatrixEffect() {

        const canvas =
            $("#matrix") ||
            $("#matrix-canvas");

        if (!canvas) return;

        const ctx =
            canvas.getContext("2d");

        if (!ctx) return;

        let width;
        let height;
        let columns;
        let drops;

        const fontSize = 14;

        function resize() {

            width =
                canvas.width =
                window.innerWidth;

            height =
                canvas.height =
                window.innerHeight;

            columns =
                Math.floor(
                    width / fontSize
                );

            drops =
                Array(columns).fill(1);
        }

        resize();

        window.addEventListener(
            "resize",
            resize
        );

        function draw() {

            ctx.fillStyle =
                "rgba(0, 0, 0, 0.05)";

            ctx.fillRect(
                0,
                0,
                width,
                height
            );

            ctx.fillStyle =
                "#00ff88";

            ctx.font =
                `${fontSize}px monospace`;

            const characters =
                "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";

            for (
                let i = 0;
                i < drops.length;
                i++
            ) {

                const character =
                    characters[
                        Math.floor(
                            Math.random() *
                            characters.length
                        )
                    ];

                ctx.fillText(
                    character,
                    i * fontSize,
                    drops[i] * fontSize
                );

                if (
                    drops[i] * fontSize >
                    height &&
                    Math.random() > 0.975
                ) {
                    drops[i] = 0;
                }

                drops[i]++;
            }

            requestAnimationFrame(draw);
        }

        draw();
    }


    /* =====================================================
       SECURITY CONSOLE
       ===================================================== */

    function initSecurityConsole() {

        const consoleElement =
            $("#security-console") ||
            $(".security-console");

        if (!consoleElement) return;

        const messages = [
            "[+] Initializing security modules...",
            "[+] Loading cybersecurity profile...",
            "[+] Connecting to GitHub...",
            "[+] GitHub user: chenurag",
            "[+] Loading repositories...",
            "[+] YouTube: @sbchenu",
            "[+] Systems initialized.",
            "[+] Portfolio ready."
        ];

        let index = 0;

        function addMessage() {

            if (index >= messages.length) {
                return;
            }

            const line =
                document.createElement("div");

            line.className =
                "console-line";

            line.textContent =
                messages[index];

            consoleElement.appendChild(line);

            index++;

            setTimeout(
                addMessage,
                500
            );
        }

        addMessage();
    }


    /* =====================================================
       EXTERNAL LINK SECURITY
       ===================================================== */

    function secureExternalLinks() {

        document
            .querySelectorAll('a[target="_blank"]')
            .forEach(link => {

                link.rel =
                    "noopener noreferrer";

            });
    }


    /* =====================================================
       INITIALIZE EVERYTHING
       ===================================================== */

    updateProfileLinks();

    initTypingEffect();

    initMobileMenu();

    initSmoothScrolling();

    initNavbarScroll();

    initActiveNavigation();

    loadGitHubProfile();

    loadGitHubRepositories();

    createGitHubButton();

    createYouTubeButton();

    initCopyUsername();

    initScrollReveal();

    setCurrentYear();

    initContactForm();

    initBackToTop();

    initMatrixEffect();

    initSecurityConsole();

    secureExternalLinks();


    /* =====================================================
       GLOBAL PORTFOLIO OBJECT
       ===================================================== */

    window.ChenuraPortfolio = {

        name: CONFIG.name,

        github: CONFIG.github,

        githubUsername: CONFIG.username,

        youtube: CONFIG.youtube,

        youtubeHandle: "@sbchenu",

        reloadGitHub: loadGitHubProfile,

        reloadRepositories: loadGitHubRepositories

    };


    console.log(
        "%c Chenura Gajanayake ",
        "background:#00ff88;color:#000;font-weight:bold;padding:5px;"
    );

    console.log(
        "GitHub:",
        CONFIG.github
    );

    console.log(
        "YouTube:",
        CONFIG.youtube
    );

});
