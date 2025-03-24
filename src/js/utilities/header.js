export function renderHeader() {
    const header = document.getElementById("header");
    if (!header) return;

    const path = window.location.pathname;
    const isMobile = window.innerWidth <= 480;

    const activeClass = "text-[#8D6748]";
    const inactiveClass = "text-black";

    if (isMobile) {
        header.innerHTML = `
      <div class="bg-[#F4A261] flex justify-around items-center py-4 w-full">
        <a href="/" class="${path === '/' || path === '/index.html' ? activeClass : inactiveClass} text-xl">
          <i class="fas fa-home"></i>
        </a>
        <a href="/listing" class="${path.includes('listing') ? activeClass : inactiveClass} text-xl">
          <i class="fas fa-bag-shopping"></i>
        </a>
        <a href="#" class="${path.includes('search') ? activeClass : inactiveClass} text-xl">
          <i class="fas fa-search"></i>
        </a>
      </div>
    `;
    } else {
        header.innerHTML = `
      <div class="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <a href="/" class="text-2xl font-bold text-[#F4A261]">🐾 PetPal</a>
        <nav class="flex gap-8 text-lg">
          <a href="/" class="${path === '/' || path === '/index.html' ? activeClass : inactiveClass} hover:underline">Home</a>
          <a href="/listing" class="${path.includes('listing') ? activeClass : inactiveClass} hover:underline">Browse</a>
          <a href="/#" class="${path.includes('search') ? activeClass : inactiveClass} hover:underline">Search</a>
          <a href="/login.html" class="${path.includes('login') ? activeClass : inactiveClass} hover:underline">Login</a>
        </nav>
      </div>
    `;
    }
}

window.addEventListener("resize", renderHeader);
