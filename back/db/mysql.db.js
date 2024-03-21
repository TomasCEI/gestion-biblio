import mysql from 'mysql2/promise';
import { host, user, pass, database } from '../config/config.js';

// Create the connection to database
const mysqlConn = await mysql.createConnection({
    host: host,
    user: user,
    passwowrd: pass,
    database: database,
  });

  export default mysqlConn;