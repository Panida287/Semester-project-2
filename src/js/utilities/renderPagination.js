/**
 * Renders pagination controls based on metadata and handles page navigation.
 *
 * @param {Object} meta - Metadata containing pagination info (e.g., page, pageCount).
 * @param {Function} onPageClick - Callback to execute when a page is clicked.
 */
export function renderPagination(meta, onPageClick) {
    const container = document.getElementById("pagination-container");
    container.innerHTML = "";
    
    const currentPage = meta?.page || meta?.currentPage || 1;
    const totalPages = meta?.pageCount || meta?.totalPages || 1;
    
    const scrollToCards = () => {
        document.querySelector(".search-form")?.scrollIntoView({ behavior: "smooth" });
    };
    
    const createButton = (label, targetPage, disabled = false) => {
        const btn = document.createElement("button");
        btn.textContent = label;
        btn.className = `
            px-4 py-2 mx-1 rounded-md border border-gray-300 transition
            ${disabled ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "hover:bg-primary hover:text-white"}
        `.trim();
        btn.disabled = disabled;
        if (!disabled) {
            btn.addEventListener("click", () => {
                onPageClick(targetPage);
                scrollToCards();
            });
        }
        return btn;
    };
    
    container.appendChild(createButton("«", 1, currentPage === 1));
    container.appendChild(createButton("‹", currentPage - 1, currentPage === 1));
    
    const label = document.createElement("div");
    label.textContent = `${currentPage} / ${totalPages}`;
    label.className = "text-center text-gray-600 font-medium mx-4 px-2";
    container.appendChild(label);
    
    container.appendChild(createButton("›", currentPage + 1, currentPage === totalPages));
    container.appendChild(createButton("»", totalPages, currentPage === totalPages));
}
