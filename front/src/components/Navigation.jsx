import {Routes, Route, Outlet, Link} from "react-router-dom";

const Navigation = () => {
    return (
        <>
            <nav className="nav">
                <ul>
                <li>
                    <Link to="/">Bienvenida</Link>
                </li>
                <li>
                    <Link to="/lista">Lista de Libros</Link>
                </li>
                <li>
                    <Link to="/agregar">Agregar</Link>
                </li>
                <li>
                    <Link to="/autores">Autores</Link>
                </li>
                <li>
                    <Link to="/noExisto">No existo</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                </ul>
            </nav>
        </>
    )
}

export default Navigation;