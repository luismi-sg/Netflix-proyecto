import { useEffect, useState } from 'react'
import { VideoLoading } from '../VideoLoading/VideoLoading'
import './Reproducir.css'
import { useNavigate, useParams } from 'react-router-dom'

export const Reproducir = ( ) => {
    const [ contenidoById , setContenidoById ] = useState([])

    const { id } = useParams()

    useEffect( ( ) => {
        let controller = new AbortController()
        let options = {
            method : "get",
            signal : controller.signal,
            headers : {
                "Content-type" : "application/json"
            }
        }
        fetch(`https://netflix-api-luismi11.vercel.app/contenido/id/${ id }` , options )
        .then(res => res.json())
        .then( data => setContenidoById( data.netflixData[0] ))
        .catch( err => console.log( err ))
        .finally( () => controller.abort() )
    } , [])
    console.log( contenidoById )

    const [ acciones , setAcciones ] = useState([])
    useEffect( () => {
        let controller = new AbortController()
        let options = {
            method : "get",
            signal : controller.signal,
            headers : {
                "Content-type" : "application/json"
            }
        }
        fetch('https://netflix-api-luismi11.vercel.app/' , options )
        .then(res => res.json())
        .then( data => setAcciones( data.netflixData[0] ))
        .catch( err => console.log( err ))
        .finally( () => controller.abort() )
        
    } , [])
    
    const { bandera , reproducion , opcionesRep , flechaAtras } = acciones

    const navigate = useNavigate()
    const volverHandler = () => navigate("/")
    
    return( 
        <div className="Reproducir">
            <div className="Reproducir-contenedor">
                <div className='Navegar-contenedor'>
                    { flechaAtras && 
                            <img onPointerDown={ volverHandler } className='Reproducir-icon' src={flechaAtras.src} alt={flechaAtras.alt} />
                    }
                    { bandera && 
                        <img className='Reproducir-icon' src={ bandera.src } alt={ bandera.alt } />
                    }
                </div >
                <div className='Video-contenedor'>
                    <VideoLoading />
                </div>
                <div className='Info-contenedor'>
                    <ul className='Info-ul'>
                        {   reproducion && reproducion.map( ( { id , src , alt } ) =>  
                            <li key={id} ><img className='Reproducir-icon' src={src} alt={alt} /></li>
                        )}
                        
                    </ul>
                    <h2 className='Info-h2'> {contenidoById.titulo} </h2>
                    <ul className='Info-ul'>
                        { opcionesRep && opcionesRep.map( ({ id , src , alt}) => 
                            <li key={id}><img className='Reproducir-icon' src={src} alt={alt} /></li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}