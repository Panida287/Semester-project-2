import {checkIfLoggedIn} from "./checkIfLoggedIn.js";

export function renderHeader() {
    const header = document.getElementById("header");
    const path = window.location.pathname;
    const activeClass = "text-primary";
    const inactiveClass = "text-black";

    header.innerHTML = `
      <div class="w-full max-w-screen-lg flex justify-between items-center p-4">
        <a href="/" class="text-2xl font-bold text-primary">🐾 PetPal</a>
        <nav class="flex gap-8 text-lg items-center">
          <a href="/account/login/" class="login-btn button bg-primary ${path.includes("login") ? activeClass : inactiveClass} hover:underline">Login</a>
          <span class="admin-username text-s translate-x-4 text-secondary"></span>
          <a href="/admin/" class="admin-btn button bg-primary"><i class="fa-solid fa-user"></i></a>
        </nav>
      </div>
    `;

        checkIfLoggedIn((username) => {
            const loginBtn = document.querySelector(".login-btn");
            const adminBtn = document.querySelector(".admin-btn");
            const adminUsername = document.querySelector(".admin-username");

            if (username) {
                loginBtn?.classList.add("hidden");
                adminBtn?.classList.remove("hidden");
                adminUsername.textContent = `Hello, ${username}`;
            } else {
                loginBtn?.classList.remove("hidden");
                adminBtn?.classList.add("hidden");
            }
        });
}
