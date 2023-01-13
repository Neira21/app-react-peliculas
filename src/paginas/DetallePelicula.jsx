import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Spinner from "../componentes/Spinner/Spinner";
import placeholder from "../imagenes/placeholder.png";

const DetallePelicula = () => {

    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    const API_URL = "https://api.themoviedb.org/3"
    const API_KEY = "786ee52ce60c9ebb3805127db53d7f67"

    const obtenerDetallePelicula = async (url) => {
        const {data} = await axios.get(`${API_URL}/${url}`, {
            params: {
                api_key: API_KEY,
            }
        })
        setIsLoading(false);
        setMovie(data);
    }
    
    useEffect(() => {
        setIsLoading(true);
        obtenerDetallePelicula(`movie/${movieId}`)
        
    }, [movieId]);
    
    if(isLoading) return <Spinner/>
    
    console.log(movie)

    if (!movie) {
        return null;
      }

    const imageUrl = movie.poster_path ? "https://image.tmdb.org/t/p/w500" + movie.poster_path: placeholder;
    return (
      <div className="contenedor-detalle-pelicula">
        <div>
          <img
            src={imageUrl}
            alt={movie.title}
            width="300"
          />
        </div>
        

        <div className="info-detalle-pelicula">
          <p>
            <strong>Title:</strong> {movie.title}
          </p>
          <p>
            <strong>Genres: </strong> 
            {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p>
            <strong>Description:</strong> {movie.overview}
          </p>
        </div>
      </div>
    )

}

export default DetallePelicula;