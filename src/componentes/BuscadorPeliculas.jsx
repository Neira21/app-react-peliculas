import {FaSearch} from 'react-icons/fa'
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useLocation} from 'react-router-dom'

function useQuery(){
    return new URLSearchParams(useLocation().search);   
}


const BuscadorPeliculas = () =>{
    
    const navigate = useNavigate();
    
    const handleSubtmit = (e) => {
        e.preventDefault();
        
    }

    const query = useQuery();
    const search = query.get("search");


    return (
        
        <form className="formulario-contenedor" onSubmit={handleSubtmit}>
            <div className="formulario" >
                <input 
                    className="entrada-busqueda" 
                    placeholder="Buscar película" 
                    type="text" 
                    value={search|| ''}
                    onChange={(e) => {
                        const value = e.target.value;
                        navigate(`/?search=${value}`);
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

