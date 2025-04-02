import { checkIfLoggedIn } from "./checkIfLoggedIn.js";

export function mobileNav() {
    const container = document.querySelector("main");

    const renderMobileNav = () => {
        const existingNav = document.getElementById("mobile-nav");

        if (window.innerWidth <= 480) {
            if (existingNav) return; // already rendered

            const nav = document.createElement("div");
            nav.id = "mobile-nav";

            const path = window.location.pathname;
            const activeClass = "text-text bg-primary py-2 px-3 rounded-full";
            const inactiveClass = "text-text py-4 px-5";

            nav.innerHTML = `
                <div class="fixed bottom-0 bg-accent flex justify-around items-center py-3 rounded-full w-64 h-16 z-50 my-2 translate-x-1/2 right-1/2 drop-shadow-lg">
                    <a href="/" class="${path === "/" || path === "/index.html" ? activeClass : inactiveClass} text-xl">
                        <i class="fa-solid fa-paw"></i>
                    </a>
                    <a href="#" class="${path.includes("favourite") ? activeClass : inactiveClass} text-xl">
                        <i class="fa-solid fa-heart"></i>
                    </a>
                    <a href="/account/login/" class="mobile-login-btn ${path.includes("login") ? activeClass : inactiveClass} text-xl">
                        <i class="fa-solid fa-right-to-bracket"></i>
                    </a>
                    <a href="/admin/" class="mobile-admin-btn ${path.includes("admin") ? activeClass : inactiveClass} text-xl">
                        <i class="fa-solid fa-user"></i>
                    </a>
                </div>
            `;

            container.appendChild(nav);

            checkIfLoggedIn((username) => {
                const loginBtn = document.querySelector(".mobile-login-btn");
                const adminBtn = document.querySelector(".mobile-admin-btn");

                if (username) {
                    loginBtn?.classList.add("hidden");
                    adminBtn?.classList.remove("hidden");
                } else {
                    loginBtn?.classList.remove("hidden");
                    adminBtn?.classList.add("hidden");
                }
            });
        } else {
            if (existingNav) {
                existingNav.remove();
            }
        }
    };

    renderMobileNav(); // initial render
    window.addEventListener("resize", renderMobileNav); // responsive handling
}
