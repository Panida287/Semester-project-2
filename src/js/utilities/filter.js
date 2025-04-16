export function applyFilters(search = "", category = "", renderFn) {
    renderFn(null, search, category);
}

/**
 * Binds search and category filter listeners to the provided elements and render function.
 * @param {Object} config - Configuration object
 * @param {string} config.searchInputId - ID of search input
 * @param {string} config.catBtnId - ID of "Cat" filter button
 * @param {string} config.dogBtnId - ID of "Dog" filter button
 * @param {string} config.otherBtnId - ID of "Other" filter button
 * @param {string} config.allBtnId - ID of "All" filter button
 * @param {Function} config.renderFn - Render function to call (e.g., renderPetCard)
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