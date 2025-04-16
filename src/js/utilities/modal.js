/**
 * Shows the info modal with a custom message.
 * @param {string} message - The message to display in the modal.
 * @param {Function} [onClose] - Optional callback after modal closes.
 */
export function showInfoModal(message, onClose) {
    const modal = document.getElementById("info-modal");
    const msgEl = document.getElementById("info-modal-message");
    const closeBtn = document.getElementById("info-modal-close");
    
    msgEl.textContent = message;
    modal.classList.remove("hidden");
    
    const closeHandler = () => {
        modal.classList.add("hidden");
        closeBtn.removeEventListener("click", closeHandler);
        if (typeof onClose === "function") onClose();
    };
    
    closeBtn.addEventListener("click", closeHandler);
}

/**
 * Shows a confirmation modal with a message and returns a Promise.
 * @param {string} message - Message to display in the confirmation modal.
 * @returns {Promise<boolean>} - Resolves to true if accepted, false if canceled.
 */
export function showConfirmModal(message = "Are you sure?") {
    return new Promise((resolve) => {
        const modal = document.getElementById("confirm-modal");
        const messageEl = document.getElementById("confirm-modal-message");
        const cancelBtn = document.getElementById("confirm-modal-cancel");
        const acceptBtn = document.getElementById("confirm-modal-accept");
        
        messageEl.textContent = message;
        modal.classList.remove("hidden");
        
        const cleanup = () => {
            modal.classList.add("hidden");
            cancelBtn.removeEventListener("click", onCancel);
            acceptBtn.removeEventListener("click", onAccept);
        };
        
        const onCancel = () => {
            cleanup();
            resolve(false);
        };
        
        const onAccept = () => {
            cleanup();
            resolve(true);
        };
        
        cancelBtn.addEventListener("click", onCancel);
        acceptBtn.addEventListener("click", onAccept);
    });
}

