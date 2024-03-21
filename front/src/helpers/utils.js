/*
easyFetch({
    url: "http://miurl",
    method: 'PUT', 
    body: formData,
    timeout: 3000,
    callback: (data) => {
        console.log("TENGO MIS DATOS!!", data);
    }
})
*/





/**
 * Realiza un petición Fetch 
 * - Con gestión de errores básica 
 * - incluye señal de Abort incluida de máximo 5 segundos
 * 
 * @author "Tomás Sanchez Gavier"
 * @param {Object}          fetchOptions                - Opciones de nuestra solicitud fetch
 * 
 * @param {string}          fetchOptions.url            - La url a la que se realizará la petición. 
 * @param {string}          [fetchOptions.metodo="GET"] - El método HTTP de nuestra solicitud (GET, POST, PUT, DELETE, etc) 
 * @param {object|null}     [fetchOptions.body=null]    - El cuerpo de la petición que convertiremos a JSON
 * @param {number}          [fetchOptions.timeout=5000] - Tiempo de espera máximo en milisegundos antes de abortar la petición
 * @param {function|null}   fetchOptions.callback       - Función que se ejecuta luego de recibir los datos.
 * 
 * @returns {Promise|void}                              - Devuelve una promesa que resuelve los datos de la respuesta si no se proporciona una función de callback.
 */
export const easyFetch = async ({
    url, method="GET", body =null, timeout=5000, callback=null
}) => {

    const controller = new AbortController();
    const abortTimeout = setTimeout( () => controller.abort(), timeout);

    const fetchOptions={
        method,
        headers: {
            'Content-Type':'application/json',
            // podemos agregar a futuro otros headers
        },
        signal: controller.signal
    }
    if(body){
        fetchOptions.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, fetchOptions);
        clearTimeout(abortTimeout);
        if(!response.ok){ throw new Error(response.statusText); }
        const data = await response.json();

        if(callback){
            callback(data);
        } else {
            return data;
        }

    } catch (error) {
        console.error("Error al realizar el request: ", error.message);
    }
}


export const limpiarStrings = () => {
    
}