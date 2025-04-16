/**
 * Sets up a media preview dynamically based on user input and programmatic updates.
 *
 * @param {HTMLInputElement} imageUrlInput - The media URL input element.
 * @param {HTMLImageElement} previewImage - The image element for the preview.
 * @param {string} [title=""] - The title of the pet (used as alt text).
 */
export function setupPreview(imageUrlInput, previewImage, title = "") {
    const updatePreview = () => {
        const url = imageUrlInput.value.trim();
        
        if (url) {
            previewImage.src = url;
            previewImage.alt = title || "Image Preview";
            previewImage.classList.remove("hidden");
        } else {
            previewImage.src = "";
            previewImage.alt = "";
            previewImage.classList.add("hidden");
        }
    };
    
    updatePreview();
    
    imageUrlInput.addEventListener("input", updatePreview);
}
