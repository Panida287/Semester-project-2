/**
 * Applies search and category filters by calling the provided render function.
 *
 * @param {string} [search=""] - The current search term.
 * @param {string} [category=""] - The selected category filter.
 * @param {Function} renderFn - The render function to execute (e.g., renderPetCard).
 */
export function applyFilters(search = "", category = "", renderFn) {
    renderFn(null, search, category);
}

/**
 * Sets up filter controls for pet search and category buttons.
 *
 * Binds event listeners to search input and category buttons,
 * and triggers the provided render function with appropriate filters.
 *
 * @param {Object} config - Configuration for filter controls.
 * @param {string} config.searchInputId - ID of the search input element.
 * @param {string} config.catBtnId - ID of the "Cats" button.
 * @param {string} config.dogBtnId - ID of the "Dogs" button.
 * @param {string} config.otherBtnId - ID of the "Others" button.
 * @param {string} config.allBtnId - ID of the "All" button.
 * @param {Function} config.renderFn - The render function to call when filters change.
 */
export function setupFilterControls({
    searchInputId,
    catBtnId,
    dogBtnId,
    otherBtnId,
    allBtnId,
    renderFn,
}) {
    let currentSearch = "";
    let currentCategory = "";
    
    const searchInput = document.getElementById(searchInputId);
    const catBtn = document.getElementById(catBtnId);
    const dogBtn = document.getElementById(dogBtnId);
    const otherBtn = document.getElementById(otherBtnId);
    const allBtn = document.getElementById(allBtnId);
    
    function triggerFilter() {
        applyFilters(currentSearch, currentCategory, renderFn);
    }
    
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            currentSearch = e.target.value.trim();
            triggerFilter();
        });
    }
    
    if (catBtn) catBtn.addEventListener("click", () => {
        currentCategory = "cat";
        triggerFilter();
    });
    
    if (dogBtn) dogBtn.addEventListener("click", () => {
        currentCategory = "dog";
        triggerFilter();
    });
    
    if (otherBtn) otherBtn.addEventListener("click", () => {
        currentCategory = "other";
        triggerFilter();
    });
    
    if (allBtn) allBtn.addEventListener("click", () => {
        currentCategory = "";
        triggerFilter();
    });
    
    triggerFilter();
}
