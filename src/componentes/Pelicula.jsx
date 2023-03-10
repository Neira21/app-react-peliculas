import { Link } from "react-router-dom";
import placeholder from "../imagenes/placeholder.png";

const Pelicula = ({pelicula}) => {
    const ImageUrl = pelicula.poster_path 
        ? `https://image.tmdb.org/t/p/w500${pelicula.poster_path}` 
        : placeholder;
    return (
        <div className="carta-pelicula">
            <Link to={"/movies/"+pelicula.id}>
                <img height={500} width="auto" src={ImageUrl} alt={pelicula.title}/>
                <div className="info-pelicula">
                    <h3>{pelicula.title}</h3>
                </div>
            </Link>
        </div>
    )
}
export default Pelicula;