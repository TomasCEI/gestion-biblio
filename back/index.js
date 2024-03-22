import express from "express";
import { PORT, fullDomain } from "./config/config.js";
import { logger } from './middlewares/logger.js';
import { setHeaders } from "./middlewares/setHeaders.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import indexRoutes from './routes/index.routes.js';
import cors from 'cors'; // uso de cors mediante libreria externa


const app = express();
console.clear();

// Uso de MiddleWares
app.use(cors()); // Cross-Origin Resource Sharing
app.use(setHeaders);
app.use(express.json()); // procesa el json body para leer con req.body()
app.use(express.urlencoded({extended:false})); // leer datos de urlEncoded de req.body()
app.use(logger);

// app.use((req, res, next) => {
//     console.log("Middleware de inicio");
//     console.log(req.body);
//     next();
// });



// Rutas
app.get("/", (req, res)=> {
    res.setHeader("Content-Type", "text/html");
    const landingHTML = `
        <h1>Bienvenidos a nuestra API de Libros</h1>
    `;
    res.send(landingHTML);
})

app.use("/API/v1/", indexRoutes);

// Middleware de errores
app.use(errorHandler);

// Alta de Servidor
app.listen(PORT, () => {
    console.log(`server corriendo en ${fullDomain}`)
})