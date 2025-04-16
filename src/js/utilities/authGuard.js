import { checkIfLoggedIn } from "./checkIfLoggedIn.js";

export function authGuard() {
    checkIfLoggedIn((username) => {
        if (!username) {
            document.body.classList.add("overflow-hidden");

            const overlay = document.createElement("div");
            overlay.id = "auth-guard-overlay";
            overlay.className = `
                fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center
            `;

            overlay.innerHTML = `
                <div class="bg-white p-8 rounded-xl shadow-xl text-center max-w-sm w-full">
                    <h1 class="text-lg font-semibold mb-4 text-gray-800">Access Denied</h1>
                    <p class="mb-6 text-gray-600">You must be logged in to view this page.</p>
                    <a href="/account/login/" class="bg-primary text-white px-6 py-2 rounded hover:bg-blue-700 transition-all">
                        OK
                    </a>
                </div>
            `;

            document.body.appendChild(overlay);
        }
    });
}
