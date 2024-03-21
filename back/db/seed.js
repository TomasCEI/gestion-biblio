const misDatos = {
    "libros": [
        {
            "id": 1,
            "titulo": "El nombre del viento",
            //"autor": "Patrick Rothfuss",
            "id_autor": 1,
            "categoria": "Fantasía"
        },
        {
            "id": 2,
            "titulo": "1984",
            //"autor": "George Orwell",
            "id_autor": 2,
            "categoria": "Ciencia ficción"
        },
        {
            "id": 5,
            "titulo": "Libro 2 de George",
            //"autor": "George Orwell",
            "id_autor": 2,
            "categoria": "Ciencia ficción"
        },
        {
            "id": 3,
            "titulo": "Cien años de soledad",
            //"autor": "Gabriel García Márquez",
            "id_autor": 3,
            "categoria": "Realismo mágico"
        }
    ],
    "autores":[
        {
            "id": 1,
            "nombre": "Patrick Rothfuss"
        },
        {
            "id": 2,
            "nombre": "George Orwell"
        },
        {
            "id": 3,
            "nombre": "Gabriel García Márquez"
        },
        {
            "id": 4,
            "nombre": "Isaac Asimov"
        }
    ],
    "usuarios":[
        {
            "id": 1,
            "user": "tomas@cei.es",
            "nombre": "Tomás Sanchez Gavier",
            "password": "ceirulez",
            "isProfesor": true
        },
        {
            "id": 2,
            "user": "mnieves@cei.es",
            "nombre": "María Nieves",
            "password": "1234",
            "isProfesor": false
        }]
};




export default misDatos;