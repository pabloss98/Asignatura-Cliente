import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const UserForm = () => {
    const { addUser, validationPatterns } = useContext(UserContext);
    const [user, setUser] = useState({
        usuario: '',
        contra: '',
        nombre: '',
        apellidos: '',
        fecha_nacimiento: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const validateusuario = (usuario) => validationPatterns.usuario.test(usuario);

    const validatecontra = (contra) => validationPatterns.contra.test(contra);

    const validateAge = (fecha_nacimiento) => {
        const today = new Date();
        const birth = new Date(fecha_nacimiento);
        const age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        return age > 18 || (age === 18 && monthDiff >= 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 

        if (!validateusuario(user.usuario)) {
            setError('El nombre de usuario debe tener al menos 6 caracteres, comenzar por una letra minuscula y no contener caracteres especiales.');
            return;
        }

        if (!validatecontra(user.contra)) {
            setError('La contraseña debe tener al menos 8 caracteres, contener al menos una letra mayúscula y un número.');
            return;
        }

        if (!validateAge(user.fecha_nacimiento)) {
            setError('Debes ser mayor de edad (18 años o más).');
            return;
        }

        try {
            const response = await axios.post('http://localhost/SERVIDOR/practica/api.php', user);
            addUser(response.data);  
            setUser({ usuario: '', contra: '', nombre: '', apellidos: '', fecha_nacimiento: '' });  
        } catch (error) {
            console.error('Error al agregar el usuario:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Mostrar el mensaje de error si existe */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input 
                type="text" 
                name="usuario"  
                placeholder="Nombre de usuario" 
                onChange={handleChange} 
                value={user.usuario} 
                required 
            />
            <input 
                type="password" 
                name="contra"  
                placeholder="Contraseña" 
                onChange={handleChange} 
                value={user.contra} 
                required 
            />
            <input 
                type="text" 
                name="nombre"  
                placeholder="Nombre" 
                onChange={handleChange} 
                value={user.nombre} 
                required 
            />
            <input 
                type="text" 
                name="apellidos"  
                placeholder="Apellidos" 
                onChange={handleChange} 
                value={user.apellidos} 
                required 
            />
            <input 
                type="date" 
                name="fecha_nacimiento" 
                onChange={handleChange} 
                value={user.fecha_nacimiento} 
                required 
            />
            <button type="submit">Agregar Usuario</button>
        </form>
    );
};

export default UserForm;
