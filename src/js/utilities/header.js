import {checkIfLoggedIn} from "./checkIfLoggedIn.js";

export function renderHeader() {
    const header = document.getElementById("header");
    if (!header) return;

    const path = window.location.pathname;
    const isMobile = window.innerWidth <= 480;

    const activeClass = "text-primary";
    const inactiveClass = "text-black";

    if (isMobile) {
        header.innerHTML = `
      <div class="bg-accent flex justify-between items-center py-4 w-full p-4 shadow-md">
      <a href="/" class="text-2xl font-bold text-primary">🐾 PetPal</a>
        <a href="#" class="${path.includes("search") ? activeClass : inactiveClass} text-xl">
          <i class="fas fa-search"></i>
        </a>
      </div>
    `;
    } else {
        header.innerHTML = `
      <div class="flex justify-between items-center px-8 py-4 bg-accent shadow-lg">
        <a href="/" class="text-2xl font-bold text-primary">🐾 PetPal</a>
        <nav class="flex gap-8 text-lg items-center">
          <a href="/" class="${path === "/" || path === "/index.html" ? activeClass : inactiveClass} hover:underline">Home</a>
          <a href="/account/login/" class="login-btn ${path.includes("login") ? activeClass : inactiveClass} hover:underline">Login</a>
          <span class="user-display"></span>
          <button class="logout-btn hidden"><i class="fa-solid fa-right-from-bracket"></i></button>
        </nav>
      </div>
    `;
    }
    checkIfLoggedIn((username) => {
        document.querySelector(".user-display").textContent = `Hi, ${username}`;
        document.querySelector(".logout-btn")?.classList.remove("hidden");
        document.querySelector(".login-btn")?.classList.add("hidden");
    });

}

window.addEventListener("resize", renderHeader);
