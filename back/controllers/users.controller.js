import mysqlConn from '../db/mysql.db.js';

// formato de Respuesta
const responseAPI = {
    data: [],
    msg:"",
    status: "ok"
}


export const getAllUsers = async (req, res, next) => {
    try {
        responseAPI.msg="Obtener all usuarios";
        res.status(200).send(responseAPI);
    } catch (error) {
        next(error);
    }
}
export const getUserById = async (req, res, next) => {
    try {
        responseAPI.msg="Obtener usuario by id";
        res.status(200).send(responseAPI);
    } catch (error) {
        next(error);
    }
}
export const updateUser = async (req, res, next) => {
    try {
        responseAPI.msg="update usuario";
        res.status(200).send(responseAPI);
    } catch (error) {
        next(error);
    }
}
export const deleteUser = async (req, res, next) => {
    try {
        responseAPI.msg="delete usuario";
        res.status(200).send(responseAPI);
    } catch (error) {
        next(error);
    }
}
