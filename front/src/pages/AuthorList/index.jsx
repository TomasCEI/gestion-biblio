import { useState, useEffect, useContext } from 'react';
import { easyFetch } from '@/helpers/utils';
import { useNavigate } from 'react-router-dom'; // redirige a donde querramos
import { AuthContext } from '@/pages/Layout';


function AuthorList() {
  const [autoresList, setAutoresList] = useState([]);

  // Check Login
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
  const navegator=useNavigate();
  if(!isLoggedIn){ navegator("/login");  }


  useEffect( ()=> {
    fetchAutores();
  }, []);

  const fetchAutores = async () => {
    easyFetch({
      url: "http://localhost:3000/API/v1/autores",
      callback: (jsonData) => {
        setAutoresList(jsonData.data);
      }
    })
  }

    return (
      <>
        <h2>Lista de Autores</h2>
        <div className="cardList">
        {
          autoresList.map( autor => ( 
            <div className="card" key={autor.id}>
              <h3>{autor.nombre}</h3>
            </div>
          ))
        }
        </div>
      </>

    )
  }

  export default AuthorList;