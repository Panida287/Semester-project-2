/**
 * Handles routing based on the current pathname.
 *
 * Dynamically imports the corresponding view module based on the path.
 * Defaults to loading the Not Found page if no route matches.
 *
 * @param {string} [pathname=window.location.pathname] - The current URL path.
 */
export default async function router(pathname = window.location.pathname) {
    switch (pathname) {
        case "/":
            await import("./views/home.js");
            break;
        case "/account/login/":
            await import("./views/login.js");
            break;
        case "/account/register/":
            await import("./views/register.js");
            break;
        case "/pet/":
            await import("./views/pet.js");
            break;
        case "/pet/create/":
            await import("./views/create.js");
            break;
        case "/pet/edit/":
            await import("./views/update.js");
            break;
        case "/admin/":
            await import("./views/admin.js");
            break;
        default:
            await import("./views/notFound.js");
    }
}
