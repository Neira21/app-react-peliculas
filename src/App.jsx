import React, {useState, useEffect} from "react";
import axios from "axios";
import YouTube from "react-youtube";

const MyApp = () =>{

    const API_URL = "https://api.themoviedb.org/3/"
    const API_KEY = "786ee52ce60c9ebb3805127db53d7f67"
    const IMAGE_PATH = "https://image.tmdb.org/t/p/original"
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

        if(results.length){
            await fetchMovie(results[0].id)
        }

    }

    //función para seleccionar movie y salga el trailer
    const selectMovie = async (movie) => {
        await fetchMovie(movie.id);
        setMovie(movie);
        window.scrollTo(0, 0);
    }
    

    //función para la petición de un solo objeto y mostrar reproductor de video
    const fetchMovie = async (id) => {
        const {data} = await axios.get(`${API_URL}/movie/${id}`, {
            params: {
                api_key: API_KEY,
                append_to_response: "videos",
            },
        })

        if(data.videos && data.videos.results){
            const trailer = data.videos.results.find(
                (video) => video.name === "Trailer" || video.name === "Official Trailer"
            );
            setTrailer(trailer ? trailer : data.video.results[0]);
        }
        setMovie(data);
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

            {/* Aquí va el contenedor del Banner y el trailer de la película */}

            <div>
                <main>
                {movie ? (
                    <div
                    className="viewtrailer"
                    style={{
                        backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`,
                    }}
                    >
                    {playing ? (
                        <>
                            <YouTube
                                videoId={trailer.key}
                                className="reproductor container"
                                containerClassName={"youtube-container amru"}
                                opts={{
                                width: "100%",
                                height: "100%",
                                playerVars: {
                                    autoplay: 1,
                                    controls: 0,
                                    cc_load_policy: 0,
                                    fs: 0,
                                    iv_load_policy: 0,
                                    modestbranding: 0,
                                    rel: 0,
                                    showinfo: 0,
                                },
                            }}
                        />
                        <button onClick={() => setPlaying(false)} className="boton">
                            Close
                        </button>
                        </>
                    ) : (
                        <div className="container">
                        <div className="">
                            {trailer ? (
                            <button
                                className="boton"
                                onClick={() => setPlaying(true)}
                                type="button"
                            >
                                Play Trailer
                            </button>
                            ) : (
                            "Sorry, no trailer available"
                            )}
                            <h1 className="text-white">{movie.title}</h1>
                            <p className="text-white">{movie.overview}</p>
                        </div>
                        </div>
                    )}
                    </div>
                ) : null}
                </main>
            </div>

            {/* Contenedor de peliculas */}

            <div className="container mt-3">
                <div className="row">
                    {movies.map((movie) => (
                        <div key={movie.id} className="col-md-4 mb-3">
                            <img src={`${URL_IMAGE + movie.poster_path}`} alt="" height={600} width="100%" onClick={()=>selectMovie(movie)}/>
                            <h4 className="text-center">{movie.title}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default MyApp;