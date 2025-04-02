/**
 * Toggles password visibility for one or more password fields.
 */
export function setupPasswordToggles() {
    const toggleButtons = document.querySelectorAll(".toggle-password");

    toggleButtons.forEach((toggleBtn) => {
        const input = toggleBtn.closest(".relative")?.querySelector(".password");

        if (!input) return;

        toggleBtn.addEventListener("click", () => {
            const isPassword = input.type === "password";
            input.type = isPassword ? "text" : "password";

            toggleBtn.innerHTML = isPassword
                ? '<i class="fas fa-eye-slash"></i>'
                : '<i class="fas fa-eye"></i>';
        });
    });
}


