import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Eliminar = ({ usuario }) => {
    const { deleteUser } = useContext(UserContext);

    const handleDelete = async () => {
        if (window.confirm(`¿Estás seguro de que deseas eliminar al usuario ${usuario}?`)) {
            try {
                const response = await fetch(`http://localhost/SERVIDOR/practica/delete_user.php`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ usuario })
                });

                const result = await response.json();

                if (result.success) {
                    deleteUser(usuario);  
                    console.log(`Usuario ${usuario} eliminado.`);
                } else {
                    console.log(`Error al eliminar usuario: ${result.message}`);
                }
            } catch (error) {
                console.error("Error en la solicitud:", error);
            }
        }
    };

    return (
        <button onClick={handleDelete} style={{ color: 'red' }}>
            Eliminar
        </button>
    );
};

export default Eliminar;
