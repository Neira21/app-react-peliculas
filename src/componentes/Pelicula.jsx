import { Link } from "react-router-dom";

const Pelicula = ({pelicula}) => {
    return (
        <div className="carta-pelicula">
            <Link to={"/movies/"+pelicula.id}>
                <img height={500} width="auto" src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title}/>
                <div className="info-pelicula">
                    <h3>{pelicula.title}</h3>
                </div>
            </Link>
        </div>
    )
}
export default Pelicula;