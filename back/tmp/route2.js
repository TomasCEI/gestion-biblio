// Importa los módulos de Node.js necesarios
import { createServer } from 'http';
import { readFile, writeFile } from 'fs';
import { join } from 'path';
import { parse } from 'querystring';

// Importa el módulo Express
import express from 'express';

// Crea una instancia de la aplicación Express
const app = express();

// Configura el puerto
const PORT = process.env.PORT || 3000;

// Establece el directorio de carga de archivos
const uploadDirectory = './uploads/';

// Configura el middleware para manejar la carga de archivos
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define el único endpoint "upload" para almacenar archivos
app.post('/upload', (req, res) => {
    const body = req.body;
    const fileData = body.file;

    // Verifica si hay datos de archivo en la solicitud
    if (!fileData) {
        res.status(400).send('No se proporcionó ningún archivo.');
        return;
    }

    // Decodifica los datos del archivo
    const decodedFileData = Buffer.from(fileData, 'base64');

    // Escribe los datos del archivo en el sistema de archivos
    const fileName = `${Date.now()}-uploaded-file`;
    const filePath = join(uploadDirectory, fileName);

    writeFile(filePath, decodedFileData, (err) => {
        if (err) {
            console.error('Error al guardar el archivo:', err);
            res.status(500).send('Se produjo un error al guardar el archivo.');
            return;
        }

        console.log('Archivo guardado con éxito:', fileName);
        res.status(200).send('Archivo guardado con éxito.');
    });
});

// Inicia el servidor HTTP
const server = createServer(app);

server.listen(PORT, () => {
    console.log(`Servidor Express en ejecución en http://localhost:${PORT}`);
});