import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Inicio from './Inicio'

function App() {
  const [usuario, setUsuario] = useState('')
  const [clave, SetClave] = useState('')
  const [logueado, setLogueado] = useState(false)

  function cambiarUsuario(evento) {
    setUsuario(evento.target.value)
  }

  function cambiarClave(evento) {
    SetClave(evento.target.value)
  }

  async function ingresar() {
    const peticion = await fetch('http://localhost:3000/login?usuario=' + usuario + '&clave=' + clave, {credentials: 'include'})
    if(peticion.ok){
      setLogueado(true)      
    }else{
      alert('usuario clave incorrecta')
    }
  }

  async function validar() {
    const peticion = await fetch('http://localhost:3000/validar', {credentials: 'include'})
    if(peticion.ok){
      setLogueado(true)      
    }
  }
  useEffect(()=>{
    validar()
  },[])

  if (logueado){
   return <Inicio/>
  }
  return (
    <>
      <h1>Inicio de Sesión</h1>
        <input type="text" name="usuario" id="usuario" value={usuario} onChange={cambiarUsuario} />
        <input type="password" name="clave" id="clave" value={clave} onChange={cambiarClave} />
        <button onClick={ingresar}><h2>Ingresar</h2></button>
    
    </>
  )
}

export default App
