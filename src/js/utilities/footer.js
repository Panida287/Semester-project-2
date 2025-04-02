import { checkIfLoggedIn } from "./checkIfLoggedIn.js";

export function renderFooter() {
    const footer = document.getElementById("footer");
    if (!footer) return;

    const path = window.location.pathname;
    const isMobile = window.innerWidth <= 480;

    const activeClass = "text-text bg-primary py-2 px-3 rounded-full";
    const inactiveClass = "text-text py-4 px-5";

    if (isMobile) {
        footer.innerHTML = `
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
    } else {
        footer.innerHTML = `
      <div class="bg-secondary text-white px-10 md:px-20 py-10 flex flex-wrap gap-10 justify-between text-sm">
        <div class="flex-1 min-w-[200px]">
          <h4 class="text-lg font-semibold mb-2">About PetPal</h4>
          <p>Helping pets find loving homes since 2025.</p>
        </div>
        <div class="flex-1 min-w-[150px]">
          <h4 class="text-lg font-semibold mb-2">Quick Links</h4>
          <ul class="space-y-1">
            <li><a href="#" class="hover:underline">Shop All</a></li>
            <li><a href="#" class="hover:underline">Custom Orders</a></li>
            <li><a href="#" class="hover:underline">About Us</a></li>
            <li><a href="#" class="hover:underline">Contact</a></li>
          </ul>
        </div>
        <div class="flex-1 min-w-[150px]">
          <h4 class="text-lg font-semibold mb-2">Support</h4>
          <ul class="space-y-1">
            <li><a href="#" class="hover:underline">FAQ</a></li>
            <li><a href="#" class="hover:underline">Shipping Info</a></li>
            <li><a href="#" class="hover:underline">Returns</a></li>
          </ul>
        </div>
        <div class="flex-1 min-w-[200px]">
          <h4 class="text-lg font-semibold mb-2">Newsletter</h4>
          <p class="mb-2">Subscribe for updates!</p>
          <form class="flex">
            <input type="email" placeholder="Your email" class="px-3 py-2 rounded-l-full w-full text-black">
            <button type="submit" class="bg-primary text-white px-4 py-2 rounded-r-full">
              <i class="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
        <div class="w-full mt-8 text-center text-xs">
          <p>© 2025 PetPal. All rights reserved.</p>
          <div class="mt-2 space-x-4 text-lg">
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-x"></i></a>
            <a href="#"><i class="fab fa-facebook"></i></a>
            <a href="#"><i class="fab fa-pinterest"></i></a>
          </div>
        </div>
      </div>
    `;
    }

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

window.addEventListener("resize", renderFooter)

