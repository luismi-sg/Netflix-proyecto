import './App.css'
import { BrowserRouter , Routes , Route , NavLink } from 'react-router-dom'

import { Login }        from './components/Login/Login'
import { Main }         from './components/Main/Main'
import { Peliculas }    from './components/Peliculas/Peliculas'
import { Series }       from './components/Series/Series'
import { MiLista }      from './components/MiLista/MiLista'
import { Perfil }       from './components/Perfil/Perfil'
import { Plantilla }    from './components/Plantilla/Plantilla'
import { Reproducir }   from './components/Reproducir/Reproducir'
import { VideoLogo }    from './components/VideoLogo/VideoLogo'

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <div className='Netflix-intro'>
            <VideoLogo />
        </div>
        <div className='Netflix-contenedor'>
          <Routes>
            <Route path='/' element={ <Login /> }/>

            <Route path='/app' element={ <Plantilla /> }>
              <Route path='main' element={ <Main /> }/>
              <Route path='series' element={ <Series /> }/>
              <Route path='peliculas' element={ <Peliculas /> }/>
              <Route path='milista' element={ <MiLista /> }/>
            </Route>
            <Route path='/perfil' element={ <Perfil /> }/>
            <Route path='/reproducir/:id' element={ <Reproducir /> }/>
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  )
}

export default App
