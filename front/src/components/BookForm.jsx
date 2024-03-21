import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'; // redirige a donde querramos
import { easyFetch } from '../helpers/utils';

const BookForm = ({libro, setEditarLibro})=>{

    const [formData, setFormData] = useState(libro);
    const {titulo, autor, categoria, id} = formData;

    const navegador = useNavigate();

    /* no fue necesario ya que utiliamos la prop key en el componente BookForm
    useEffect( ()=> {
        console.log("COMPONENT DID MOUNT!");
    }, []);

    useEffect( ()=> {
        console.log("COMPONENT DID UPDATE! (LIBRO)");
        //console.log("Ejecutando useEffect (x q cambiò libro)")
        //setFormData(libro);
        //console.log("Libro es", libro);
        //console.log("FormData es", formData);
    }, [formData])
    */


    const handleCreateBook = async () => {
        easyFetch({
            url: "http://localhost:3000/API/v1/libros/",
            method: 'POST', 
            body: formData,
            callback: (data) => {
                console.log("EXITO CREADO!!! " , data);
                // setEditarLibro(null); 
                // irme a la página de ListaLibros
                navegador("/lista");
            }
        })
    }

    const handleRemoveBook = async () => {
        easyFetch({
            url: "http://localhost:3000/API/v1/libros/"+id,
            method: 'DELETE',
            callback: (data) => {
                console.log("EXITO ELIMINADO !!! " , data);
                setEditarLibro(null); 
            }
        })
    }

    const handleUpdateBook = async () => {
        easyFetch({
            url: "http://localhost:3000/API/v1/libros/"+id,
            method: 'PUT', 
            body: formData,
            callback: (data) => {
                console.log("EXITO ACTUALIZADO !!! " , data);
                setEditarLibro(null); 
            }
        })
    }



    const handleInputChange = (e) => {
        const {name, value} = e.target; // obtengo del input el nombre y el valor

        // actualizo mi formData con el nuevo valor del input
        // conservando los valores anteriores
        setFormData({...formData, [name]:value});
    }

    return (
        <>
        <form className="main-form">
            <label>Nombre del Libro</label>
            <input 
                type="text"
                className="input-control"
                name="titulo"
                value={titulo}
                placeholder="Ingrese título del libro"
                onChange={handleInputChange}
            /><br />

            <label>Autor del libro</label>
            <input 
                type="text"
                className="input-control"
                name="autor"
                value={autor}
                placeholder="Ingrese el autor del Libro"
                onChange={handleInputChange}
            /><br />

            <label>Categoría</label>
            <input 
                type="text"
                className="input-control"
                name="categoria"
                value={categoria}
                placeholder="Ingrese la categoría del Libro"
                onChange={handleInputChange}
            /><br />
        </form>
        {
            // editando (id=XXX) o creando (id=0)
            id ? (
                <>
                    <button onClick={handleUpdateBook}>Guardar</button>
                    <button onClick={handleRemoveBook}>Eliminar</button>
                </>
            ) : (
                <button onClick={handleCreateBook}>Crear Nuevo</button>
            )
        }
        </>
    )
}

export default BookForm;