import { checkIfLoggedIn } from '../utilities/checkIfLoggedIn.js';

export function renderHeader() {
    const header = document.getElementById('header');
    const path = window.location.pathname;
    const activeClass = 'text-primary';
    const inactiveClass = 'text-black';
    
    header.innerHTML = `
      <div class="w-full max-w-screen-lg flex justify-between items-center p-4">
        <a href="/public" class="text-2xl font-bold text-primary">🐾 PetPal</a>
        <nav class="flex gap-8 text-lg items-center">
          <a href="/admin/" class="admin-btn button border border-primary text-text space-x-2 hover:bg-primary">
          <span>
            My account
          </span>
            <i class="fa-solid fa-user"></i>
          </a>
        </nav>
          <a href="/account/login/"
          class="login-btn button bg-primary ${path.includes('login') ? activeClass : inactiveClass} hover:underline">
          Login
          </a>
      </div>
    `;
    
    checkIfLoggedIn(( username ) => {
        const loginBtn = document.querySelector('.login-btn');
        const adminBtn = document.querySelector('.admin-btn');
        const adminUsername = document.querySelector('.admin-username');
        
        if (username) {
            loginBtn?.classList.add('hidden');
            adminBtn?.classList.remove('hidden');
        } else {
            loginBtn?.classList.remove('hidden');
            adminBtn?.classList.add('hidden');
        }
    });
}
