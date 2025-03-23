import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Estadisticas from './Estadisticas';

const URL_API = "http://localhost/SERVIDOR/practica";

const ListaDeUsuarios = () => {
  
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEnEdicion, setUsuarioEnEdicion] = useState(null);
  const [estadisticasVisible, setEstadisticasVisible] = useState(false);

  
  const obtenerUsuarios = useCallback(async () => {
    try {
      const respuesta = await axios.get(`${URL_API}/getusers.php`);
      setUsuarios(respuesta.data);
    } catch (error) {
      console.error('Error al cargar los usuarios:', error);
    }
  }, []);

  
  useEffect(() => {
    obtenerUsuarios();
  }, [obtenerUsuarios]);

  
  const actualizarUsuario = async (usuarioId, nuevosDatos) => {
    try {
      const respuesta = await axios.put(`${URL_API}/modificar.php`, {
        usuarioId,
        ...nuevosDatos
      });
      if (respuesta.data.success) {
        alert('Usuario actualizado con éxito');
        obtenerUsuarios(); 
      } else {
        alert(`Error: ${respuesta.data.error}`);
      }
    } catch (error) {
      console.error("No se pudo actualizar el usuario:", error);
      alert("Hubo un error al actualizar los datos del usuario.");
    }
  };

  
  const manejarModificar = (usuario) => {
    const nuevosDatos = {
      usuario: prompt("usuario: ", usuario.usuario),
      nombre: prompt("Nuevo nombre:", usuario.nombre),
      apellidos: prompt("Nuevos apellidos:", usuario.apellidos),
      fechaNacimiento: prompt("Nueva fecha de nacimiento (YYYY-MM-DD):", usuario.fecha_nacimiento),
      password: prompt("Nueva contraseña (déjalo vacío si no quieres cambiarla):") || undefined
    };
    actualizarUsuario(usuario.usuarioId, nuevosDatos);
  };

 
  const eliminarUsuario = async (usuario) => {
    try {
      const response = await axios.delete(`${URL_API}/eliminar.php?usuario=${usuario}`);

 

        const result = response.data;

        if (result.success) {
            setUsuarios(usuarios.filter(user => user.usuario !== usuario));
            alert(result.message);
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
    }
};

  
  const mostrarEstadisticas = (usuario) => {
    setUsuarioEnEdicion(usuario);
    setEstadisticasVisible(true);
  };

  return (
    <section>
      <h2>Usuarios Registrados en el Sistema</h2>
      {usuarios.length === 0 ? (
        <p>Aún no hay usuarios en la base de datos.</p>
      ) : (
        <div className="usuarios-lista">
          <table>
            <thead>
              <tr>
                <th>Nombre de Usuario</th>
                <th>Nombre Completo</th>
                <th>Fecha de Nacimiento</th>
                <th>Acciones Disponibles</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.idUsuario}>
                  <td>{usuario.usuario}</td>
                  <td>{`${usuario.nombre} ${usuario.apellidos}`}</td>
                  <td>{usuario.fecha_nacimiento}</td>
                  <td>
                    <button onClick={() => manejarModificar(usuario)}>Editar Usuario</button>
                    <button onClick={() => mostrarEstadisticas(usuario)}>Mostrar Estadísticas</button>
                    <button onClick={() => eliminarUsuario(usuario.idUsuario)}>Eliminar Registro</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
  
      {estadisticasVisible && usuarioEnEdicion && (
        <div className="estadisticas">
          <h3>Detalles de Estadísticas para {usuarioEnEdicion.usuario}</h3>
          <Estadisticas mes={new Date().getMonth() + 1} año={new Date().getFullYear()} />
        </div>
      )}
    </section>
  );
  
};

export default ListaDeUsuarios;
