import { checkIfLoggedIn } from '../utilities/checkIfLoggedIn.js';

/**
 * Dynamically renders the header/navigation bar based on user login state.
 * Adds proper accessibility attributes and highlights the active page.
 */
export function renderHeader() {
    const header = document.getElementById('header');
    const path = window.location.pathname;
    const activeClass = 'text-primary';
    const inactiveClass = 'text-black';
    
    header.innerHTML = `
    <div class="w-full max-w-screen-xl flex justify-between items-center p-4" role="navigation" aria-label="Main navigation">
      <a href="/" class="text-2xl font-bold text-primary" aria-label="Go to homepage">🐾 PetPal</a>
      
      <nav class="flex gap-8 text-lg items-center" aria-label="User navigation">
        <a href="/admin/" class="admin-btn button border border-primary text-text space-x-2 hover:bg-primary hidden" aria-label="Go to your account page">
          <span>My account</span>
          <i class="fa-solid fa-user" aria-hidden="true"></i>
        </a>
      </nav>

      <a href="/account/login/"
         class="login-btn button bg-primary ${path.includes('login') ? activeClass : inactiveClass} hover:underline"
         aria-label="Login to your account">
         Login
      </a>
    </div>
  `;
    
    // Toggle visibility of login/admin buttons based on auth state
    checkIfLoggedIn((username) => {
        const loginBtn = document.querySelector('.login-btn');
        const adminBtn = document.querySelector('.admin-btn');
        
        if (username) {
            loginBtn?.classList.add('hidden');
            adminBtn?.classList.remove('hidden');
        } else {
            loginBtn?.classList.remove('hidden');
            adminBtn?.classList.add('hidden');
        }
    });
}
