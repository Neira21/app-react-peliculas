import React from "react";
import {BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";
import VistaPeliculas from "./paginas/VistaPeliculas";
import DetallePelicula from "./paginas/DetallePelicula";
import './estilos.css'

const App = () =>{
    return(
        <Router>
            <header>
                <Link to="/"> <h1 className="titulo">TheMovieAPP</h1> </Link> 
            </header>
            <main>
            <Routes>
                <Route path="/movies/:movieId" element={<DetallePelicula/>}/>
                <Route path="/" element={<VistaPeliculas/>}/>
                <Route path="*" element={<div>404</div>} />
            </Routes>
            </main>
        </Router>
    );
}

export default App;