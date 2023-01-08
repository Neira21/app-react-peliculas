import {FaSearch} from 'react-icons/fa'
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useLocation} from 'react-router-dom'

function useQuery(){
    return new URLSearchParams(useLocation().search);   
}


const BuscadorPeliculas = () =>{
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();
    
    const handleSubtmit = (e) => {
        e.preventDefault();
        navigate(`/?search=${searchText}`)
    }

    const query = useQuery();
    const search = query.get("search");

    useEffect(() => {
        setSearchText(search || "");
    }, [search])


    return (
        
        <form className="formulario-contenedor" onSubmit={handleSubtmit}>
            <div className="formulario" >
                <input 
                    className="entrada-busqueda" 
                    placeholder="Buscar película" 
                    type="text" 
                    value={searchText} 
                    onChange={(e) =>{
                        setSearchText(e.target.value);
                        //const value = e.target.value;
                        //para reemplazar toda la url, se pasa un 2do parametro que es un objeto con la propiedad replace en true
                    }}
                />

                <button className="boton-formulario" type="submit" >
                    <FaSearch size={30}/>
                </button>
            </div>
        </form>
            
        
    )
}

export default BuscadorPeliculas

