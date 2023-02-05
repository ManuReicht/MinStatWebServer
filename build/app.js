"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// Manuel Reicht 5A NVSV
//script erstellt in package.json
//"start": "npx tsc && node build/app.js",
//kompilieren: npx tsc
//starten: node build/app.js
console.log(1234);
const app = (0, express_1.default)();
// PORT kommt aus .env
const PORT = Number(process.env.PORT) || 3000;
const options = {
    dotfiles: "ignore",
    etag: true,
    extensions: ["htm", "html"],
    index: false,
    redirect: false,
};
//public folder auf gleicher ebene wie src oder build
app.use(express_1.default.static("public"));
//einfacher get request
//Type kommt von typescript
//Type hilft für Autocompetion und Fehlerbehebung
app.get('/', (req, res, next) => {
    //res.send('Hello World!')
    let img = `<img src="/img/IMG_2174.jpg" height="400px">`;
    let secret = `<a href="/.htaccess">secret</a>"`;
    let html = `<!DOCTYPE html><html><head><title>Static Files</title></head><body>`;
    html += `<h1>Static Files</h1><main>${img}<br>${secret}</main>`;
    html += `</body></html>`;
    res.send(html);
});
//Daumenregel: Um Types zu installieren, @types/PACKAGENAME verwenden
//Errors
app.use((req, res, next) => {
    next(new http_errors_1.default.NotFound());
});
const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message
    });
};
app.use(errorHandler);
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
