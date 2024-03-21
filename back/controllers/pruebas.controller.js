import mysqlConn from '../db/mysql.db.js';
import bcrypt from 'bcrypt';

// formato de Respuesta
const responseAPI = {
    data: [],
    msg:"",
    status: "ok"
}

export const testHash = (req, res) => {
    responseAPI.data=[];
    const start= Date.now();
    
    let password="1234";
    const hash1 = bcrypt.hashSync(password, 10);
    const hash2 = bcrypt.hashSync(password, 10);

    
    responseAPI.data.push(hash1);
    responseAPI.data.push(hash2);
    
    password="1234 ";
    
    const isPasswordValid = bcrypt.compareSync(password, hash2);
    
    responseAPI.data.push("Es válido?: " + isPasswordValid);

    
    // tiempo de ejecución de hash 20 ciclos
    for(let i=0; i<20; i++){
        //bcrypt.hashSync(password, 10);
    }
    const end= Date.now();
    responseAPI.time= `${end-start} milisegundos`;
    responseAPI.msg="Testing Hash Script";
    responseAPI.status="error";
    res.status(400).send(responseAPI);
    return;
}