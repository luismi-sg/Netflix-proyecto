import './Peliculas.css'
import { Carrousel } from '../Carrousel/Carrousel'
import { Banner } from '../Banner/Banner'
import { Footer } from '../Footer/Footer'

export const Peliculas = ( ) => {
    return( 
        <div className='Peliculas'>
            <div className='Peliculas-contenedor'>
                
                <Carrousel tipoFiltro='clase' filtro='Peliculas'/>
            </div>
            <Footer />
        </div>
    )
}