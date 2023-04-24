import './Login.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Login = () =>{
    const navigate = useNavigate()
    const [ login , setLogin ] = useState({
        email :  '' ,
        pass:  '' 
    })

    // COMPROBAR EL LOCALSTORAGE
    useEffect( () => {
        const comprobarLocal = JSON.parse( localStorage.getItem('usuarios') )
        if( comprobarLocal ){
            navigate("/app/main")
        }
    } , [])


    const [ logeado , setLogeado ] = useState( null )

    // HANDLER DEL INPUT
    const inputHandler = ( { target }) =>{
        const { name , value } = target
        setLogin({ ...login , [name] : value})
    }

    // SUBMIT DEL FORMULARIO CON METODO POST DEL LOGIN
    const formHandler = ( e ) =>{
        e.preventDefault()

        let controller = new AbortController()

        let options = {
            method : 'post',
            signal : controller.signal,
            body : JSON.stringify( login ),
            headers : {
                "Content-type" : 'application/json'
            }
        }

        fetch('https://netflix-api-luismi11.vercel.app/contenido/login' , options)
        .then( res => res.json())
        .then( data => {
            console.log( data )
            if( data.entrar ){
                // Guardas los datos en LocalStorage
                localStorage.setItem('usuarios' , JSON.stringify( login ))
                navigate( "/app/main" , { replace:true }  )
            }else{
                setLogeado(data.mensaje)
            }
        })
        .catch( err => console.log(err))
        .finally( () => controller.abort())
    }
    return(
            <div className='Login'>
                <header className="Login-header">
                    <h1 className="Login-h1">
                        <img src='./assets/Netflix_Logo_PMS.png' alt="Logo Netflix" className="Login-img" />
                    </h1>
                </header>
                <div className='Login-container'>
                    <h2 className="Login-h2">Iniciar sesión</h2>

                    <form className='Login-form' onSubmit={ formHandler }>
                        <input className='Login-input' name='email' type="email" value={login.email || ''} onChange={ e => inputHandler(e) } placeholder='Escribe tu usuario' />
                        <input className='Login-input' name='pass' type="password" value={login.pass || ''} onChange={ e => inputHandler(e) } placeholder='Escribe tu contraseña'/>
                        <input className='Login-input submit' type="submit" value="Iniciar sesión" />
                    </form>
                    { logeado && <p className='Error-p'> { logeado } </p>}
                </div>
                <footer className="Login-footer"></footer>
            </div>
    )
}