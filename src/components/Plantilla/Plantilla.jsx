import './Plantilla.css'
import { useEffect , useState } from 'react'
import { Header } from '../Header/Header'
import { Outlet, useNavigate } from 'react-router-dom'


export const Plantilla = () => {

    // Comprobar que en el LocalStorage existe la propiedad que se crea en el login

    const navigate = useNavigate()

    useEffect( () => {
        const local = JSON.parse(localStorage.getItem('usuarios'))
        console.log( local && `Usuario ${ local.email } guardado en el LocalStorage`)
        if( !local ){
            navigate("/")
        }
    } , [])
    
    return(
        <div className='Plantilla'>
            <div className='Plantilla-contenedor'>
                <Header />
                <Outlet />
            </div>
        </div>
    )
}