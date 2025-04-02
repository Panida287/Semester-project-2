export function getIdFromUrl(petId) {
    const params = new URLSearchParams(window.location.search);
    return params.get(petId);
}