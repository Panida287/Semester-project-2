/**
 * Sets up active state styling for category filter buttons.
 *
 * When a filter button is clicked, it visually highlights the active button
 * and resets styles on the others.
 */
export function setupFilterButtonState() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    
    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            filterButtons.forEach((b) => {
                b.classList.remove("bg-orange-400", "text-white");
                b.classList.add("bg-primary", "text-text", "hover:bg-orange-400");
            });
            
            btn.classList.remove("bg-primary", "text-text", "hover:bg-orange-400");
            btn.classList.add("bg-orange-400", "text-white");
        });
    });
}
