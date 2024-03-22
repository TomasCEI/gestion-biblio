

// formato de Respuesta
const responseAPI = {
    msg:"Algo salió mal!, reintenta, y si el error persiste, contacta al administrador del sistema.",
    status: "error"
}


/**
 * Middleware que maneja los errores en la aplicación, no devuelve detalles del error al usuario. Pero si almacena el error en la base de datos en mi tabla de logs.
 * 
 * @param {object} err | Información del error, puedo leer err.message o err.stack
 * @param {object} req | Información de la solicitud
 * @param {object} res | Información de la respuesta
 * 
 * @returns {void} | No devuelve nada, pero envía una respuesta al cliente.
 */
export const errorHandler = (err, req, res, next) => {
    //console.error(err.stack);
    console.error("Error: ", err.message);
    res.status(500).send(responseAPI);
}