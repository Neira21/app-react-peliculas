import {FaSearch} from 'react-icons/fa'
import {useSearchParams} from 'react-router-dom'

const BuscadorPeliculas = () =>{
    const [query, setQuery] = useSearchParams();
    const search = query.get("search");
        
    const handleSubtmit = (e) => {
        e.preventDefault();    
    }
    return (
        
        <form className="formulario-contenedor" onSubmit={handleSubtmit}>
            <div className="formulario" >
                <input 
                    className="entrada-busqueda" 
                    placeholder="Buscar película" 
                    aria-label='Search'
                    type="text" 
                    value={search|| ''}
                    onChange={(e) => {
                        const value = e.target.value;
                        setQuery( {search: value})
                        //navigate(`/?search=${value}`);
                        //const value = e.target.value;
                        //para reemplazar toda la url, se pasa un 2do parametro que es un objeto con la propiedad replace en true
                    }}
                />
                <FaSearch className='boton-formulario' color='black' size={30}/>
            </div>
        </form>
    )
}

export default BuscadorPeliculas

