import ContenedorPeliculas from "../componentes/ContenedorPeliculas";
import BuscadorPeliculas from "../componentes/BuscadorPeliculas";
import { useLocation } from 'react-router-dom';
import {useDebounce} from '../hooks/useDebounce';

function useQuery(){
    return new URLSearchParams(useLocation().search);   
}


const VistaPeliculas = () => {
    const query = useQuery();
    const search = query.get("search");
    const searchDebounced = useDebounce(search, 500);
    
    return (
        <>
            <BuscadorPeliculas/>
            <ContenedorPeliculas key={searchDebounced} search={searchDebounced} />
        </>
    );
}

export default VistaPeliculas;