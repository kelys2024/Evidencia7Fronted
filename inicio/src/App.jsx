import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Inicio from './Inicio'

function App() {
  const [usuario, setUsuario] = useState('')
  const [clave, SetClave] = useState('')
  const [logueado, setLogueado] = useState(false)
  const [usuarioRegistro, setUsuarioRegistro] = useState('')
  const [claveRegistro, SetClaveRegistro] = useState('')
  const [usuarios, setUsuarios] = useState([])

  function cambiarUsuario(evento) {
    setUsuario(evento.target.value)
  }

  function cambiarClave(evento) {
    SetClave(evento.target.value)
  }
  function cambiarUsuarioRegistro(evento) {
    setUsuarioRegistro(evento.target.value)
  }

  function cambiarClaveRegistro(evento) {
    SetClaveRegistro(evento.target.value)
  }


  async function ingresar() {
    const peticion = await fetch('http://localhost:3000/login?usuario=' + usuario + '&clave=' + clave, { credentials: 'include' })
    if (peticion.ok) {
      setLogueado(true)
      obtenerUsuarios();
    } else {
      alert('Usuario o clave incorrectos')
    }

  }
  async function registrar() {
    const peticion = await fetch('http://localhost:3000/registro?usuario=' + usuarioRegistro + '&clave=' + claveRegistro, { credentials: 'include' })
    if (peticion.ok) {
      alert("usuario registrado")
      setLogueado(true)
      obtenerUsuarios();
    } else {
      alert('Usuario no registrado')
    }

  }
  async function validar() {
    const peticion = await fetch('http://localhost:3000/validar', { credentials: 'include' })
    if (peticion.ok) {
      setLogueado(true)
      obtenerUsuarios();
    }
  }
  async function obtenerUsuarios() {
    const peticion = await fetch('http://localhost:3000/usuarios', { credentials: 'include' })
    if (peticion.ok) {
      const respuesta = await peticion.json()
      setUsuarios(respuesta)
    }
  }

  async function eliminarUsuario(id) {
    const peticion = await fetch('http://localhost:3000/usuarios?id=' + id, { credentials: 'include', method:'DELETE'})
    if (peticion.ok) {
      alert('usuario eliminado')
      obtenerUsuarios();
    }
  }
  useEffect(() => {
    validar()
  }, [])

  if (logueado) {
    return (

      <>
        <Inicio />

        <h1>Registrar</h1>
        <input type="text" name="usuario" id="usuario" value={usuarioRegistro} onChange={cambiarUsuarioRegistro} />
        <input type="password" name="clave" id="clave" value={claveRegistro} onChange={cambiarClaveRegistro} />
        <button onClick={registrar}><h2>Registrar</h2></button>

        <table>
          <thead>
            <tr>
              <th>Identificación</th>
              <th>Usuario</th>
              <th>Clave</th>
              <th>Opcion</th>
            </tr>
          </thead>
          <tbody>
            {
              usuarios.map(usuario => (
                <tr key={usuario.id}>
                  <th>{usuario.id}</th>
                  <th>{usuario.usuario}</th>
                  <th>{usuario.clave}</th>
                  <th>
                    <button onClick={()=>{eliminarUsuario(usuario.id)}}>Eliminar</button>
                  </th>
                </tr>
              ))
            }
          </tbody>
        </table>
      </>)
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