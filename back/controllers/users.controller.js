import mysqlConn from '../db/mysql.db.js';

// formato de Respuesta
const responseAPI = {
    data: [],
    msg:"",
    status: "ok"
}


export const getAllUsers = async (req, res) => {
    responseAPI.msg="Obtener all usuarios";
    res.status(200).send(responseAPI);
}
export const getUserById = async (req, res) => {
    responseAPI.msg="Obtener usuario by id";
    res.status(200).send(responseAPI);
}
export const updateUser = async (req, res) => {
    responseAPI.msg="update usuario";
    res.status(200).send(responseAPI);
}
export const deleteUser = async (req, res) => {
    responseAPI.msg="delete usuario";
    res.status(200).send(responseAPI);
}
