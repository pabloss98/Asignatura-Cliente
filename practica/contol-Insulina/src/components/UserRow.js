import React, { useState } from 'react';

const UserRow = ({ user, deleteUser, updateUser }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({ ...user });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdate = () => {
        updateUser(editedUser); 
        setIsEditing(false); 
    };

    return (
        <tr key={user.idUsuario}>
            <td>{user.username}</td>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        name="nombre"
                        value={editedUser.nombre}
                        onChange={handleChange}
                    />
                ) : (
                    user.nombre
                )}
            </td>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        name="apellido"
                        value={editedUser.apellido}
                        onChange={handleChange}
                    />
                ) : (
                    user.apellido
                )}
            </td>
            <td>
                {isEditing ? (
                    <input
                        type="date"
                        name="fecha_nacimiento"
                        value={editedUser.fecha_nacimiento}
                        onChange={handleChange}
                    />
                ) : (
                    user.fecha_nacimiento
                )}
            </td>
            <td>
                {isEditing ? (
                    <>
                        <button onClick={handleUpdate}>Guardar</button>
                        <button onClick={() => setIsEditing(false)}>Cancelar</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setIsEditing(true)}>Modificar</button>
                        <button onClick={() => deleteUser(user.idUsuario)}>Eliminar</button>
                    </>
                )}
            </td>
        </tr>
    );
};

export default UserRow;
