import mysqlConn from '../db/mysql.db.js';
import bcrypt from 'bcrypt';

// formato de Respuesta
const responseAPI = {
    data: [],
    msg:"",
    status: "ok"
}


export const loginUser = async (req, res, next) => {

    try {
        //console.log("Req body es: ", req.body);

        // obtenemos los datos del request
        const { user, pass } = req.body;

        // buscamos el usuario con ese user
        const consulta= "SELECT * FROM `usuarios` WHERE `user`= ? AND `deleted_at` IS NULL";
        const params = [user, pass];
        const [results, fields ] = await mysqlConn.query(consulta, user);

        // si no existe el usuario
        if(results.length==0){
            responseAPI.msg="Usuario no existe";
            responseAPI.status="error";
            res.status(400).send(responseAPI);
            return;
        }

        console.log(bcrypt.hashSync(pass, 10));

        // Comprobar claves
        const db_user = results[0];

        console.log(db_user.password, pass);

        // comparación entre mi hash de la clave en la base de datos, con el hash que acabo de crear
        const isPasswordValid = bcrypt.compareSync(pass, db_user.password);
        
        if(!isPasswordValid){
            responseAPI.msg="Clave incorrecta";
            responseAPI.status="error";
            res.status(400).send(responseAPI);
            return;
        }
        
        responseAPI.data=results;
        //responseAPI.debug_query=consulta;
        //responseAPI.debug_params=params;
        responseAPI.msg="login de usuario exitoso";
        responseAPI.status="ok";
        res.status(200).send(responseAPI);
        
    } catch (error){
        next(error);
    }

}

export const registerUser = async(req, res, next) => {

    try {
        // ejemplo MySQL
        const {user, pass } = req.body;

        if(user=="" || pass == ""){
            responseAPI.msg="Error al registrar usuario";
            responseAPI.status="error";
            res.status(400).send(responseAPI);
            return;
        }

        //const now = new Date(); // FECHA ACTUAL!
        const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

        // convierte mi clave...
        const encryptedPassword = bcrypt.hashSync(pass, 10);
        console.log(encryptedPassword);
        
        const sqlQuery= `INSERT INTO usuarios (user, password, updated_at, created_at) 
                            VALUES ('${user}', '${encryptedPassword}', '${now}', '${now}');`;
        const [result, fields ] = await mysqlConn.query(sqlQuery);

        const lastId = result.insertId; // ultimo id insertado

        const [newUser, newUserFields] = await mysqlConn.query('SELECT * FROM usuarios WHERE id = ?', [lastId] );

        // eliminar ciertos elementos sensibles, antes de enviar al usuario
        delete newUser[0].password; // no devolvemos la clave encritada


        // Nuestra respuesta para MySQL o Sequelize
        responseAPI.data=newUser;
        responseAPI.msg="Usuario registrado correctamente!";
        responseAPI.status="ok";
        res.status(200).send(responseAPI);
    } catch (error){
        next(error);
    }
}

export const editUserProfile = async(req, res, next) => {

    try {
        // get data from formData
        //const { name, email, password, image } = req.body;

        console.log("Req file es: ", req.file); // los datos de mi archivo recien subido
        console.log("Req body es: ", req.body); // title


        // almacenar en la Base de datos, los datos de mi archivo


        responseAPI.msg="Perfil editado correctamente";
        res.status(200).send(responseAPI);


    } catch (error){
        next(error);
    }
    
}


