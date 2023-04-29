import './Series.css'
import { Carrousel } from '../Carrousel/Carrousel'
import { Banner } from '../Banner/Banner'
import { Footer } from '../Footer/Footer'

export const Series = ( ) => {
    return( 
        <div className='Series'>
            <div className='Series-contenedor'>
                
                <Carrousel tipoFiltro='clase' filtro='Series'/>
            </div>
            <Footer />
        </div>
    )
}