import misDatos from '../db/seed.js';

import mysqlConn from '../db/mysql.db.js';
import bcrypt from 'bcrypt';

// formato de Respuesta
const responseAPI = {
    data: [],
    msg:"",
    status: "ok"
}

export const seedLibros = async (req, res) => {
    const Libros = misDatos.libros;
   
    responseAPI.msg="Lista de libros creada!";
    responseAPI.status="ok";
    res.status(200).send(responseAPI);
}

export const seedUsers = async (req, res) => {
    const Users = misDatos.usuarios;

    let values = [];
    let placeholders = [];
    let params = [];
    
    Users.forEach(user => {
        const isProfesor = user.isProfesor ? 1 : 0;

        const cryptedPass = bcrypt.hashSync(user.password, 10);
        const created_at = new Date();
    
        // Push values and placeholders for each user
        values.push(user.id, user.user, user.nombre, cryptedPass, isProfesor, created_at);
        placeholders.push('(?, ?, ?, ?, ?, ?)');
    });
    
    // Join placeholders to construct the VALUES clause of the SQL query
    const placeholdersString = placeholders.join(', ');
    
    // Duplicate params array for each row of data
    params = [...params, ...values];
    console.log("params es: ", params);
    
    const sqlQuery = `INSERT INTO usuarios 
                      (id, user, nombre, password, isProfesor, created_at) 
                      VALUES ${placeholdersString}`;
    

    await mysqlConn.query(sqlQuery, params);

    const consulta=`SELECT * FROM usuarios WHERE deleted_at IS NULL`;
    const [results, fields ] = await mysqlConn.query(consulta);

    responseAPI.data=results;
    responseAPI.msg="Lista de usuarios creada!";
    responseAPI.status="ok";
    res.status(200).send(responseAPI);
}