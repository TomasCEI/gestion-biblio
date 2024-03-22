
// import useContext and contextProvider from react 
import { useState, createContext } from "react";


import {Routes, Route, Outlet, Link} from "react-router-dom";
import Navigation from '../components/Navigation';

export const AuthContext = createContext();
export const ThemeContext = createContext();

// plantilla de toda nuestra APP
function Layout(){

    const [theme, setTheme] = useState('light');

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({}); // los datos de mi usuario (nombre, email, imagen, etc.)

    console.log("isLoggedIn", isLoggedIn);
    // use useContext to set if its logged in or not
    //const {isLoggedIn} = useContext(AuthContext);  

    return (
      <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, userData, setUserData}}>

          <Navigation />
          <div className="content">
              {/* El <Outlet> renderiza el Child que provenga del router */}
              <Outlet />
          </div>
          <footer className="footer">soy footer</footer>

        </AuthContext.Provider>    
      </ThemeContext.Provider>    
      </>
    )
  }

  export default Layout;