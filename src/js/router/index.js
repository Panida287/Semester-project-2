export default async function router(pathname = window.location.pathname) {
    switch (pathname) {
        case "/":
            await import("./views/home.js");
            break;
        case "/auth/":
            await import("./views/auth.js");
            break;
        case "/auth/login/":
            await import("./views/login.js");
            break;
        case "/auth/register/":
            await import("./views/register.js");
            break;
        case "/pet/":
            await import("./views/pet.js");
            break;
        case "/admin/":
            await import("./views/admin.js");
            break;
        default:
            await import("./views/notFound.js");
    }
}
