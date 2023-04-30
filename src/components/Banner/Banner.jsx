import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Banner.css'

export const Banner = ({ tipoFiltro , filtro }) => {

    const url = 'https://netflix-api-gamma.vercel.app' || 'http://localhost:4000'

    const navigate = useNavigate()

    const [ banner , setBanner ] = useState([])

    //FUNCION PARA ASIGNAR UN NUMERO ALEATORIO ENTRE EL 0 Y EL ULTIMO INDICE DEL ITEM DEL CONTENIDO BANNERS
    let bannerRandom = Number(Math.floor(Math.random() * banner.length))

    const [ activeBanner, setActiveBanner ] = useState( bannerRandom )

    // UTLIZAR EL INDICE ANTERIOR PARA HACER UNA FUNCION CON INTERVALOS PARA ALTERNAR EL CONTENIDO DE LOS BANNERS
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveBanner(bannerRandom)
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
                                <div className='Button-Wrapper'>
                                    <button onPointerDown={ () => reproducirHandler( _id ) } className='Titulo-button reproducir'>
                                        <img className='Button-icon' src='/assets/play-negro.svg' alt=''/>
                                        <p className='Button-p'>Reproducir</p>
                                    </button>
                                    <button onPointerDown={ () => reproducirHandler( _id ) } className='Titulo-button masinfo'>
                                        <img className='Button-icon' src='/assets/masinfo.svg' alt=''/>
                                        <p className='Button-p'>Más información</p>
                                    </button>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>)}
        </div>
    )
}