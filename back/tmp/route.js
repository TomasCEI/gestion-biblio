import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

// imports necesarios para el upload de archivos!
import path from "path";
import { writeFile } from "fs/promises";

// para crear directorios, usamos el utility mkdir de primisfy, 
// es mejor que "import { mkdir } from 'node:fs';" ya que previene callback hells
// y funciona mejor con funciones async/await
import { promisify } from 'util';
import fs from 'fs';
const mkdir = promisify(fs.mkdir);

//import { dbGetCardsWithTags, dbGetStatus, dbGetCardTags } from "@/lib/queries/trello";
//import { dbDeleteCard, dbUpsertCard } from "@/lib/mutations/trello";

// puedo leer algun key del ENV
//console.log(process.env.API_KEY);

// siempre trae nuevo contenido en los get
export const dynamic = "force-dynamic"; // defaults to force-static


// 1. Los ficheros si o si tienen que tener un "01_entities.id" ya que solo puedo adjuntar elementos a una tarjeta específica!
// 2. Cargar los datos del adjunto a "ut_files"
// 3. Cargar los datos de la accion en "ut_logs"
export async function POST(req, { params }) {
    // NO SE PUEDE TENER 2 req.json() en el mismo POST (body is unusable)
    //const res = await req.json();
    //const { type, description, listId, title } = await req.json();
 
    const labId = Number(params.labid);
    //const entityType = type || "Card";


    const formData = await req.formData();

    const file = formData.get("file");
    const title = formData.get("title"); // titulo del formulario
    
    // !!! Obligatorio para adjuntarle un archivo !!!
    // const entitieID = formData.get("id_card");

    if (!file) {
      return NextResponse.json({ error: "No files received." }, { status: 400 });
    }
  
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename =  file.name.replaceAll(" ", "_");
    console.log(filename);
      console.log(`Title es ${title}`);

      try {
         /*
            let prismaData = {
               title: title,
               order: order,
               type: entityType,
               description: descriptionCard,
               laboratorioID: labId,
            };
         
            console.log("data para prisma es: ", prismaData);
         
            const status = await prisma.entities.create({
               data: prismaData,
            });
         */

         // crear las carpeta si no existe (GPT):
         try {
            await mkdir(path.join(process.cwd(), "public/uploads"), { recursive: true });
         } catch (error) {
            console.error("Error creating folder:", error);
         }

         // sin utilizar buffer, simplemente guardando el formData
         // creo que para servidores de archivos externos es mejor hacer el arrayBuffer e ir subiendolo de a chunks
        // await writeFile(
        //    path.join(process.cwd(), "public/uploads/" + filename),
        //    file // Write file directly from FormData
        //);

         // Write the file to the specified directory (public/assets) with the modified filename
         await writeFile(
           path.join(process.cwd(), "public/uploads/" + filename),
           buffer
         );
     
         // Return a JSON response with a success message and a 201 status code
         return NextResponse.json({ msg: `Archivo "${title}" subido!`,  status: 201 });
        // return NextResponse.json({ Message: "Success", status: 201 });
       } catch (error) {
         // If an error occurs during file writing, log the error and return a JSON response with a failure message and a 500 status code
         console.log("Error occurred ", error);
         return NextResponse.json({ msg: "Failed", status: 500 });
       }

 }


 
export async function GET(req, res) {
   return NextResponse.json({ msg: "API para adjuntar archivos a mis tarjetas, ver funciones COMENTADAS en route.js" }, { status: 200 });
}  


// no se debería usar porque voy a trabajar con SHA-1
// Sanitizar nombres de archivo (GPT):
// ejemplo de uso:
// const originalFilename = "TomÁs s$anchéZzz 'file.png";
// const sanitizedFilename = sanitizeFilename(originalFilename);
// console.log(sanitizedFilename); // Output: tomas_sanchezzz_file_2024-02-05 20-19-25
 function sanitizeFilename(filename) {
   // Convert to lowercase and replace non-alphanumeric characters with _
   let sanitized = filename.toLowerCase().replace(/[^a-z0-9]/g, '_');
   // Add current date and time
   const date = new Date().toISOString().replace(/[:]/g, '-').replace(/\..+/, ''); // Remove milliseconds and format date
   sanitized += '_' + date;
   return sanitized;
}

// me falta incluir uuidv4 en package.json
/*
import { v4 as uuidv4 } from 'uuid'; // For generating unique identifiers

// Function to generate unique filename using UUID
function generateUniqueFilename(filename) {
    const extension = filename.split('.').pop(); // Extract file extension
    const uuid = uuidv4(); // Generate unique UUID
    return `${uuid}.${extension}`;
}
*/



// Function to check if file exists in database (placeholder)
// mejor también revisar si existe con el SHA-1 en vez de filename
async function fileExistsInDatabase(filename) {
   // Perform database query to check if filename exists in ut_files table
   // Placeholder implementation
   return false; // Return true if file exists, false otherwise
}


// para obtener el sha1 de un archivo
import crypto from 'crypto';

// Function to calculate hash of file
// requiere varchar(40) para  SHA-1
// varchar(64) para SHA-256 - varchar(128) para SHA-512
async function calculateFileHash(file) {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('sha1'); // Use SHA-1 hash algorithm
        file.on('data', (chunk) => hash.update(chunk));
        file.on('end', () => resolve(hash.digest('hex'))); // Return hex digest of hash
        file.on('error', (error) => reject(error));
    });
}
/*
// uso con hash sh1: Function to handle file upload
export async function uploadFile(req, res) {
   const formData = await req.formData();
   const file = formData.get('file');
   const originalFilename = file.name;

   // Calculate hash of file
   const fileHash = await calculateFileHash(file);

   // Use hash as filename
   const filename = `${fileHash}.${originalFilename.split('.').pop()}`;

   // Check if file exists in database (placeholder)
   if (await fileExistsInDatabase(filename)) {
       // If file with same hash already exists, handle accordingly
       // For example, return an error response or overwrite existing file
   } else {
       // Write file to disk with hash-based filename
       // ...
   }
}*/



/*
Convertir extensiones a lowerCase

// Function to convert file extension to lowercase
function convertExtensionToLowerCase(fileName) {
    const ext = path.extname(fileName);
    if (ext) {
        const baseName = path.basename(fileName, ext);
        return baseName.toLowerCase() + ext.toLowerCase();
    }
    return fileName;
}

// Example usage
const uploadedFileName = 'Example.JPG';
const convertedFileName = convertExtensionToLowerCase(uploadedFileName);
console.log(convertedFileName); // Output: example.jpg

*/