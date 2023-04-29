import './MiLista.css'
import { Carrousel } from '../Carrousel/Carrousel'
import { Footer } from '../Footer/Footer'

export const MiLista = ( ) => {
    return( 
        <div className='MiLista'>
            <div className='MiLista-contenedor'>
                <h2 className='MiLista-h2'>Mi lista de favoritos</h2>
                <Carrousel tipoFiltro='milista' filtro='true'/>
            </div>
            <Footer />
        </div>
    )
}