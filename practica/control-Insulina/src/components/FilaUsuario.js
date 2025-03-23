import React, { useState } from 'react';

const FilaUsuario = ({ usuario, eliminarUsuario, actualizarUsuario }) => {
  const [modoEdicion, setModoEdicion] = useState(false);
  const [usuarioModificado, setUsuarioModificado] = useState({ ...usuario });


  const manejarCambioDeInput = (e) => {
    const { name, value } = e.target;
    setUsuarioModificado((usuarioPrevio) => ({
      ...usuarioPrevio,
      [name]: value,
    }));
  };


  const guardarCambios = () => {
    actualizarUsuario(usuarioModificado);
    setModoEdicion(false);
  };

 
  const renderizarColumna = (campo, tipo = 'text') => {
    return modoEdicion ? (
      <input
        type={tipo}
        name={campo}
        value={usuarioModificado[campo]}
        onChange={manejarCambioDeInput}
      />
    ) : (
      usuario[campo]
    );
  };

  return (
    <tr>
      <td>{usuario.usuario}</td>
      <td>{renderizarColumna('nombre')}</td>
      <td>{renderizarColumna('apellido')}</td>
      <td>{renderizarColumna('fecha_nacimiento', 'date')}</td>
      <td>
        {modoEdicion ? (
          <div>
            <button onClick={guardarCambios}>Guardar</button>
            <button onClick={() => setModoEdicion(false)}>Cancelar</button>
          </div>
        ) : (
          <div>
            <button onClick={() => setModoEdicion(true)}>Editar</button>
            <button onClick={() => eliminarUsuario(usuario.idUsuario)}>Eliminar</button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default FilaUsuario;
