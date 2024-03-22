/**
 * Middleware que maneja los errores en la aplicación, no devuelve detalles del error al usuario. Pero si almacena el error en la base de datos en mi tabla de logs.
 * 
 * @param {object} err | Información del error, puedo leer err.message o err.stack
 * @param {object} req | Información de la solicitud
 * @param {object} res | Información de la respuesta
 * 
 * @returns {void} | No devuelve nada, pero envía una respuesta al cliente.
 */
export const errorHandler = (err, req, res) => {
    //console.error(err.stack);
    console.error("Error: ", err.message);
    res.status(500).send('Algo salió mal pero el usuario no verá detalles del error!');
}