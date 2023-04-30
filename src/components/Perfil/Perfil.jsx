import './Perfil.css'
import { useEffect , useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Perfiles } from './Perfiles'
import { AgregarPerfil } from './AgregarPerfil'
import { EditarPerfil } from './EditarPerfil'


export const Perfil = () => {
    // LLLAMADA A LA API
    const url = 'https://netflix-api-gamma.vercel.app' || 'http://localhost:4000'
    const navigate = useNavigate()

    // USESTATE PARA RECIBIR A LOS USUARIOS DEL FETCH
    const [ users , setUsers ] = useState([])

    // FUNCION PARA REGRESAR AL HOME
    const cerrarHandler = () => navigate("/app/main")

    // FETCH A LOS USUARIOS ACTUALES YA REGISTRADOS
    useEffect( () =>{
        fetch(`${url}/usuarios`)
        .then( res => res.json())
        .then( data => setUsers(data.netflixData))
        .catch( err => console.log( err ))
        } , [])
    
    // FORMULARIO PARA REGISTRAR NUEVOS USUARIOS
    const [ formulario , setFormulario ] = useState({
        _id : '',
        nombre : '',
        email : '',
        pass: ''
    })
    const inputHandler = ( { target }) => {
        const { name , value } = target
        setFormulario({ ...formulario , [name] : value })
    }
    // FETCH CON METODO POST PARA REGISTRAR NUEVOS USUARIOS
    const formHandler = ( e ) =>{
        let options = {
          method : 'post',
          body : JSON.stringify(formulario),
          headers : {"Content-type" : "application/json"}}
        e.preventDefault()
        fetch(`${url}/usuarios`, options)
        .then( res => res.json())
        .then( data => setUsers(data.netflixData))
        .catch( err => console.log( err ))
        console.log( users )
        popBtnHandler()
    }
    // CANCELA EL POP AGREGAR USUARIO
    const cancelarHandler = ( e ) => {
        e.preventDefault()
        popBtnHandler()
    }

    
    // FORMULARIO PARA EDITAR USUARIOS EXISTENTE
    const [ formularioUpdate , setFormularioUpdate ] = useState({
        nombre : '',
        email: '',
        pass: ''
      })
    const inputUpdateHandler = ( { target }) => {
        const { name , value } = target
        setFormularioUpdate({ ...formularioUpdate , [name] : value })
    }
    
    // FUNCION PARA RELLENAR LOS INPUTS CON LOS VALORES DEL USUARIO A EDITAR
    const rellenarHandler = ( _id ) => {
        const rellenar = users.find( eachUser => eachUser._id === _id  )
        setFormularioUpdate( rellenar )
        popBtnEditarHandler()
    }
    // FETCH CON METODO PUT PARA EDITAR USUARIOS EXISTENTES
    const formUpdateHandler = ( e ) =>{
        console.log(formularioUpdate)
        let options = {
        method : 'put',
        body : JSON.stringify(formularioUpdate),
        headers : { "Content-type" : "application/json"}}
        e.preventDefault()
        fetch(`${url}/usuarios/` , options)
        .then( res => res.json())
        .then( data => setUsers(data.netflixData))
        .catch( err => console.log( err ))
        popBtnEditarHandler()
    }

    // FUNCION Y FETCH CON METODO DELETE PARA ELIMINAR USUARIOS EXISTENTES
    const eliminarHandler = (  _id  ) => {
        console.log( _id )
        let options = {
            method : 'delete',
            headers : {"Content-type" : "application/json"}}
        fetch(`${url}/usuarios/id/${_id}` , options)
        .then( res => res.json())
        .then( data => setUsers(data.netflixData))
        .catch( err =>  console.log( err ))
    }
    
    // FUNCIONES PARA INTERACTUAR CON ESTILOS DE LOS POPS DE EDITAR Y AGREGAR USUARIOS
    const [ isActive , setisActive ] = useState( false )
    const [ isActiveEditar , setisActiveEditar ] = useState( false )
    
    const popBtnHandler = () => setisActive(!isActive)
    const popBtnEditarHandler = () => setisActiveEditar(!isActiveEditar)
    
    return(
        <div className='Perfil'>
            <Perfiles isActive={ isActive } setisActive={ setisActive } isActiveEditar={isActiveEditar} popBtnEditarHandler={ popBtnEditarHandler } popBtnHandler={popBtnHandler } users={ users } cerrarHandler={ cerrarHandler} rellenarHandler={rellenarHandler} eliminarHandler={eliminarHandler}/>

            <AgregarPerfil isActive={ isActive } formHandler={ formHandler } formulario={formulario} inputHandler={inputHandler} cancelarEditarHandler={ cancelarHandler } popBtnHandler={popBtnHandler }/>
            
            <EditarPerfil isActiveEditar={isActiveEditar} formUpdateHandler={formUpdateHandler} formularioUpdate={formularioUpdate} inputUpdateHandler={ inputUpdateHandler }  popBtnEditarHandler={ popBtnEditarHandler }/>
        </div>
    ) 
}