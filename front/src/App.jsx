import '@/App.css'
import {Routes, Route, Outlet, Link} from "react-router-dom";
//import Navigation from './components/Navigation';

// Páginas (mis componentes principales)
import NotFound from '@/pages/NotFound'
import Home from '@/pages/Home';
import BookList from '@/pages/BookList';
import BookAdd from '@/pages/BookAdd';
// usando el alias @ para importar
import AuthorList from '@/pages/AuthorList';
import Login from '@/pages/Login';
import Layout from '@/pages/Layout';

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}> 

          <Route index element={<Home />} /> 
          <Route path="/lista" element={<BookList />} /> 
          <Route path="/agregar" element={<BookAdd />} /> 
          <Route path="/autores" element={<AuthorList />} /> 

          <Route path="/login" element={<Login />} /> 

          <Route path="*" element={<NotFound />} />
        </Route>
        
      </Routes>
    </>
  )
}

// // plantilla de toda nuestra APP
// function Layout(){
//   return (
//     <>
      
//       <Navigation />

//       {/* El <Outlet> renderiza el Child que provenga del router */}
//       <div className="content">
//         <Outlet />
//       </div>

//       <footer className="footer">soy footer</footer>
//     </>
//   )
// }


export default App
