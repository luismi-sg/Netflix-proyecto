import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Banner.css'

export const Banner = ({ tipoFiltro , filtro }) => {

    const url = 'https://netflix-api-gamma.vercel.app' || 'http://localhost:4000'

    const navigate = useNavigate()

    const [ banner , setBanner ] = useState([])

    //FUNCION PARA ASIGNAR UN NUMERO ALEATORIO ENTRE EL 0 Y EL ULTIMO INDICE DEL ITEM DEL CONTENIDO BANNERS
    let bannerRandom = Number(Math.ceil(Math.random() * (banner.length - 1)))

    const [ activeBanner, setActiveBanner ] = useState( bannerRandom )

    // ASIGNA UN NUEVO INDICE Y LO GUARDA EN UN STATE
    const actualizarBanner = ( nuevoIndice ) => {
        if ( nuevoIndice < 0 ) {
            nuevoIndice = banner.length - 1
        } else if ( nuevoIndice > banner.length ){
            nuevoIndice = bannerRandom
        }
        setActiveBanner( nuevoIndice )
    }

    // UTLIZAR EL INDICE ANTERIOR PARA HACER UNA FUNCION CON INTERVALOS PARA ALTERNAR EL CONTENIDO DE LOS BANNERS
    useEffect(() => {
        
        const interval = setInterval(() => {
            actualizarBanner(bannerRandom)
        }, 7000)
        return () => clearInterval(interval)
    })

    // FETCH PARA LLAMAR A TODO EL CONTENIDO DE BANNERS
    useEffect( () => {
        let controller = new AbortController()
        let options = {
            method : "get",
            signal : controller.signal,
            headers : {
                "Content-type" : "application/json"
            }
        }
        fetch(`${url}/contenido` , options )
        .then(res => res.json())
        .then( data => setBanner( data.netflixData ))
        .catch( err => console.log( err ))
        .finally( () => controller.abort() )
        
    } , [] ) 
    const reproducirHandler = ( _id ) => {
        navigate(`/reproducir/${_id}`)
    }

    // //FILTRA LOS BANNER UTILIZADO EN OTROS COMPONENTES
    // const [ filtrar, setfiltrar ] = useState([])
    // useEffect( () => { 
    //     const buscar = banner.filter(eachBanner => eachBanner[tipoFiltro] === filtro )
    //     setfiltrar( buscar )
    // } , [ banner ])
    
    return(
        <div className='Banner'>
            { banner && banner.map( ( {_id , id , imgTitulo , genero , descripcion , banner} ) =>
                <div key={ _id }
                className='Banner-contenedor'
                style = {{ backgroundImage: `url(${ banner.src })`,
                        display: `${ activeBanner === id ? 'flex' : 'none'}`
                        }}>
                    <div className='Banner-fondonegro' >
                    {/* FALTA CAMBIAR DE FONDO POR CADA UNA */}
                        <div className='BannerTitulo-wrapper'>
                            <div className='BannerTitulo' >  
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
                </div>)}
        </div>
    )
}