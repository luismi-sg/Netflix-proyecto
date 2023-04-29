import './Header.css'
import { useState , useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export const Header = () => {

const navigate = useNavigate()

const [ menuIsActive , setmenuIsActive ] = useState(false)
const menuhandler = () => setmenuIsActive(!menuIsActive)

const CerrarSesion = () => {
    localStorage.removeItem('usuarios')
    navigate("/")
}
    return( 
        <div className='Header'>
            <div className='Header-container'>
                <div className='Header-menu'>
                    <div onPointerDown={ menuhandler } className='Menu-toggle'>
                        <svg fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                    </div>
                    <LogoComp />
                    <MenuComp menuIsActive={ menuIsActive } setmenuIsActive={ setmenuIsActive }/>
                </div>
                <div className='Header-session'>
                    <ul className="Session-ul">
                        <li className="Session-li">
                            <img src="/assets/buscar.svg" alt="" className="Session-icon" />
                        </li>
                        <li className="Session-li">
                            <NavLink to="/perfil" className="Session-a">
                                <img src="/assets/icono-perfil1.png" alt="" className="Session-icon" />
                            </NavLink>
                        </li>
                        <li className="Session-li">
                            <button className="Session-btn" onPointerDown={ CerrarSesion }>
                                <img src="/assets/close.svg" alt="" className="Session-icon" />
                            </button>  
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

{/* COMPONENTE DEL LOGO NETFLIX */}
const MenuComp = ( {menuIsActive , setmenuIsActive } ) => {

    const [ menu , setMenu ] = useState([])
    const menuhandler = () => setmenuIsActive(!menuIsActive)
    useEffect( () => {
        let controller = new AbortController()
        let options = {
            method : "get",
            signal : controller.signal,
            headers : {
                "Content-type" : "application/json"
            }
        }
        fetch('https://netflix-api-luismi11.vercel.app/header/menu' , options )
        .then(res => res.json())
        .then( data => setMenu( data.netflixData ))
        .catch( err => console.log( err ))
        .finally( () => controller.abort() )
    } , [])

    return(
        <nav className={`Menu-contenedor ${ menuIsActive ? 'MenuisActive' : '' }`}>
            
            <ul className='Menu-ul'>
                <li className='Menu-toggle' onPointerDown={ menuhandler } >
                    <svg fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                </li>
                { menu && menu.map( ({ _id , href , texto }) =>   

                    <li key={_id} className="Menu-li" >
                        <NavLink to={ href } title={ texto } className="Menu-a" > {texto} </NavLink>
                    </li>
                )}
            </ul>    
        </nav>
        
    )
}

{/* COMPONENTE DEL MENU NETFLIX */}
const LogoComp = () => {

    const [ logo , setLogo ] = useState([])

    useEffect( () => {
        let controller = new AbortController()
        let options = {
            method : "get",
            signal : controller.signal,
            headers : {
                "Content-type" : "application/json"
            }
        }
        fetch('https://netflix-api-luismi11.vercel.app/header/h1', options )
        .then(res => res.json())
        .then( data => setLogo( data.netflixData ))
        .catch( err => console.log( err ))
        .finally( () => controller.abort() )
    } , [])

    return( 
        <h1 className="Header-h1"> 
            { logo && logo.map( ({_id , href , alt , src }) => 
                <a key={_id} className='Header-a' href={href} title={ alt }>
                    <img  src={ src } alt={ alt } className="Header-img" />
                </a>)
            }
        </h1>
    )
}
