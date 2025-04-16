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
