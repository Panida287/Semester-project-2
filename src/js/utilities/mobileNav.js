import { checkIfLoggedIn } from "./checkIfLoggedIn.js";

export function mobileNav() {
    const mobileNavContainer = document.querySelector("main");
    const mobileNavBar = document.createElement("nav");
    const path = window.location.pathname;
    const activeClass = "text-text bg-primary py-2 px-3 rounded-full";
    const inactiveClass = "text-text py-4 px-5";

    mobileNavBar.innerHTML = `
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
    `
    mobileNavContainer.appendChild(mobileNavBar);

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
}