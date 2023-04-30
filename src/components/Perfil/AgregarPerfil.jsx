import './Perfil.css'

export const AgregarPerfil = ({ isActive , formHandler, formulario , inputHandler , popBtnHandler}) => {
    const cancelarHandler = ( e ) => {
        e.preventDefault()
        popBtnHandler()
    }
    return(
        <div className={`PopPerfil-contenedor ${ isActive ? 'isActive': '' }`}>
                <h2 className='Perfil-h1'>Añadir Perfil</h2>
                <p className='NuevoPerfil-p'>Crea un perfil para otra persona que usa Netflix</p>

                <form onSubmit={ formHandler } className='NuevoPerfil-form' >
                    <div className='Input-contenedor'>
                        <div className='NuevoPerfil-Img-wrapper' style={{ backgroundColor: `rgb(${[0,0,0].map(() => Math.ceil(Math.random()*255)).join(",")})`}}>
                            <img className='NuevoPerfil-img' src="./assets/icono-nuevoperfil.png" alt="Icono perfil" />
                        </div>
                        <div className='Input-wrapper'>
                            <input
                                className='NuevoPerfil-input'
                                type="text"
                                name="nombre"
                                placeholder='Ingresa tu nombre'
                                value={ formulario.nombre }
                                onChange={inputHandler}/>
                            <input
                                className='NuevoPerfil-input'
                                type="email"
                                name="email"
                                placeholder='Ingresa tu email'
                                value={ formulario.email }
                                onChange={inputHandler}/>
                            <input
                                className='NuevoPerfil-input'
                                type="text"
                                name="pass"
                                placeholder='Ingresa una contraseña'
                                value={ formulario.pass }
                                onChange={inputHandler}/>
                        </div>
                    </div>
                    <div className='Submit-contenedor'>
                        <input className='NuevoPerfil-submit' type="submit" value="Añadir" />
                        <button onPointerDown={ cancelarHandler } className='NuevoPerfil-submit'>Cancelar</button>
                    </div>
                </form>
            </div>
    )
}