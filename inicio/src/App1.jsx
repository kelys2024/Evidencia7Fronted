import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const[usuario, setUsuario] = useState('')
  const[clave, setClave] = useState('')
  const[logueado, setLogueado] = useState(false)

  function cambiarUsuario(evento){ 
    setUsuario (evento.target.value)
  }
  function cambiarClave(evento){ 
    setClave (evento.target.value)  
  }
  function inicio(){ 
    if (usuario == 'admin' && clave == 'admin'){
      alert('Ingresaste')
      setLogueado(true)
    }else{
      alert('usuario o clave incorrecta')
    }
 }
 if (logueado) {
  return (
    <>
      <br />
        <h3>Servicios</h3>
     </>
    );  
  }
 return( 
    <>
      <h1>Inicio de Sesion</h1>
      <input type= "text" name= "usuario" id= "usuario" value={usuario} onChange={cambiarUsuario}/>
      <input type= "password" name= "clave" id= "clave" value={clave} onChange={cambiarClave}/>
      <button onClick={inicio}><h2>Inicio</h2></button> 
   
      
    </>
  )
}

export default App
