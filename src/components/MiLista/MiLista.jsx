import './MiLista.css'
import { Carrousel } from '../Carrousel/Carrousel'

export const MiLista = ( ) => {
    return( 
        <div className='MiLista'>
            <div className='MiLista-contenedor'>
                
                <Carrousel tipoFiltro='milista' filtro='true'/>
            </div>
        </div>
    )
}