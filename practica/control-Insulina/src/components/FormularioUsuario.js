import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const FormularioUsuario = () => {
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

    const validaredad = (fecha_nacimiento) => {
        const hoy = new Date();
        const nacimiento = new Date(fecha_nacimiento);
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mesHoy = hoy.getMonth();
        const mesNacimiento = nacimiento.getMonth();
        if (mesHoy < mesNacimiento || (mesHoy === mesNacimiento && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }
    
        return edad >= 18;
    };
    

    const envio = async (e) => {
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

        if (!validaredad(user.fecha_nacimiento)) {
            setError('Debes ser mayor de edad.');
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
        <form onSubmit={envio}>
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

export default FormularioUsuario;
