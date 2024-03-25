

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

    // console.error(err);
    // console.error("Error: ", err.message);

    responseAPI.msg = err.message || responseAPI.msg;
    const statusCode = err.status || 500;

    
    // Códigos de estado de HTTP
    switch (statusCode) {
        // Códigos de exito [No son errores, pero los dejo listados como referencia]
        case 200: responseAPI.status = '200: OK'; break;            // GET, PUT
        case 201: responseAPI.status = '201: Created'; break;       // POST
        case 202: responseAPI.status = '202: Accepted'; break;      // acepto el request pero no lo procesa en este momento (requests asincronos)
        case 204: responseAPI.status = '204: No Content'; break;    // OK pero sin contenido (Delete, o EDIT sin contenido a devolver)
        // Códigos de error
        case 400: responseAPI.status = '400: Bad Request'; break;   // Petición incorrecta
        case 401: responseAPI.status = '401: Unauthorized'; break;  // Sin Autentificar
        case 403: responseAPI.status = '403: Forbidden'; break;     // Autentificado pero SIN permisos
        case 404: responseAPI.status = '404: Not Found'; break;     // No encontrado
        // Códigos de error de servidor
        case 500: responseAPI.status = '500: Internal Server Error'; break; // Error interno del servidor
        case 501: responseAPI.status = '501: Not Implemented'; break;       // No reconoce el método o no tiene la capacidad de cumplirlo.
        case 502: responseAPI.status = '502: Bad Gateway'; break;           // Mientras trabaja como puerta de enlace para obtener una respuesta necesaria para manejar la solicitud, recibió una respuesta no válida.
        case 503: responseAPI.status = '503: Service Unavailable'; break;   // Mo está listo para manejar la solicitud.
        case 504: responseAPI.status = '504: Gateway Timeout'; break;       // Tiempo de espera agotado
        // Otros casos
        default:  responseAPI.status = 'Internal Server Error';
    }

    //res.status(500).send(responseAPI);
    res.status(statusCode).send(responseAPI);
}

