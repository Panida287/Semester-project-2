import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    appType: "mpa",
    base: "",
    build: {
        target: "esnext",
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, "index.html"),
                login: path.resolve(__dirname, "account/login/index.html"),
                register: path.resolve(__dirname, "account/register/index.html"),
                admin: path.resolve(__dirname, "admin/index.html"),
                pet: path.resolve(__dirname, "pet/index.html"),
                create: path.resolve(__dirname, "pet/create/index.html"),
                edit: path.resolve(__dirname, "pet/edit/index.html"),
            },
        },
    },
});