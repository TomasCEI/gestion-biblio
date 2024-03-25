import mysqlConn from '../db/mysql.db.js';
import misDatos from '../db/seed.js';
import bcrypt from 'bcrypt';

// formato de Respuesta
const responseAPI = {
    data: [],
    msg:"",
    status: "ok"
}


export const seedUsers = async (req, res, next) => {
    
    try {
        const Users = misDatos.usuarios; // obtener de db/seed.js
        
        // let A_values=[];
        // Users.map((user) => {
        //     const isProfesor= user.isProfesor ? 1 : 0;

        //     A_values.push(`('${user.id}', '${user.user}', '${user.nombre}', '${user.password}', '${isProfesor}') `); 
        // });
        // const stringValues= A_values.join(', ');

        // const sqlQuery= `INSERT INTO usuarios 
        //     (id, user, nombre, password, isProfesor) 
        //     VALUES  ${stringValues};`;
        // await mysqlConn.query(sqlQuery);


        // const consulta=`SELECT * FROM usuarios WHERE deleted_at IS NULL`;
        // const [results, fields ] = await mysqlConn.query(consulta);

        let values = [];
        let placeholders = [];
        let params = [];
        const created_at = new Date();
        
        Users.forEach(user => {
            const isProfesor = user.isProfesor ? 1 : 0;
            //const cryptedPass = user.password;
            const cryptedPass = bcrypt.hashSync(user.password, 10);
        
            // Push values and placeholders for each user
            values.push(user.id, user.user, user.nombre, cryptedPass, isProfesor, created_at);
            //placeholders.push('(?, ?, ?, ?, ?, ?)');
            
            // en vez de "?" puedo usar distintos valores según corresponda en cada row: DEFAULT, NULL, NOW(), CURRENT_TIMESTAMP, LAST_INSERT_ID(), RAND()
            placeholders.push('(?, ?, ?, ?, ?, NOW())');

        });
        
        // Join placeholders to construct the VALUES clause of the SQL query
        const placeholdersString = placeholders.join(', ');
        
        // Duplicate params array for each row of data
        params = [...params, ...values];
        console.log("params es: ", params);
        
        const sqlQuery = `INSERT INTO usuarios 
                        (id, user, nombre, password, isProfesor, created_at) 
                        VALUES ${placeholdersString}`;
        
        // Assuming mysqlConn is your database connection object
        await mysqlConn.query(sqlQuery, params);
        console.log("sqlQuery es: ", sqlQuery);

        

        const consulta=`SELECT * FROM usuarios WHERE deleted_at IS NULL`;
        const [results, fields ] = await mysqlConn.query(consulta);

        responseAPI.data=results;

        //responseAPI.data = getAllUsers();
        responseAPI.msg="Lista de usuarios creada!";
        responseAPI.status="ok";
        res.status(200).send(responseAPI);
    } catch (error){
        next(error);
    }
}

export const seedLibros = async (req, res, next) => {
    try {
        const Libros = misDatos.libros;

        // version SEQUELIZER, cambiar a MySQL
        // await Libros.truncate(); // vaciar tabla
        // const libros = await Libros.bulkCreate(listaLibros);

        responseAPI.data=Libros;
        responseAPI.msg="Lista de libros creada!";
        responseAPI.status="ok";
        res.status(200).send(responseAPI);
    } catch (error){
        next(error);
    }
}

export const seedAutores = async (req, res, next) => {
    try {
        const Autores = misDatos.autores;

        responseAPI.data=Autores;
        responseAPI.msg="Lista de Autores creada!";
        responseAPI.status="ok";
        res.status(200).send(responseAPI);
    } catch (error){
        next(error);
    }
}

export const seedAll = async(req, res, next) => {
    try {
        await seedUsers();
        await seedLibros();
        await seedAutores();
        responseAPI.msg="Seed completo!";
        responseAPI.status="ok";
        res.status(200).send(responseAPI);
    } catch (error){
        next(error);
    }
}

// export const emptyTables = async () => {
//     await mysqlConn.query(`TRUNCATE TABLE usuarios`);
//     await mysqlConn.query(`TRUNCATE TABLE libros`);
//     await mysqlConn.query(`TRUNCATE TABLE autores`);
// }

// Empty all tables
export const emptyTables = async (req, res, next) => {    
    try {
        await mysqlConn.query('SET FOREIGN_KEY_CHECKS = 0'); // disable foriegn key check

        await mysqlConn.query(`TRUNCATE TABLE usuarios`);
        await mysqlConn.query(`TRUNCATE TABLE libros`);
        await mysqlConn.query(`TRUNCATE TABLE autores`);
        
        await mysqlConn.query('SET FOREIGN_KEY_CHECKS = 1'); // re enable foriegn key check

        next(); // Proceed to the next middleware or route handler

    } catch (error) {
        const err = new Error("Error al vaciar las tablas");
        err.status = 500; // Add a status property to the error
        next(err);
    }
}
