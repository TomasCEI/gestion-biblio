import { Router} from 'express';


//import multer from 'multer'; // MiddleWare para subir archivos

import {loginUser, registerUser, editUserProfile} from '../controllers/auth.controller.js';

import {getAllLibros, createLibro, getLibroById, updateLibro, deleteLibro} from '../controllers/libros.controller.js';
import {getAllAutores} from '../controllers/autores.controller.js';
import {getAllUsers, getUserById, updateUser, deleteUser} from '../controllers/users.controller.js';
import {seedUsers, seedLibros, seedAutores, seedAll, emptyTables } from '../controllers/seed.controller.js';

import {testHash} from '../controllers/pruebas.controller.js';
import { upload} from '../middlewares/multerStorage.js';

const router = Router();


//const upload = multer({ dest: 'uploads' }); // instancia para subir archivos

// // Configuración de multer para subir archivos
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads')
//     },
//     filename: function (req, file, cb) {
//       //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       //cb(null, file.fieldname + '-' + uniqueSuffix)
    
//       // fecha + nombre
//       //cb(null, Date.now() + '-' + file.originalname);

//       // nombre original
//       cb(null, file.originalname);
//     }
//   })
//   const upload2 = multer({ storage: storage })


// Auth
router.post(    "/auth/login",          loginUser); // login
router.post(    "/auth/register",       registerUser); // register

// Cambiar a put("/users/:id") para que sea más RESTful
router.put(     "/auth/profile/:id",   upload.single('profile'),  editUserProfile); // edit user profile

// Libros
// CRUD: Create Read Update Delete
router.get(     "/libros",      getAllLibros);
router.post(    "/libros",      createLibro);   // create
router.get(     "/libros/:id",  getLibroById);  // read
router.put(     "/libros/:id",  updateLibro);   // update
router.delete(  "/libros/:id",  deleteLibro);   // delete

// http://localhost:8000/libros/33/getLibros?id=33&orden=asc&q=autor
// urlParameter :id
// queryParameter ?id



// Users
// CRUD: Create Read Update Delete
router.get(     "/users/",           getAllUsers);  // obtener todos
router.get(     "/users/:id",        getUserById);  // obtener 1
router.put(     "/users/:id",        updateUser);   // actualizar
router.delete(  "/users/:id",        deleteUser);   // borrar

// Autores
// CRUD: Create Read Update Delete
router.get(     "/autores",      getAllAutores);
// router.post(    "/autores",      createAutor);   // create
// router.get(     "/autores/:id",  getAutorById);  // read
// router.put(     "/autores/:id",  updateAutor);   // update
// router.delete(  "/autores/:id",  deleteAutor);   // delete





// Seeder
router.get(     "/seed/libros", seedLibros);  // crear lista de libros base!
router.get(     "/seed/users",  seedUsers);   // crear lista de usuarios base!
router.get(     "/seed/users",  seedAutores);   // crear lista de usuarios base!
router.get(     "/seed/seedAll", emptyTables, seedAll);   // usar middleWare para vaciarTablas y luego hacer el seed completo


// distintas rutas de prueba para testing de nuestro sistema
router.get( "/tests/hash",  testHash);

router.get('/error1', (req, res, next) => {
    next(new Error('Algo salió mal 1!'));
});

router.get('/error2', (req, res, next) => {
    next(new Error('Algo salió mal 2!'));
});

export default router;