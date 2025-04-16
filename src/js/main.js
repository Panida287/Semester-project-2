import router from "./router/index.js";

/**
 * Initializes client-side routing based on the current pathname.
 *
 * This calls the `router` function with the current window's pathname,
 * dynamically loading the appropriate view module.
 */
await router(window.location.pathname);
