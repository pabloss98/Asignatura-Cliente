import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Statistics from './Statistics';
import { UserContext } from '../context/UserContext'; 

const API_URL = "http://localhost/SERVIDOR/practica"; 

const UserList = () => {
    const { deleteUser } = useContext(UserContext); 
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showStats, setShowStats] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost/SERVIDOR/practica/getusers.php"); 
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const modificarUsuario = (usuario, nuevosDatos) => {
        axios.put(`http://localhost/SERVIDOR/practica/modi.php`, { 
            usuario,
            nombre: nuevosDatos.nombre,
            apellidos: nuevosDatos.apellidos,
            fecha_nacimiento: nuevosDatos.fecha_nacimiento,
            password: nuevosDatos.password || undefined 
        }, {
            headers: { "Content-Type": "application/json" }
        })
        .then((response) => {
            if (response.data.success) {
                alert("Usuario actualizado correctamente");
                window.location.reload(); 
            } else {
                alert("Error al actualizar usuario: " + response.data.error);
            }
        })
        .catch((error) => {
            console.error("Error al actualizar usuario:", error);
            alert("No se pudo actualizar el usuario.");
        });
    };
    
    const handleModify = (user) => {
        const nuevosDatos = {
            nombre: prompt("Nuevo nombre:", user.nombre),
            apellidoss: prompt("Nuevo apellidos:", user.apellidoss),
            fecha_nacimiento: prompt("Nueva fecha de nacimiento (YYYY-MM-DD):", user.fecha_nacimiento),
            password: prompt("Nueva contraseña (déjalo vacío si no quieres cambiarlo):")
        };
        modificarUsuario(user.usuario, nuevosDatos);
    };
    
    const handleShowStats = (user) => {
        setSelectedUser(user);
        setShowStats(true);
    };
    
    const handleDelete = async (id_usuario) => {
        try {
            const response = await axios.get(`http://localhost/practica/SERVIDOR/delete_user.php?id=${id_usuario}`); 

            const result = response.data;
    
            if (result.success) {
                setUsers(users.filter(user => user.id_usuario !== id_usuario));
                alert(result.message);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
        }
    };

    return (
        <div>
            <h2>Lista de Usuarios</h2>
            {users.length === 0 ? (
                <p>No hay usuarios disponibles.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Nombre</th>
                            <th>apellidos</th>
                            <th>Fecha de Nacimiento</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id_usuario}>
                                <td>{user.usuario}</td>
                                <td>{user.nombre}</td>
                                <td>{user.apellidos}</td>
                                <td>{user.fecha_nacimiento}</td>
                                <td>
                                    <button onClick={() => handleModify(user)}>Modificar</button>
                                    <button onClick={() => handleShowStats(user)}>Ver Estadísticas</button>
                                    <button onClick={() => handleDelete(user.id_usuario)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {showStats && selectedUser && (
                <div>
                    <h3>Estadísticas de {selectedUser.usuario}</h3>
                    <Statistics month={new Date().getMonth() + 1} year={new Date().getFullYear()} />
                </div>
            )}
        </div>
    );
};

export default UserList;
