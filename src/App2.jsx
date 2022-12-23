import React, {useEffect} from "react";
import axios from "axios";


const App2 = () => {
    const API_URL = "https://api.themoviedb.org/3/"
    const API_KEY = "786ee52ce60c9ebb3805127db53d7f67"

    const [movies, setMovies] = React.useState([]); 


    const fecthMovies = async () =>{
        const {data : {results}, } = await axios.get(`${API_URL}/discover/movie`, {
            params: {
                api_key: API_KEY,
            },
        });
        console.log(results);
        setMovies(results);
        
    }

    useEffect(() => {
        fecthMovies();
    }, []);

    return(
        <div>

            {movies.map((movie) => {
                return(
                    <div>
                        <h1>{movie.title}</h1>
                        <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt=""/>
                    </div>
                )
            })}
        </div>
    )

}
export default App2;