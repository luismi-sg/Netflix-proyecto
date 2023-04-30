import './Peliculas.css'
import { Carrousel } from '../Carrousel/Carrousel'
import { Footer } from '../Footer/Footer'

export const Peliculas = ( ) => {
    return( 
        <div className='Peliculas'>
            <div className='Peliculas-contenedor'>
                {/* CARRUSEL CON TIPO DE FILTRO Y FILTROS */}
                <Carrousel tipoFiltro='clase' filtro='Peliculas'/>
            </div>
            <Footer />
        </div>
    )
}