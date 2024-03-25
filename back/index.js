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
// Nos permite acceder a los archivos de nuestro backend
app.use('/uploads', express.static('uploads'));

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

// Rutas de la API (v1)
app.use("/API/v1/", indexRoutes);


// Hace un catch de cualquier otra ruta no definida
app.all("*", (req, res, next) => {
    next({status:404, message: "Endpoint no encontrado"});
    //res.status(404).send("Ruta no encontrada");
});

// Último Middleware mi APP, es el de Error.
app.use(errorHandler);

// Alta de Servidor
app.listen(PORT, () => {
    console.log(`server corriendo en ${fullDomain}`)
})