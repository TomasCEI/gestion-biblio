import mysqlConn from '../db/mysql.db.js';

// formato de Respuesta
const responseAPI = {
    data: [],
    msg:"",
    status: "ok"
}

export const getAllAutores = async (req, res, next) => {

    try {
        const consulta=`SELECT * FROM autores`;

        const [results, fields ] = await mysqlConn.query(consulta);

        responseAPI.data=results;
        responseAPI.msg="Obtener autores";
        responseAPI.status="ok";
        res.status(200).send(responseAPI);
    } catch (error){
        next(error);
    }
}
export const createAutor = async(req, res, next) => {

    try {
        //responseAPI.data=results;
        responseAPI.msg="Autor creado con éxito!";
        responseAPI.status="ok";
        res.status(201).send(responseAPI);
    } catch (error){
        next(error);
    }
}
export const getAutorById = async (req, res, next) => {
    try {

    }catch (error) {
        next(error);
    }
}
export const updateAutor = async (req, res, next) => {
    try {

    }catch (error) {
        next(error);
    }
}
export const deleteAutor = async (req, res, next) => {
    try {

    }catch (error) {
        next(error);
    }
}