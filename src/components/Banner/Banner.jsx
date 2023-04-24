import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Banner.css'

export const Banner = () => {

    const navigate = useNavigate()

    const [ banner , setBanner ] = useState([])

    let bannerRandom = Number(Math.ceil(Math.random() * (banner.length - 1)))

    const [ activeBanner, setActiveBanner ] = useState( 0 )
    // activeBanner = setActiveBanner( bannerRandom )

    const actualizarBanner = ( nuevoIndice ) => {
        if ( nuevoIndice < 0 ) {
            nuevoIndice = banner.length - 1
        } else if ( nuevoIndice > banner.length ){
            nuevoIndice = 0
        }
        setActiveBanner( nuevoIndice )
    }
    useEffect(() => {
        
        const interval = setInterval(() => {
            actualizarBanner(bannerRandom)
        }, 7000)
        console.log( activeBanner )
        return () => clearInterval(interval)
    })
    

    useEffect( () => {
        let controller = new AbortController()
        let options = {
            method : "get",
            signal : controller.signal,
            headers : {
                "Content-type" : "application/json"
            }
        }
        fetch('https://netflix-api-luismi11.vercel.app/contenido' , options )
        .then(res => res.json())
        .then( data => setBanner( data.netflixData ))
        .catch( err => console.log( err ))
        .finally( () => controller.abort() )
        
    } , [] ) 
    const reproducirHandler = ( _id ) => {

        // navigate(`/reproducir/${_id}`)
        navigate('/reproducir')
    }

    return(
        <div className='Banner'>
                { banner && banner.map( ( {_id , id , imgTitulo , genero , descripcion , banner} ) =>
                        <div key={ _id }
                        className='Banner-contenedor'
                        style = {{ backgroundImage: `url(${ banner.src })`,
                                opacity: `${ activeBanner === id ? '1' : '0' }`
                                }}>
                            <div className='Banner-fondonegro' >
                            {/* FALTA CAMBIAR DE FONDO POR CADA UNA */}
                                <div className='Banner-titulo' >  
                                    <h2 className='Titulo-h2'>
                                        <img className='Titulo-img' src={ imgTitulo.src } alt="" />
                                    </h2>
                                    <h3 className='Titulo-h3'> {genero} </h3>
                                    <p className='Titulo-p'> {descripcion} </p>
                                    <button onPointerDown={ () => reproducirHandler( _id ) } className='Titulo-button reproducir'>Reproducir</button>
                                    <button onPointerDown={ () => reproducirHandler( _id ) } className='Titulo-button masinfo'>Más información</button>
                                </div>
                            </div>
                        </div>

                )}
        </div>
    )
}