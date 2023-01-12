import {useEffect, useState} from 'react'; 
import axios from 'axios';
import Pelicula from './Pelicula';
import Spinner from './Spinner/Spinner';

import InfiniteScroll from 'react-infinite-scroll-component';
import Empty from './Empty';

const API_URL = "https://api.themoviedb.org/3/"
const API_KEY = "786ee52ce60c9ebb3805127db53d7f67"

const ContenedorPeliculas = ({search}) => {

    const [peliculas, setPeliculas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    /*
        useEffect(() => {
            const ObtenerPeliculas = async (url, search) => {
                const results = await axios.get(`${API_URL}/${url}`, {
                    params: {
                        api_key: API_KEY,
                        language: "es-ES",
                        query: search,
                        page: page
                    }
                })
                setPeliculas(prevPeliculas => prevPeliculas.concat(results.data.results))
                setHasMore(results.data.page < results.data.total_pages);
                setIsLoading(false);
            };
            setIsLoading(true);
            const searchUrl = search ? `search/movie?query=${search}` : "discover/movie";
            ObtenerPeliculas(searchUrl, search)
        }, [search, page]);
    */

    const ObtenerPeliculas = async (url, search) => {
        const results = await axios.get(`${API_URL}/${url}`, {
            params: {
                api_key: API_KEY,
                language: "es-ES",
                query: search,
                page: page
            }
        })
        setPeliculas(prevPeliculas => prevPeliculas.concat(results.data.results))
        setHasMore(results.data.page < results.data.total_pages);
        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(true);
        const searchUrl = search ? `search/movie?query=${search}` : "discover/movie";
        ObtenerPeliculas(searchUrl, search)
    }, [search, page]);

    if(!isLoading && peliculas.length === 0) return <Empty />

    return (
        
        <InfiniteScroll
            dataLength={peliculas.length}
            next={() => setPage(prevPage => prevPage + 1)}
            hasMore={hasMore}
            loader={<Spinner />}
        >
            <div className="contenedor-peliculas">
                {peliculas.map((pelicula) => (
                    <Pelicula key={pelicula.id} pelicula={pelicula} />
                ))}
            </div>
        </InfiniteScroll>
    )
}

export default ContenedorPeliculas;