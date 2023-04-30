import './Perfil.css'

export const Perfiles = ({ isActive , isActiveEditar , popBtnEditarHandler , popBtnHandler , users, cerrarHandler , rellenarHandler , eliminarHandler}) => {
    return(
        <div className={`Perfil-contenedor ${ (isActive || isActiveEditar) ? 'isActive': '' }`}>
                <h1 className='Perfil-h1'>¿Quién eres? Administra tu perfil</h1>
                    <div className='Perfil-grid'>
                        <div className='NuevoPerfil-contenedor'>

                            {/* ESTE BOTON HACE EL TOGGLE DE LA PANTALLA DE EDICION O CREACION */}
                            <button onClick={ popBtnHandler }  className='Crear-btn'>
                                <svg xmlns="http://www.w3.org/2000/svg" className='Crear-img' viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                            </button>
                            <h2 className='NuevoPerfil-h2'> Añadir perfil </h2>
                        </div>
                        
                        {users && users.map( ({ _id  , nombre  }) => 
                            <div key={ _id } className='NuevoPerfil-contenedor'>
                                <div className='NuevoPerfil-Img-wrapper' style={{ backgroundColor: `rgb(${[0,0,0].map(() => Math.ceil(Math.random()*255)).join(",")})`}}>
                                    <img className='NuevoPerfil-img' src="./assets/icono-nuevoperfil.png" alt="Icono perfil" />
                                </div>
                                <h2 className='NuevoPerfil-h2'>{ nombre }</h2>
                                <div className='NuevoPerfil-botones'>
                                    <button onPointerDown={ () => rellenarHandler( _id ) } className='NuevoPerfil-btn' >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                        </svg>
                                    </button>
                                    <button onPointerDown={ () => eliminarHandler( _id ) } className='NuevoPerfil-btn' >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                <button className='Perfil-btn' onPointerDown={ cerrarHandler } > Listo </button>
            </div>
    )
}