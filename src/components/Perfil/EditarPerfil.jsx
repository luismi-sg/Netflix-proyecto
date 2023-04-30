import './Perfil.css'

export const EditarPerfil = ( {  isActiveEditar , formUpdateHandler , formularioUpdate , inputUpdateHandler , popBtnEditarHandler} ) => {
    const cancelarEditarHandler = ( e ) => {
        e.preventDefault()
        popBtnEditarHandler()
    }
    return(
        <div className={`PopPerfil-contenedor ${ isActiveEditar ? 'isActive': '' }`}>
                <h2 className='Perfil-h1'>Editar Perfil</h2>
                <p className='NuevoPerfil-p'>Edita los datos de tu perfil de Netflix</p>

                <form onSubmit={ formUpdateHandler } className='NuevoPerfil-form' >
                    <div className='Input-contenedor'>
                        <div className='NuevoPerfil-Img-wrapper' style={{ backgroundColor: `rgb(${[0,0,0].map(() => Math.ceil(Math.random()*255)).join(",")})`}}>
                                <img className='NuevoPerfil-img' src="./assets/icono-nuevoperfil.png" alt="Icono perfil" />
                        </div>
                        <div>
                            <input
                                className='NuevoPerfil-input'
                                type="text"
                                name="nombre"
                                value={ formularioUpdate.nombre }
                                onChange={inputUpdateHandler}/>
                            <input
                                className='NuevoPerfil-input'
                                type="email"
                                name="email"
                                value={ formularioUpdate.email }
                                onChange={inputUpdateHandler}/>
                            <input
                                className='NuevoPerfil-input'
                                type="text"
                                name="pass"
                                value={ formularioUpdate.pass }
                                onChange={inputUpdateHandler}/>
                        </div>
                    </div>
                    <div className='Submit-contenedor'>
                        <input className='NuevoPerfil-submit' type="submit" value="Editar" />
                        <button onPointerDown={ popBtnEditarHandler } className='NuevoPerfil-submit'>Cancelar</button>
                    </div>
                </form>
            </div>
    )
}