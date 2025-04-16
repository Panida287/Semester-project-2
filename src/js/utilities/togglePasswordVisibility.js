/**
 * Toggles password visibility for one or more password input fields.
 *
 * This function searches for elements with the class `toggle-password`,
 * finds the associated `.password` input inside the same `.relative` container,
 * and toggles the input's `type` between "password" and "text" on click.
 * It also updates the icon to reflect the visibility state.
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
