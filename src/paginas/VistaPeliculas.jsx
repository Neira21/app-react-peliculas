import ContenedorPeliculas from "../componentes/ContenedorPeliculas";
import BuscadorPeliculas from "../componentes/BuscadorPeliculas";
import { useSearchParams } from 'react-router-dom';
import {useDebounce} from '../hooks/useDebounce';

const VistaPeliculas = () => {
    const [query] = useSearchParams();
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