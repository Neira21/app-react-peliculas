import React, {useState, useEffect} from "react";
import axios from "axios";
import YouTube from "react-youtube";

const MyApp = () =>{

    const API_URL = "https://api.themoviedb.org/3/"
    const API_KEY = "786ee52ce60c9ebb3805127db53d7f67"
    const IMAGE_URL = "https://image.tmdb.org/t/p/original"
    const URL_IMAGE = "https://image.tmdb.org/t/p/original"

    //Variables de estado
    const [movies, setMovies] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [trailer, setTrailer] = useState(null);
    const [movie, setMovie] = useState({title: "Loading Movie"});
    const [playing, setPlaying] = useState(false);

    //Función para traer las películas
    const fetchMovies = async (searchKey) => {
        const type = searchKey ? "search" : "discover";
        const {data : {results}, } = await axios.get(`${API_URL}/${type}/movie`, {
            params: {
                api_key: API_KEY,
                query: searchKey,
            },
        });
        console.log(results);
        setMovies(results);
        setMovie(results[0]);
    }

    //Funcion para buscar una película
    const searchMovie = (e) => {
        e.preventDefault();
        fetchMovies(searchKey);
    }

    useEffect(() => {
      fetchMovies();
    }, [])
    
    

    return(
        <div>

            <h2 className="text-center mt-5 mb-5">Trailer Movies</h2>

            <form className="container mb-4" onSubmit={searchMovie}>
                <input type="text" name="" placeholder="search" onChange={(e)=> setSearchKey(e.target.value)}/>
                <button className="btn btn-primary">Search</button>
            </form>


            {/* Contenedor de peliculas */}

            <div className="container mt-3">
                <div className="row">
                    {movies.map((movie) => (
                        <div key={movie.id} className="col-md-4 mb-3">
                            <img src={`${URL_IMAGE + movie.poster_path}`} alt="" height={600} width="100%"/>
                            <h4 className="text-center">{movie.title}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default MyApp;