import {useEffect, useState} from 'react'; 
import axios from 'axios';
import Pelicula from './Pelicula';
import Spinner from './Spinner/Spinner';
import BuscadorPeliculas from './BuscadorPeliculas';

const API_URL = "https://api.themoviedb.org/3/"
const API_KEY = "786ee52ce60c9ebb3805127db53d7f67"


const ContenedorPeliculas = () => {

    const [peliculas, setPeliculas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const ObtenerPeliculas = async (url) => {
        
        const {data: {results}} = await axios.get(`${API_URL}/${url}`, {
            params: {
                api_key: API_KEY,
                language: "es-ES",
                page: 2
            }
        })
        setPeliculas(results)
        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(true);
        ObtenerPeliculas("discover/movie")
    }, []);

    if(isLoading) return <Spinner/>

    return (
        <div>
            <div className='inline'>
                <h1>Películas</h1>
                <BuscadorPeliculas/>
            </div>
            
            
            <div className="contenedor-peliculas">
                {peliculas.map((pelicula) => (
                    <Pelicula key={pelicula.id} pelicula={pelicula} />
                ))}
            </div>
        </div>
        
    )
}

export default ContenedorPeliculas;