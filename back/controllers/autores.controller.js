import mysqlConn from '../db/mysql.db.js';

// formato de Respuesta
const responseAPI = {
    data: [],
    msg:"",
    status: "ok"
}

export const getAllAutores = async (req, res) => {

    const consulta=`SELECT * FROM autores`;

    const [results, fields ] = await mysqlConn.query(consulta);

    responseAPI.data=results;
    responseAPI.msg="Obtener autores";
    responseAPI.status="ok";
    res.status(200).send(responseAPI);
}


export const createAutor = async(req, res) => {
}
