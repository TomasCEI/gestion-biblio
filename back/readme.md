# Backend de Libros

Este backend en `express` utiliza la base de datos `MySQL` y el conector `mysql2`.

Incluimos variables de entorno para el back y el front.

## Librerias
- `dotenv` para incluir archivos de variables de entorno.
- utilizamos `bcrypt` para encriptar claves
- 


## Rutas posibles:

- localhost:3000/API/v1/libros/seed (GET) [Cargar libros en la base de dato de db/datos.js]
- localhost:3000/API/v1/libros      (GET) [obtener todos los libros]

// CRUD: Create Read Update Delete 
http://hostname/API/v1/....

router.post(    "/libros",      createLibro);   // create
router.get(     "/libros/:id",  getLibroById);  // read
router.put(     "/libros/:id",  updateLibro);   // update
router.delete(  "/libros/:id",  deleteLibro);   // delete

## Fronend

Funciona perfectamente con front en React de libros (clases/dia20/libros-crud/front)