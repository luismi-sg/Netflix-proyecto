import './Header.css'
import { useState , useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export const Header = () => {

const navigate = useNavigate()

const CerrarSesion = () => {
    localStorage.removeItem('usuarios')
    navigate("/")
}
    return( 
        <div className='Header'>
            <div className='Header-container'>
                <div className='Header-menu'>
                    <LogoComp />
                    <MenuComp />
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
const MenuComp = () => {

    const [ menu , setMenu ] = useState([])

    useEffect( () => {
        let controller = new AbortController()
        let options = {
            method : "get",
            signal : controller.signal,
            headers : {
                "Content-type" : "application/json"
            }
        }
        fetch('http://localhost:4000/header/menu' , options )
        .then(res => res.json())
        .then( data => setMenu( data.netflixData ))
        .catch( err => console.log( err ))
        .finally( () => controller.abort() )
    } , [])

    return(

        <ul className="Menu-ul">
            { menu && menu.map( ({_id , href , texto }) =>   
                <li key={_id} className="Menu-li">
                    <NavLink to={href} title={texto} className="Menu-a"> {texto} </NavLink>
                </li>
            )}
        </ul>
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
        fetch('http://localhost:4000/header/h1' , options )
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
