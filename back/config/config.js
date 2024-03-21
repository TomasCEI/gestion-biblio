// import { fileURLToPath } from 'url'; // Use fileURLToPath to convert import.meta.url to a file path
// import { config } from 'dotenv';
// import path from 'path';
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const newPath = process.env.NODE_ENV ? `../.env.${process.env.NODE_ENV}` : '../.env';
// const envPath = path.resolve(__dirname, newPath);
// config({ path: envPath });
// console.log("the __dirname is:", __dirname);
// console.log("the file path es:", newPath);
// console.log("the env path es:", envPath);

import dotenv from 'dotenv';
dotenv.config();


console.log("enviroment es: ",process.env.NODE_ENV || "development");

export const PORT= process.env.PORT         || 3000;
export const domain= process.env.DOMAIN     || "http://localhost"; 

// datos de DB
export const host= process.env.HOSTNAME || "localhost";
export const user= process.env.DB_USER  || "root";
export const pass= process.env.DB_PASS  || "";
export const database= process.env.DATABASE;

//console.log("PUERTO ES: ", PORT);

export const fullDomain=`${domain}:${PORT}`;