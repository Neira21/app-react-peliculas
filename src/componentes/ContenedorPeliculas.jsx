import {useEffect, useState} from 'react'; 
import axios from 'axios';
import Pelicula from './Pelicula';
import Spinner from './Spinner/Spinner';
import { useLocation } from 'react-router-dom';
//import BuscadorPeliculas from './BuscadorPeliculas';

function useQuery(){
    return new URLSearchParams(useLocation().search);   
}

const API_URL = "https://api.themoviedb.org/3/"
const API_KEY = "786ee52ce60c9ebb3805127db53d7f67"

const ContenedorPeliculas = () => {

    const [peliculas, setPeliculas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const query = useQuery();
    const search = query.get("search");


    const ObtenerPeliculas = async (url, search) => {
        const {data: {results}} = await axios.get(`${API_URL}/${url}`, {
            params: {
                api_key: API_KEY,
                language: "es-ES",
                query: search
            }
        })
        setPeliculas(results)
        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(true);
        const searchUrl = search ? `search/movie?query=${search}` : "discover/movie";
        ObtenerPeliculas(searchUrl, search)
    }, [search]);

    if(isLoading) return <Spinner/>

    return (
        <div>
            
            <div className="contenedor-peliculas">
                {peliculas.map((pelicula) => (
                    <Pelicula key={pelicula.id} pelicula={pelicula} />
                ))}
            </div>
        </div>
    )
}

export default ContenedorPeliculas;