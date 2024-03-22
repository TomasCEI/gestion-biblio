import { useState, useEffect, useContext } from 'react';
import BookForm from '@/components/BookForm';
import { easyFetch } from '@/helpers/utils';
import { useNavigate } from 'react-router-dom'; // redirige a donde querramos
import { AuthContext } from '@/pages/Layout';


function BookList() {
  const [bookList, setBookList] = useState([]);
  const [editarLibro, setEditarLibro] = useState(null);

  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
  
  const navegator=useNavigate();

  if(!isLoggedIn){
    navegator("/login");
  }

  useEffect( ()=> {
    fetchLibros();
  }, [editarLibro]);

  const fetchLibros = async () => {


    /*
    try {
      const url="http://localhost:3000/API/v1/libros";
      const response=await fetch(url);
      if(!response.ok){
        throw new Error('Error al obtener los libros');
      }
      const jsonData = await response.json();

      setBookList(jsonData.data);

    } catch (error){
      console.error("tuviste un error: "+error);
    }
    */
   easyFetch({
    url: "http://localhost:3000/API/v1/libros",
    callback: (jsonData) => {
      setBookList(jsonData.data);
    }
   })
  }

  const handleEditarLibro = (libro) => {
    console.log("Editar libro con ID: "+libro.id);
    setEditarLibro(libro);
  }

    return (
      <>
        <h2>Lista Libros</h2>
        <div className="cardList">
        {
          bookList.map( libro => ( 
            <div className="card" key={libro.id}>
              <h3>{libro.titulo}</h3>
              <strong>Autor:</strong> {libro.nombre}
              <strong>Categoría:</strong> {libro.categoria}
              <button onClick={()=>handleEditarLibro(libro)}>Editar</button>
            </div>
          ))
        }
        </div>
        {editarLibro && <BookForm key={editarLibro.id} libro={editarLibro} setEditarLibro={setEditarLibro} />}
      </>

    )
  }

  export default BookList;