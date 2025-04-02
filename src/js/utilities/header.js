import {checkIfLoggedIn} from "./checkIfLoggedIn.js";

export function renderHeader() {
    const header = document.getElementById("header");
    const path = window.location.pathname;
    const activeClass = "text-primary";
    const inactiveClass = "text-black";

    header.innerHTML = `
      <div class="flex justify-between items-center p-4 bg-accent shadow-lg">
        <a href="/" class="text-2xl font-bold text-primary">🐾 PetPal</a>
        <nav class="flex gap-8 text-lg items-center">
          <a href="/account/login/" class="login-btn button bg-primary ${path.includes("login") ? activeClass : inactiveClass} hover:underline">Login</a>
          <a href="/admin/" class="admin-btn button bg-primary"><i class="fa-solid fa-user"></i></a>
        </nav>
      </div>
    `;

        checkIfLoggedIn((username) => {
            const loginBtn = document.querySelector(".login-btn");
            const adminBtn = document.querySelector(".admin-btn");

            if (username) {
                loginBtn?.classList.add("hidden");
                adminBtn?.classList.remove("hidden");
            } else {
                loginBtn?.classList.remove("hidden");
                adminBtn?.classList.add("hidden");
            }
        });
}
