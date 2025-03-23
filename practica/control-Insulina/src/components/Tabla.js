import React, { useState } from 'react';
import EliminarUsuario from './Eliminar';

const TablaUsuarios = ({ usuarios = [], actualizarUsuario }) => { // Establecemos un valor por defecto vacío para usuarios

    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

    const empezarEdicion = (usuario) => setUsuarioSeleccionado(usuario);
    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setUsuarioSeleccionado((prev) => ({ ...prev, [name]: value }));
    };
    const manejarEnvio = (e) => {
        e.preventDefault();
        if (usuarioSeleccionado) {
            actualizarUsuario(usuarioSeleccionado);
            setUsuarioSeleccionado(null);
        }
    };

    if (!usuarios || usuarios.length === 0) {
        return <p>No hay usuarios disponibles.</p>;
    }

    return (
        <div>
            <h2>Lista de Usuarios</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre de Usuario</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.usuario}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.apellidos}</td>
                            <td>{usuario.fecha_nacimiento}</td>
                            <td>
                                <button onClick={() => empezarEdicion(usuario)}>Modificar</button>
                                <EliminarUsuario usuarioId={usuario.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {usuarioSeleccionado && (
                <form onSubmit={manejarEnvio}>
                    <h2>Modificar Usuario</h2>
                    <label>
                        Nombre de Usuario:
                        <input
                            type="text"
                            name="usuario"
                            value={usuarioSeleccionado.usuario || ''}
                            onChange={manejarCambio}
                        />
                    </label>
                    <label>
                        Apellido:
                        <input
                            type="text"
                            name="apellidos"
                            value={usuarioSeleccionado.apellidos || ''}
                            onChange={manejarCambio}
                        />
                    </label>
                    <label>
                        Fecha de Nacimiento:
                        <input
                            type="date"
                            name="fecha_nacimiento"
                            value={usuarioSeleccionado.fecha_nacimiento || ''}
                            onChange={manejarCambio}
                        />
                    </label>
                    <button type="submit">Guardar Cambios</button>
                    <button type="button" onClick={() => setUsuarioSeleccionado(null)}>Cancelar</button>
                </form>
            )}
        </div>
    );
};

export default TablaUsuarios;
