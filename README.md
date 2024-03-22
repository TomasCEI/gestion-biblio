# gestion-biblio
Sistema de gestión de Bibliotecas con React - Express


# OBJETIVOS:
- middleware de manejo de errores (subir error a la DB)
- upload de archivos (img en perfil)
- uso de regex (validar email, nombre de archivo?)


# Frontend de Libros

Este Front tiene mejoras en:
- Implementación de errores en todo nuestro proyecto.
- Mejoras en nuestra librería easyFetch con JSDocs.
- Implementación de roles de usuario en nuestra librería.


## Rutas posibles:

- localhost:3000/API/v1/libros/seed (GET) [Cargar libros en la base de dato de db/datos.js]
- localhost:3000/API/v1/libros      (GET) [obtener todos los libros]

// CRUD: Create Read Update Delete 
http://hostname/API/v1/....

router.post(    "/libros",      createLibro);   // create
router.get(     "/libros/:id",  getLibroById);  // read
router.put(     "/libros/:id",  updateLibro);   // update
router.delete(  "/libros/:id",  deleteLibro);   // delete


# manejo de errores!

- Uso de JsDocs
- Throw
- Try/catch
- Abort signal
- Roles de usuario sistema de librería


## Errores en Express.js

Middleware de manejo de errores. Podemos usar el middleware de manejo de errores en nuestros endpoints de Express.js para manejar errores en nuestras rutas.

```javascript

app.get('/error', (req, res, next) => {
  next(new Error('Algo salió mal!'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});
```
