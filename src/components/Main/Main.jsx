import './Main.css'
import { Carrousel } from '../Carrousel/Carrousel'
import { Banner } from '../Banner/Banner'
import { Footer } from '../Footer/Footer'


export const Main = () => {


    return(
        <div className='Main'>
            <div className='Main-contenedor'>
                <Banner />
                <div className='Carrouseles-wrapper'>
                    <Carrousel tipoFiltro='clase' filtro='Peliculas'/>
                    <Carrousel tipoFiltro='clase' filtro='Series'/>
                </div>
                <Footer />
            </div>
        </div>
    )
}