import ContenedorPeliculas from "../componentes/ContenedorPeliculas";
import BuscadorPeliculas from "../componentes/BuscadorPeliculas";
import { useLocation } from 'react-router-dom';

function useQuery(){
    return new URLSearchParams(useLocation().search);   
}


const VistaPeliculas = () => {
    const query = useQuery();
    const search = query.get("search");
    return (
        <>
            <BuscadorPeliculas/>
            <ContenedorPeliculas key={search} search={search} />
        </>
    );
}

export default VistaPeliculas;