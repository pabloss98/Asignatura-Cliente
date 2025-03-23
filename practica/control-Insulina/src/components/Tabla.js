import React, { useState } from 'react';
import EliminarUsuario from './Eliminar';

const Tabla = ({ usuarios = [], actualizarUsuario }) => { // Establecemos un valor por defecto vacío para usuarios

    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

    const empezarEdicion = (usuarios) => setUsuarioSeleccionado(usuarios);
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
};

export default Tabla;
