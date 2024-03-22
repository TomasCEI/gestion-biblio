import mysqlConn from '../db/mysql.db.js';

// formato de Respuesta
const responseAPI = {
    data: [],
    msg:"",
    status: "ok"
}

export const getAllLibros = async (req, res) => {

    const consulta=`SELECT l.*, a.nombre FROM libros l
                    LEFT JOIN autores a ON (l.id_autor = a.id)
                    WHERE l.deleted_at IS NULL`;

    const [results, fields ] = await mysqlConn.query(consulta);

    responseAPI.data=results;
    responseAPI.msg="Obtener libros";
    responseAPI.status="ok";
    res.status(200).send(responseAPI);
}

export const createLibro = async(req, res) => {

    const {titulo, id_autor, cali=0, lanzamiento="", editorial="", precio=0, cant_vendidos=0, num_paginas=0 } = req.body;

    if(titulo=="" || id_autor == 0){
        responseAPI.msg="Error al crear libro";
        responseAPI.status="error";

        // insertar en la base de datos, el error que se acaba de generar


        res.status(400).send(responseAPI);
        return;
    }

    const sqlQuery= `INSERT INTO libros 
    (libro, id_autor, calificacion, lanzamiento, editorial, precio, cant_vendidos, num_paginas) 
    VALUES  ('${titulo}', '${id_autor}', '${cali}', '${lanzamiento}', '${editorial}', '${precio}', '${cant_vendidos}', '${num_paginas}');`;


    const [newBook, fields ] = await mysqlConn.query(sqlQuery);

    // Nuestra respuesta para MySQL o Sequelize
    responseAPI.data=newBook;
    responseAPI.msg="Crear nuevo libro";
    responseAPI.status="ok";
    res.status(200).send(responseAPI);
}

export const getLibroById = async(req, res) => {

    //const Libro = await Libros.findByPk(req.params.id);
    if(!Libro){
        responseAPI.msg="Libro no encontrado";
        responseAPI.status="ok";
        res.status(404).send(responseAPI);
        return;
    }

    await Libro.update(req.body);
    responseAPI.data=Libro;
    responseAPI.msg="Obtener libros por id";
    responseAPI.status="ok";
    res.status(200).send(responseAPI);
}

export const updateLibro = async(req, res) => {
    //const Libro = await Libros.findByPk(req.params.id);
    if(!Libro){
        responseAPI.msg="Libro no encontrado";
        responseAPI.status="ok";
        res.status(404).send(responseAPI);
        return;
    }

    await Libro.update(req.body);
    // respondo con la nueva lista de libros ACTUALIZADA
    responseAPI.data=Libro;
    responseAPI.msg="Actualizar libro con valores específicos";
    responseAPI.status="ok";
    res.status(200).send(responseAPI);
}

export const deleteLibro = async(req, res) => {
    //const Libro = await Libros.findByPk(req.params.id);
    if(!Libro){ // No se encontró 
        responseAPI.msg="No se encontró un libro para eliminar";
        res.status(404).send(responseAPI); return;
    }
    responseAPI.data=Libro;
    await Libro.destroy();
    responseAPI.msg="Libro Eliminado";
    res.status(200).send(responseAPI);
}